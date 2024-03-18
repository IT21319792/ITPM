import PrMember from '../../models/cordinatorModels/PrMemberAssignMarkings.js';


//create- assigning pr member to add marking rubric
export const AssignMark = async (req, res) => {
    const data = req.body;
    const newAssignMarking = new PrMember(data);
    const membername = req.body.name;
    try {
        await newAssignMarking.save();
        res.status(200)
        .json({message: 'Assigning Project member'+membername+'to add marking rubric is successful'});
        
    } catch (error) {
        response.status(500).json({message: error.message});
        
    }
}

//get all details of assigned members for marking rubric
export const getAssignMark = async(req,res)=>{
    try {
        const allAssignMarks= await PrMember.find();
        res.status(200)
        .json(allAssignMarks);

    } catch (error) {
        res.status(500)
        .json ({message:error.message});
    }
}

//update assigned member details fpr add marks
export const updateAssignMark = async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    if(!id){
        throw Error("Id can't be empty");
    }
    // const {name,semester}=req.body;
    try {
        const updatedAssignMark = await PrMember.findByIdAndUpdate(id,data);
        res.status(200)
        .json({message: 'Assigned member details updated successfully',subject:updatedAssignMark});
        
    } catch (error) {
        res.status(500)
        .json({message:error.message}); 
        
    }

}



//delete assigned member details for add marks
export const deleteAssignMarks=async(req,res)=>{
const id = req.params.id;
const data = req.body;
const name = req.body.name;
if(!id){
    throw Error("Id can't be empty");
}

try {
    const DeletedAssignMark= await PrMember.findByIdAndDelete(id);
    res.status(200)
    .json({message:name+'member details deleted successfully',subject:DeletedAssignMark});
} catch (error) {
    res.status(500)
    .json({message:error.message});
    
}
}
//get one assigned member details for add marks

export const getOneAssignMark= async(req,res)=>{
    const id =req.params.id;
    if(!id){
        throw Error("Id can't be empty");
    }
    try {
        const oneAssignMark = await PrMember.findById(id);
        res.status(200)
        .json(oneAssignMark);
        
    } catch (error) {
        res.status(500)
        .json({message:error.message});
    }       

}
// //export all the functions
export default {AssignMark, getAssignMark, updateAssignMark, deleteAssignMarks, getOneAssignMark}

