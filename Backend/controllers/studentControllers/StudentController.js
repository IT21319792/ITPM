import StudentRegModel from "../../models/studentModels/studentRegModel.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../utils/sendEmail.js";
import SubmitAssignment from "../../models/studentModels/SubmitAssignmentModel.js"
import { sendOTP } from "../../index.js";
import OTPModel from "../../models/studentModels/OTP.js";


//Student Login and generating token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: '3h' });
}

export const StudentLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const student = await StudentRegModel.findOne({ email });
        if (!student) {
            throw new Error('Invalid email or password');

        }

        if (!await student.isPasswordMatched(password)) {
            throw new Error('Incorrect password');
        }

        const token = createToken(student._id.toString());
        const expiryDate = new Date(Date.now() + 3 * 3600000); // 3 hours from now
        res.cookie('access_token', token, { httpOnly: true, expires: expiryDate, secure: true });

        const { password: pass, ...rest } = student._doc;
        res.status(200).json({
            token,
            userRole: student.role,
            firstName: student.firstName,
            ...rest
        });
    } catch (error) {
        console.log(email);
        res.status(401).json({ message: error.message });
    }
}

// Create new Student Account
export const CreateStudent = async (req, res) => {
    const {
        studentID,
        firstName,
        middleName,
        lastName,
        contactNo,
        email,
        aLevelStream,
        subject1,
        subject1Result,
        subject2,
        subject2Result,
        subject3,
        subject3Result,
        guardianName,
        guardianEmail,
        password,
        specialization,
        semester,
        role
    } = req.body;

    try {
        // Check if email already exists
        const existingStudent = await StudentRegModel.findOne({ email });
        if (existingStudent) {
            return res.status(400).json({
                message: "Email already exists. Please choose a different email address.",
                response: false
            });
        }

        // If email doesn't exist, proceed to create new student account
        const result = await StudentRegModel.find();
        const studentCount = result.length;

        // Generate new Group ID for the new Groups
        const newStudentID = `IT2115818${studentCount + 1}`;

        const newStudent = new StudentRegModel({
            studentID: newStudentID,
            firstName,
            middleName,
            lastName,
            contactNo,
            email,
            aLevelStream,
            subject1,
            subject1Result,
            subject2,
            subject2Result,
            subject3,
            subject3Result,
            guardianName,
            guardianEmail,
            password,
            specialization,
            semester,
            role
        });

        console.log(newStudent);
        await newStudent.save();

        // Send confirmation email
        await sendEmail(
            email,
            "Account Creation Confirmation",
            {
                name: firstName,
                email: `Email: ${email}`,
                description: `Your Password is: ${password}`,
            },
            "./template/emailtemplate.handlebars"
        );

        res.status(200).json({
            message: "New Student Account created successfully!",
            result: {
                data: newStudent,
                response: true,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: "Error while creating new Student Account!",
            error: error.message,
        });
    }
};


//GET Student DETAILS
//localhost:510/student/get-student + enter the token after login in (Auth-Bearer)section
export const getStudentDetails = async (req, res) => {
    const id = req.loggedInId
    console.log('API INSIDE :', id);
    try {
        const isExist = await StudentRegModel.findById(id);
        if (!isExist) {
            res.status(401).json({ message: 'User Not Exist' });
            return;
        }
        res.status(200).json(isExist);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}




//Delete Student Account
//localhost:510/student/delete-student/<DB_object_id>
export const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedAccount = await StudentRegModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Account Deleted Successfully', subject: deletedAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const updateStudent = async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;

        if (!id) {
            throw Error("ID can't be empty");
        }

        const updatedAccount = await StudentRegModel.findByIdAndUpdate(id, data, { new: true }); // Added { new: true } to return the updated document
        if (!updatedAccount) {
            // Handle case where document with given ID is not found
            return res.status(404).json({ message: 'Student not found' });
        }
        res.status(200).json({ message: 'Account Updated Successfully', subject: updatedAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//Get same specialization and semester students
export const getSameSemesterSpecializationStudents = async (req, res) => {
    try {
        // Get the logged-in student's ID from the request
        const loggedInStudentId = req.loggedInId;

        // Find the logged-in student's details
        const loggedInStudent = await StudentRegModel.findById(loggedInStudentId);
        if (!loggedInStudent) {
            return res.status(404).json({ message: "Logged-in student not found" });
        }

        // Extract semester and specialization from the logged-in student's details
        const { semester, specialization } = loggedInStudent;

        // Find all students with the same semester and specialization
        const studentsWithSameSemesterAndSpecialization = await StudentRegModel.find({
            semester,
            specialization
        });

        // Return the list of students
        res.status(200).json({ students: studentsWithSameSemesterAndSpecialization });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


//assignments submitting controller
export const submitAssignment = async (req, res) => {
    try {
        const { assignmentId, fileUrl, comment } = req.body;
        
        // Check if user is authenticated
        if (!req.loggedInId) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        
        const loggedInId = req.loggedInId; 

        // Check if the user has already submitted this assignment
        const existingSubmission = await SubmitAssignment.findOne({
            assignmentId: assignmentId,
            submittedBy: loggedInId
        });

        if (existingSubmission) {
            return res.status(400).json({ error: "You have already submitted this assignment." });
        }

        const submission = new SubmitAssignment({
            assignmentId: assignmentId,
            fileUrl: fileUrl,
            comment: comment,
            submittedBy: loggedInId
        });

        const savedSubmission = await submission.save();

        res.status(201).json(savedSubmission);
    } catch (error) {
        console.error("Error submitting assignment:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

//getsubmitted assignment
export const getSubmittedAssignment = async (req, res) => {
    const submittedBy = req.loggedInId
    const assignmentId = req.params.id;
    try {
        const response = await SubmitAssignment.findOne(
            { submittedBy, assignmentId }
        )
        .populate('assignmentId') // Populate the assignment details
        .populate('submittedBy') // Populate the student details;
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

//getsubmitted assignment
export const deleteSubmittedAssignment = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await SubmitAssignment.findOneAndDelete(id)
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}


//otp sending function
export const sendLoginOTP = async (req, res) => {
    const { email } = req.query;
    try {
        console.log(email)
        const student = await OTPModel.deleteMany({ email });
        const tempOTP = Math.floor(1000 + Math.random() * 9000);
        const otp = await OTPModel.create({

            email: email,
            otp: tempOTP
        })
        sendOTP(email, tempOTP)
        res.status(200).json({ message: "otp sent" })

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
        
    }
};

//otp verifying function
export const verifyOTP = async (req, res) => {
    const { email, otp } = req.query;
    try {
        const student = await OTPModel.findOne({ email });
        if (!student) {
            throw new Error('Invalid email or password');
        }
        if (student.otp == otp) {
            res.status(200).json({ message: "otp verified" })
        }
        else{
            res.status(401).json({ message: "otp not verified" })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
        
    }
}