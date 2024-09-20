import UserModel from "../models/UserModel.js";
import jwt from 'jsonwebtoken';
import { sendEmail } from "../utils/sendEmail.js";
import SupervisorListModel from "../models/cordinatorModels/SupervisorList.js";


//PASS EMAIL ADDRESS HERE AND THIS WILL GENERATE A JWT TOKEN
const createToken = (email) => {
    return jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });//added expiration time
}

export const verifyToken = (token) => {
    return jwt.verify(token, process.env.SECRET_KEY);
}

// LOGIN FUNCTION: This will send the token and userRole
export const Login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const isExist = await UserModel.findOne({ email });
        if (!isExist) {
            throw Error('Email Not Exist !!');
        }

        // To Do: After implementing User Create part, enable this method
        if(! await isExist.isPasswordMatched(password)){
            throw Error('Password Incorrect !!');
        }
        // if (isExist.password !== password) {
        //     throw Error('Password Incorrect !!');
        // }
        const id = isExist._id.toString();
        const token = createToken(id);
        const { password: pass, ...rest } = isExist._doc;
        const expirydare = new Date(Date.now() + 3600000);//1 hour
        res.cookie('access_token', token, { httpOnly: true, expires: expirydare});
        
        // await sendEmail('nimsaramahagedara@gmail.com', "TEST EMAIL", { name: 'NIMSARA MAHAGEDARA', description: 'TEST DESCRIPTION', }, "./template/emailtemplate.handlebars");
        res.status(200).json({
            token,
            userRole: isExist.role,
            firstName: isExist.firstName,
            level: isExist.level,
            staffPost: isExist.staffPost,
            rest
            
        })
    } catch (error) {
        //console.log(error);
        res.status(401).json({ message: error.message });
    }

}

// USER ACCOUNT CREATION
export const CreateAccount = async (req, res) => {
    const data = req.body;
    try {
        const isExist = await UserModel.findOne({ email: data.email });
        if (isExist) {
            throw Error('Email Already Exist !!');
        }

        const result = await UserModel.create(data);
        
        sendEmail(data.email, "Account Created Successfully", { name: `User : ${data.email}`, description: ` You Have Created a account with Contact Number: ${data.contactNo} successfully`, }, "./template/emailtemplate.handlebars");
        res.status(200).json({
            message: 'Account Created Successfully!'
        })
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error.message });
    }
}

//GET USER DETAILS
export const getUserDetails = async(req,res)=>{
    const id = req.loggedInId
    console.log('API INSIDE :' , id);
    try {
        const isExist = await UserModel.findById(id);
        if(!isExist){
            res.status(401).json({message:'User Not Exist'});
        }
        res.status(200).json(isExist);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
}

export const sendNewEmail = async (req,res)=>{
    try{
        const data = req.body
        if(!data.sendTo || !data.description || !data.subject){
            throw Error ('All fields must be fillded..')
        }
        await sendEmail(data.sendTo, data.subject, { name: ``, description: data.description }, "./template/emailtemplate.handlebars");
        res.status(200).json({
            message: 'Email Sent successfully!'
        });
    }catch(error) {
        console.log();
        res.status(500).json({message:error.message});
    }
}

export const deleteAccount = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedAccount = await UserModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Account Deleted Successfully', subject:deletedAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const updateAccount = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedAccount = await UserModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Account Updated Successfully', subject: updatedAccount });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export const getAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllSupervisors = async (req, res) => {
    try {
        const supervisors = await UserModel.find({ role: 'supervisor' }, { firstName: 1, lastName: 1 });
        res.status(200).json(supervisors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getAllCoSupervisors = async (req, res) => {
    try {
        const cosupervisors = await UserModel.find({ role: 'cosupervisor' }, { firstName: 1, lastName: 1 });
        res.status(200).json(cosupervisors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// Function to update the user's role by adding new roles to the existing array
export const updateUserRole = async (req, res) => {
    const { userId, newRole } = req.body;
  
    try {
      // Find the user by ID
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const newRolesArray = Array.isArray(newRole) ? newRole : [newRole];
  

      newRolesArray.forEach(role => {
        if (!user.role.includes(role)) {
          user.role.push(role);
        }
      });
  
      await user.save();
  
      res.status(200).json({ message: 'User role updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };


  // Controller function to remove a role from a user
export const removeUserRole = async (req, res) => {
    try {
      const { userId, roleToRemove } = req.body;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.role = user.role.filter(role => role !== roleToRemove);
  
      // Save the updated user document
      await user.save();
  
      return res.status(200).json({ message: 'User role updated successfully' });
    } catch (error) {
      console.error('Error updating user role:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

