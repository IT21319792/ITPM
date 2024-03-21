import GroupModel from "../../models/studentModels/GroupModel.js";

// Create new Group
export const createGroup = async (req, res) => {
    const {
        member1,
        member2,
        member3,
        member4,
        groupLeader
    } = req.body;


    //checkwhether the members added are already grouped or not
    const isMember1Exist= await GroupModel.findOne({member1:member1});
    const isMember2Exist= await GroupModel.findOne({member2:member2});
    const isMember3Exist= await GroupModel.findOne({member3:member3});
    const isMember4Exist= await GroupModel.findOne({member4:member4});

    if(isMember1Exist){
        res.status(500).json({
            message:"This member1 is already grouped!"
        })
        return;
    }
    else if(isMember2Exist){
        res.status(500).json({
            message:"This member2 is already grouped!"
        })
        return;
    }
    else if(isMember3Exist){
        res.status(500).json({
            message:"This member3 is already grouped!"
        })
        return;
    }
    else if(isMember4Exist){
        res.status(500).json({
            message:"This member4 is already grouped!"
        })
        return;
    }



    const result = await GroupModel.find();
    const groupCount = result.length;

    // generate new Group ID for the new Groups
    const newGroupID = `GRP${groupCount + 1}`;

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


//Get All Groups data
export const getAllGroups = async (req, res) => {
    try {
        const Groups = await GroupModel.find()

        res.status(200).json(Groups);
    } catch (error) {
        res.status(500).json({
            message: error.mesasge
        })
    }
}


//Delete Group
export const deleteGroup = async (req, res) => {
    try {
        const id = req.params.id;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const deletedSub = await GroupModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Group Deleted Successfully', item:deletedSub });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Group Update
export const updateGroup = async (req, res) => {
    try {
        const id = req.params.id;
        const Data = req.body;

        if (!id) {
            throw Error("Id can't be empty");
        }

        const updatedGroup = await GroupModel.findByIdAndUpdate( id, Data );
        res.status(200).json({ message: 'Group Updated Successfully', group: updatedGroup });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//Search Function
export const searchGroup = async (req, res) => {
    console.log(req.params.key)
    let data =await GroupModel.find(
      {
        "$or": [
          { "groupID": {$regex:req.params.key}}
        ],
      }
    );
    console.log(data);
    res.status(200).json({
      message: "Group details",
      data: data,
    })
  };