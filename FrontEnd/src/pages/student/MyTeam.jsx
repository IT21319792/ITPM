import React, { useEffect, useState } from "react";
import { TextField, Button, Select, MenuItem, FormControl, InputLabel, Checkbox, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axios from 'axios';
import authAxios from "../utils/authAxios";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Box } from "@mui/system";
import { toast } from "react-toastify";

function MyTeam() {
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [member4, setMember4] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [leader, setLeader] = useState("");
  const [reason, setReason] = useState(false);
  const [myGroup, setMyGroup] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [updatedGroupData, setUpdatedGroupData] = useState({ member1: "", member2: "", member3: "", member4: "", supervisor: "", groupLeader: "" });

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:510/group/create-group', {
        member1,
        member2,
        member3,
        member4,
        supervisor: selectedUser,
        groupLeader: leader,
        reason
      });

      if (response.status === 200) {
        console.log("Group created successfully!");
        toast.success("Group created successfully!");
        window.location.href = '/dashboard/studentDash';
      }
    } catch (error) {
      console.error("Error creating group:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  const handleUpdateDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleUpdateDialogClose = () => {
    setOpenDialog(false);
  };

  const handleUpdate = async () => {
    try {
      console.log(myGroup)
      const response = await axios.put(`http://localhost:510/group/updateGroup/${myGroup._id}`, myGroup);

      if (response.status === 200) {
        console.log("Group updated successfully!");
        toast.success("Group updated successfully!");
        setOpenDialog(false);
        GetMyGroup();

      }
    } catch (error) {
      console.error("Error updating group:", error);
      toast.error(error.response.data.message);
    }
  };




  const handleRemove = async () => {
    try {
      const response = await authAxios.delete(`http://localhost:510/group/delete-group/${myGroup._id}`);

      if (response.status === 200) {
        console.log("Group deleted successfully!");
        toast.success("Group deleted successfully!");
        // Redirect the user to another page after deletion
        window.location.href = '/dashboard/myTeam';
      }
    } catch (error) {
      console.error("Error deleting group:", error);
      toast.error(error.response.data.message);
    }
  };

  const handleRemoveConfirmation = async () => {
    setOpenDialog(false);
    handleRemove();
  };

  const GetMyGroup = async () => {
    try {
      const res = await authAxios.get("http://localhost:510/group/mygroup")
      setMyGroup(res.data[0]);
      console.log(res.data);
    } catch (error) {

    }
  }

  useEffect(() => {
    GetMyGroup()
  }, [])

  //fetch all staff
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  useEffect(() => {
    axios.get('http://localhost:510/user')
      .then(res => {
        setUsers(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);



  return (
    <>
      {myGroup && (
        <>
          <TableContainer component={Paper} className="bg-white rounded-lg shadow-md">
            <Table className="min-w-max" aria-label="group members table">
              <TableHead>
                <TableRow>
                  <TableCell className="font-bold">My Group : {myGroup.groupID}: {myGroup.groupLeader}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <label className="font-bold">Member 1:</label>
                    <span className="py-3">{myGroup.member1}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label className="font-bold">Member 2:</label>
                    <span className="py-3">{myGroup.member2}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label className="font-bold">Member 3:</label>
                    <span className="py-3">{myGroup.member3}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label className="font-bold">Member 4:</label>
                    <span className="py-3">{myGroup.member4}</span>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <label className="font-bold">Supervisor:</label>
                    <span className="py-3">
                      {myGroup.supervisor ? `${myGroup.supervisor.firstName} ${myGroup.supervisor.lastName}` : ''}
                    </span>
                  </TableCell>
                </TableRow>

                {/* New TableRow */}
                <TableRow>
                  <TableCell className="py-3" colSpan={2}>
                    {/* New TableCell containing buttons */}
                    <Button variant="contained" onClick={handleUpdateDialogOpen} className="bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 px-4 py-2 rounded-md mr-2">Update</Button>
                    <Button variant="contained" onClick={handleRemove} className="bg-red-700 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 px-4 py-2 rounded-md">Remove</Button>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>


          <Dialog open={openDialog} onClose={handleUpdateDialogClose}>
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              Are you sure you want to delete this group?
            </DialogContent>
            <DialogActions>
              <Button onClick={handleRemoveConfirmation} color="primary">Yes</Button>
              <Button onClick={handleUpdateDialogClose} color="secondary">No</Button>
            </DialogActions>
          </Dialog>

          {/* Update dialog */}
          <Dialog open={openDialog} onClose={handleUpdateDialogClose}>
            <DialogTitle>Update Group</DialogTitle>
            <DialogContent>
              <TextField
                label="Member 1"
                value={myGroup.member1}
                onChange={(e) => setMyGroup({ ...myGroup, member1: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Member 2"
                value={myGroup.member2}
                onChange={(e) => setMyGroup({ ...myGroup, member2: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Member 3"
                value={myGroup.member3}
                onChange={(e) => setMyGroup({ ...myGroup, member3: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Member 4"
                value={myGroup.member4}
                onChange={(e) => setMyGroup({ ...myGroup, member4: e.target.value })}
                fullWidth
                className="mb-2"
              />
              <TextField
                label="Supervisor"
                value={myGroup.supervisor ? `${myGroup.supervisor.firstName} ${myGroup.supervisor.lastName}` : ''}
                onChange={(e) => setMyGroup({ ...myGroup, member4: e.target.value })}
                fullWidth
                className="mb-2"
                disabled
              />
              <Select
                labelId="leader-label"
                value={myGroup.groupLeader}
                onChange={(e) => setMyGroup({ ...myGroup, groupLeader: e.target.value })}
                fullWidth
                className="mb-2"
              >
                <MenuItem value="">Select The Leader</MenuItem>
                {[myGroup.member1,
                myGroup.member2,
                myGroup.member3,
                myGroup.member4].map((member, index) => (
                  <MenuItem key={index} value={member}>{member}</MenuItem>
                ))}
              </Select>
              <Box className="mb-2">
                <Checkbox
                  checked={myGroup.reason || reason}
                  onChange={() => setMyGroup(prevState => ({ ...prevState, reason: !prevState.reason }))}
                />
                <InputLabel id="checkbox">I have a reason to Prove Specialization and the Semester..</InputLabel>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleUpdate} color="primary">Update</Button>
              <Button onClick={handleUpdateDialogClose} color="secondary">Cancel</Button>
            </DialogActions>
          </Dialog>
        </>
      )}

      {!myGroup && <div className="container mx-auto mt-10">
        <h1 className="text-3xl font-bold mb-5">My Group</h1>
        <div className="space-y-3">
          <TextField
            label="Member 1"
            value={member1}
            onChange={(e) => setMember1(e.target.value)}
            fullWidth
          />
          <TextField
            label="Member 2"
            value={member2}
            onChange={(e) => setMember2(e.target.value)}
            fullWidth
          />
          <TextField
            label="Member 3"
            value={member3}
            onChange={(e) => setMember3(e.target.value)}
            fullWidth
          />
          <TextField
            label="Member 4"
            value={member4}
            onChange={(e) => setMember4(e.target.value)}
            fullWidth
          />

          <FormControl fullWidth>
            <InputLabel id="leader-label">Supervisor</InputLabel>
            <Select
              labelId="leader-label"
              value={selectedUser}
              onChange={(e) => setSelectedUser(e.target.value)}
            >
              <MenuItem value="">Select Supervisor</MenuItem>
              {users.map(user => (
                <MenuItem key={user.id} value={user._id}>
                  {user.firstName} {user.lastName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="leader-label">Group Leader</InputLabel>
            <Select
              labelId="leader-label"
              value={leader}
              onChange={(e) => setLeader(e.target.value)}
            >
              <MenuItem value="">Select The Leader</MenuItem>
              {[member1, member2, member3, member4].map((member, index) => (
                <MenuItem key={index} value={member}>{member}</MenuItem>
              ))}
            </Select>


          </FormControl>
          <Box>
            <Checkbox checked={reason} onChange={() => setReason(pre => (!pre))} />
            <InputLabel id="checkbox">I have a reason to Prove Specialization and the Semester..</InputLabel>
          </Box>
          <div className="flex justify-between">
            <Button variant="contained" onClick={handleSubmit} color="primary">
              Submit
            </Button>
            <Button variant="contained" onClick={handleCancel} color="error">
              Cancel
            </Button>
          </div>
        </div>
      </div>}
    </>
  );
}

export default MyTeam;
