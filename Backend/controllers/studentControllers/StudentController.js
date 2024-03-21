import StudentRegModel from "../../models/studentModels/studentRegModel.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../../utils/sendEmail.js";





//PASS EMAIL ADDRESS HERE AND THIS WILL GENERATE A JWT TOKEN
const createToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY,);
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}






//LOGIN FUNCTION: This will send the token and userRole
//localhost:510/student/login
export const StudentLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExist = await StudentRegModel.findOne({ email });
        if (!isExist) {
            throw Error('Email Not Exist !!');
        }

        // To Do: After implementing student account Create part, enable this method
        if(! await isExist.isPasswordMatched(password)){
            throw Error('Password Incorrect !!');
        }
      
        const id = isExist._id.toString();
        const token = createToken(id);
        
        res.status(200).json({
            token,
            userRole: isExist.role,
            firstName: isExist.firstName
        })
    } catch (error) {
        res.status(401).json({ message: error.message });
    }

}



// Create new Student Account
export const CreateStudent = async (req, res) => {
    const {
        studentID,
        firstName,
        lastName,
        contactNo,
        email,
        password,
        specialization,
        semester
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

        // generate new Group ID for the new Groups
        const newStudentID = `IT2115818${studentCount + 1}`;

        const mongooseRes = new StudentRegModel({
            studentID: newStudentID,
            firstName,
            lastName,
            contactNo,
            email,
            password,
            specialization,
            semester
        });

        console.log(mongooseRes);
        await mongooseRes.save();
        
        res.status(200).json({
            message: "New Student Account created successfully!",
            result: {
                data: mongooseRes,
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
export const getStudentDetails = async(req,res)=>{
    const id = req.loggedInId
    console.log('API INSIDE :' , id);
    try {
        const isExist = await StudentRegModel.findById(id);
        if(!isExist){
            res.status(401).json({message:'User Not Exist'});
        }
        res.status(200).json(isExist);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

// export const sendNewEmail = async (req,res)=>{
//     try{
//         const data = req.body
//         if(!data.sendTo || !data.description || !data.subject){
//             throw Error ('All fields must be fillded..')
//         }
//         await sendEmail(data.sendTo, data.subject, { name: ``, description: data.description }, "./template/emailtemplate.handlebars");
//         res.status(200).json({
//             message: 'Email Sent successfully!'
//         });
//     }catch(error) {
//         console.log();
//         res.status(500).json({message:error.message});
//     }
// }


//Delete Student Account
//localhost:510/student/delete-student/<DB_object_id>
export const deleteStudent = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedAccount = await StudentRegModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Account Deleted Successfully', subject:deletedAccount });
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