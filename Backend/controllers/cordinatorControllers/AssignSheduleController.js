import PrMemberAssignShedule from '../../models/cordinatorModels/PrMemberAssignShedule.js';

//create- assigning pr member to shedule presentation
export const assignShedule = async(req,res)=>{
    const data = req.body;
    const newAssignShedule = new PrMemberAssignShedule(data);
    const name = req.body.memberName;

    try {
        await newAssignShedule.save();
        res.status(200)
        .json({message: 'Assigning Project member'+ name+  'to shedule presentation is successful'});
        

    } catch (error) {
        res.status(500)
        .json({message: error.message});
        
    }
}

//get all details of assigned members for presentation shedule

export const getAssignShedule = async(req,res)=>{
    try {
        const allAssignShedules= await PrMemberAssignShedule.find();
        res.status(200)
        .json(allAssignShedules);

        
    } catch (error) {
        res.status(500)
        .json ({message:error.message});
        
    }

}

//update assigned member details for presentation shedule

export const updateAssignedShedule = async(req,res)=>{
    const id = req.params.id;
    const data = req.body;
    if(!id){
        throw Error("Id can't be empty");
    }
    try {
        const updatedAssigenedShedule = await PrMemberAssignShedule.findByIdAndUpdate(id,data);
        res.status(200)
        .json({message: 'Assigned member details updated successfully',subject:updatedAssigenedShedule});

        
    } catch (error) {
        res.status(500)
        .json({message:error.message});
        
    }

}

//delete assigned member details for presentation shedule
export const deleteAssignShedule = async(req,res)=>{
    const id = req. params.id;
    const data = req.body;
    const name = req.body.memberName;
    if(!id){
        throw Error("Id can't be empty");
    }
    try {
        const deletedAssignShedule = await PrMemberAssignShedule.findByIdAndDelete(id,data);
        res.status(200)
        .json({message: 'sheduled presentation of'+ name+ 'deleted successfully',subject:deletedAssignShedule});        
    } catch (error) {
        res.status(500)
        .json({message:error.message}); 
        
    }

}

//get one assigned member details for presentation shedule
export const getOneAssignShedule = async(req,res)=>{
    const id = req.params.id;
    if(!id){
        throw Error("Id can't be empty");
    }
    try {
        const oneAssignedShedule = await PrMemberAssignShedule.findById(id);
        res.status(200)
        .json(oneAssignedShedule);

        
    } catch (error) {
        res.status(500)
        .json({message:error.message});
    }
}

//search with any value
export const searchAssignShedule = async(req,res)=>{
    const {key} = req.params;
    try {
        const searchAssignShedule = await PrMemberAssignShedule.find(
            {
                $or:[
                    {memberName:{$regex:key,$options:'i'}},
                    {semester:{$regex:key,$options:'i'}},
                    {presentationName:{$regex:key,$options:'i'}}
                ]
            }
        )
        res.status(200)
        .json(searchAssignShedule);

        
    } catch (error) {
        res.status(500)
        .json({message:error.message});
        
    }
}


// export all
// export default {assignShedule, getAssignShedule, updateAssignedShedule, deleteAssignShedule, getOneAssignShedule};
