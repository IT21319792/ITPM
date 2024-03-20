import GroupModel from "../models/GroupModel.js";

// Create new Group
export const createGroup = async (req, res) => {
    const {
        member1,
        member2,
        member3,
        member4,
        groupLeader
    } = req.body;

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
            message: "Error while creating new Group",
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