import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Button, IconButton, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    backgroundColor: theme.palette.info.dark,
    color: theme.palette.common.white,
    fontSize: 14,
    fontWeight: 'bold',
}));


const Assignments = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [comment, setComment] = useState('');
    const [assignments, setAssignments] = useState([]);
    const [file, setFile] = useState(null); // State to hold the uploaded file

    useEffect(() => {
        const fetchAssignments = async () => {
            try {
                const response = await axios.get("http://localhost:510/student/assignments");
                setAssignments(response.data);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };
        fetchAssignments();
    }, []);

    const handleViewDetails = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedAssignment(null);
        setComment('');
    };

    const handleFile = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            // Upload file to Cloudinary
            const formData = new FormData();
            formData.append('file', file);
            formData.append("upload_preset", "692727433933717");
            const cloudinaryResponse = await axios.post(`https://api.cloudinary.com/v1_1/dhnhq8l83/image/upload`, formData);
    
            // Extract necessary data from Cloudinary response
            const fileUrl = cloudinaryResponse.data.secure_url;
    
            // Create submission object
            const submissionData = {
                assignmentId: selectedAssignment._id,
                fileUrl: fileUrl,
                comment: comment
            };
    
            // Send submission data to backend to store in the database
            await axios.post('http://localhost:510/submit-assignment', submissionData);
    
            // Close dialog and reset state
            handleCloseDialog();
        } catch (error) {
            console.error("Error submitting assignment:", error);
            // Handle error gracefully, show error message or retry logic
        }
    };
    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pending Assignments - {assignments.length}</h2>
            </div>
            <div style={{ margin: '0 auto', maxWidth: '1000px',borderLeftRadius: '16px',borderRightRadius: '16px' }}>
            <TableContainer component={Paper} sx={{ borderRadius: '16px 16px 0 0' }}>
                    <Table aria-label="assignments table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Title</StyledTableCell>
                                <StyledTableCell>Type</StyledTableCell>
                                <StyledTableCell>Sub Type</StyledTableCell>
                                <StyledTableCell>Deadline</StyledTableCell>
                                <StyledTableCell>Description</StyledTableCell>
                                <StyledTableCell></StyledTableCell> 
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment._id}>
                                    <TableCell>{assignment.title}</TableCell>
                                    <TableCell>{assignment.type}</TableCell>
                                    <TableCell>{assignment.subType}</TableCell>
                                    <TableCell>{assignment.deadline}</TableCell>
                                    <TableCell>{assignment.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleViewDetails(assignment)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            {/*View the assignment and Submission dialog here.. */}
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent style={{ maxWidth: '400px', margin: '0 auto' }}>
                    <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Assignment Details</h1>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <div><strong>Title:</strong> {selectedAssignment ? selectedAssignment.title : ""} </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div><strong>Type:</strong> {selectedAssignment ? selectedAssignment.type : ""}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div><strong>Sub Type:</strong> {selectedAssignment ? selectedAssignment.subType : ""}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div><strong>Deadline:</strong> {selectedAssignment ? selectedAssignment.deadline : ""}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div><strong>Description:</strong> {selectedAssignment ? selectedAssignment.description : ""}</div>
                        </Grid>
                        <form onSubmit={handleSubmit}>
                            <input accept="image/*" id="file-upload" type="file" onChange={handleFile} />
                            <Grid style={{ marginTop: '1rem' }}>
                                <label htmlFor="file-upload">
                                    
                                </label>
                                
                            </Grid>
                            <br></br>
                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Add Comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </Grid>
                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <Button style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                <Button style={{ backgroundColor: '#f44336', color: 'white' }} variant="contained" onClick={handleCloseDialog}>
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Assignments;
