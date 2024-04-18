import GroupModel from "../../models/studentModels/GroupModel.js";
import StudentModel from "../../models/studentModels/studentRegModel.js";




// Create new Group
export const createGroup = async (req, res) => {
    const {
        member1,
        member2,
        member3,
        member4,
        groupLeader,
        reason = false
    } = req.body;

    // Check if any member is duplicated
    const members = [member1, member2, member3, member4];
    const uniqueMembers = [...new Set(members)];
    if (uniqueMembers.length !== members.length) {
        res.status(401).json({
            message: "Duplicate member(s) detected. Each member should be added only once."
        });
        return;
    }

    const Member1 = await StudentModel.findOne({ studentID: member1 });
    const Member2 = await StudentModel.findOne({ studentID: member2 });
    const Member3 = await StudentModel.findOne({ studentID: member3 });
    const Member4 = await StudentModel.findOne({ studentID: member4 });

    if (!Member1 || !Member2 || !Member3 || !Member4) {
        res.status(401).json({
            message: "One or more student Id is Invalid!"
        })
        return;
    }

    if (!reason) {
        if (!(Member1.specialization == Member2.specialization &&
            Member1.specialization == Member3.specialization &&
            Member1.specialization == Member4.specialization)) {

            res.status(401).json({
                message: "All Group members should be in the same specialization"
            });
            return;
        }
    }

    if (!reason) {
        if (!(Member1.semester == Member2.semester &&
            Member1.semester == Member3.semester &&
            Member1.semester == Member4.semester)) {

            res.status(401).json({
                message: "All Group members should be in the same semester"
            });
            return;
        }
    }

    //check whether the members added are already grouped or not
    const isMember1Exist = await GroupModel.findOne({ member1: member1 });
    const isMember2Exist = await GroupModel.findOne({ member2: member2 });
    const isMember3Exist = await GroupModel.findOne({ member3: member3 });
    const isMember4Exist = await GroupModel.findOne({ member4: member4 });

    if (isMember1Exist || isMember2Exist || isMember3Exist || isMember4Exist) {
        res.status(500).json({
            message: "One or more member(s) is already in a another group!"
        });
        return;
    }

    const result = await GroupModel.find();
    const groupCount = result.length;

    // generate new Group ID for the new Groups
    const newGroupID = `GRP_${groupCount + 1}`;//add the semester to the groupID - GRP_(year)_(semester1/2)_regular

    const mongooseRes = new GroupModel({
        groupID: newGroupID,
        member1,
        member2,
        member3,
        member4,
        groupLeader
    });

    console.log(mongooseRes);
    mongooseRes.save().then((result) => {
        res.status(200).json({
            message: "new Group created successfully!",
            result: {
                data: result,
                response: true,
            },
        });
    }).catch((err) => {
        res.status(500).json({
            message: err.message,
            error: err,
        });
    });
};





//Get My Groups data
export const getMyGroup = async (req, res) => {
    const userId = req.loggedInId;
    try {
        const loggedInUser = await StudentModel.findById(userId)
        const Groups = await GroupModel.find({
            $or: [
                { member1: loggedInUser.studentID },
                { member2: loggedInUser.studentID },
                { member3: loggedInUser.studentID },
                { member4: loggedInUser.studentID }
            ]
        });


        res.status(200).json(Groups);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};





//Get All Groups data
export const getAllGroups = async (req, res) => {
    try {
        const allGroups = await GroupModel.find();
        res.status(200).json(allGroups);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};






//Update My Group
export const updateGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;
        console.log(Data);

        if (!id) {
            throw Error("Id can't be empty");
        }

    //     // Check if any member is duplicated
    // const members = [Data.member1, Data.member2, Data.member3, Data.member4];
    // const uniqueMembers = [...new Set(members)];
    // if (uniqueMembers.length !== members.length) {
    //     res.status(401).json({
    //         message: "Duplicate member(s) detected. Each member should be added only once."
    //     });
    //     return;
    // }


    // Check if any non-null member is duplicated
const members = [Data.member1, Data.member2, Data.member3, Data.member4];

// Filter out null values
const nonNullMembers = members.filter(member => member !== "");

// Use Set to remove duplicates
const uniqueNonNullMembers = [...new Set(nonNullMembers)];

if (uniqueNonNullMembers.length !== nonNullMembers.length) {
    res.status(401).json({
        message: "Duplicate non-null member(s) detected. Each non-null member should be added only once."})
        return;
    }

    const Member1 = await StudentModel.findOne({ studentID: Data.member1 });
    const Member2 = await StudentModel.findOne({ studentID: Data.member2 });
    const Member3 = await StudentModel.findOne({ studentID: Data.member3 });
    const Member4 = await StudentModel.findOne({ studentID: Data.member4 });

    if (!Member1 || !Member2 || !Member3 || !Member4) {
        res.status(401).json({
            message: "One or more student Id is Invalid!"
        })
        return;
    }




    if (!Data.reason) {
        if (!(Member1.specialization == Member2.specialization &&
            Member1.specialization == Member3.specialization &&
            Member1.specialization == Member4.specialization)) {

            res.status(401).json({
                message: "All Group members should be in the same specialization"
            });
            return;
        }
    }

    if (!Data.reason) {
        if (!(Member1.semester == Member2.semester &&
            Member1.semester == Member3.semester &&
            Member1.semester == Member4.semester)) {

            res.status(401).json({
                message: "All Group members should be in the same semester"
            });
            return;
        }
    }


        const updatedGroup = await GroupModel.findByIdAndUpdate(id, Data, { new: true });
        res.status(200).json({ message: 'Group Updated Successfully', group: updatedGroup });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}







// //Delete Group
// export const deleteGroup = async (req, res) => {
//     try {
//         const id = req.params.id;

//         if (!id) {
//             throw Error("Id can't be empty");
//         }

//         const deletedSub = await GroupModel.findByIdAndDelete(id);
//         res.status(200).json({ message: 'Group Deleted Successfully', item: deletedSub });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }



// Delete Group
export const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const loggedInUser = req.loggedInId; 

        const groupLeader = await StudentModel.findById(loggedInUser);
        console.log(groupLeader);

        if (!id) {
            throw Error("ID can't be empty");
        }

        const group = await GroupModel.findById(id);

        if (!group) {
            throw Error("Group not found");
        }

        // Check if the logged-in user is the group leader
        if (group.groupLeader !== groupLeader.studentID) {
            return res.status(403).json({ message: "Not authorized to delete this group" });
        }

       

        // Proceed with group deletion
        const deletedGroup = await GroupModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Group Deleted Successfully', item: deletedGroup });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};






//Search Function
export const searchGroup = async (req, res) => {
    console.log(req.params.key)
    let data = await GroupModel.find(
        {
            "$or": [
                { "groupID": { $regex: req.params.key } }
            ],
        }
    );
    console.log(data);
    res.status(200).json({
        message: "Group details",
        data: data,
    })
};





//Get All Groups data with all member's studentIDs and groupIDs
export const getAllGroupsWithDetails = async (req, res) => {
    try {
        const allGroups = await GroupModel.find()
            .populate('member1', 'studentID')
            .populate('member2', 'studentID')
            .populate('member3', 'studentID')
            .populate('member4', 'studentID');
        res.status(200).json(allGroups);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};