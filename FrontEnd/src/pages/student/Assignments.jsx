import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Button, IconButton, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Link } from "react-router-dom";

const Assignments = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [comment, setComment] = useState('');

    const assignments = [
        { id: 1, title: "Assignment 1", type: "Report", subType: "Project Proposal", deadline: "2024-03-25", description: "Need the project proposal report" },
        { id: 2, title: "Assignment 2", type: "Report", subType: "Logbook", deadline: "2024-03-28", description: "Research and present findings" },
        { id: 3, title: "Assignment 3", type: "Report", subType: "40% Report", deadline: "2024-03-28", description: "UI Document with Gannt chart" },
    ];

    const handleViewDetails = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedAssignment(null);
        setComment('');
    };

    const handleFileChange = (event) => {
        // Handle file change logic here
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'bold',
        // borderLeftRadius: '16px', // Set corner radius to top left
        // borderRightRadius: '16px', // Set corner radius to top right
    }));

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pending Assignments - {assignments.length}</h2>
            </div>
            <div style={{ margin: '0 auto', maxWidth: '800px',borderLeftRadius: '16px',borderRightRadius: '16px' }}>
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
                                <TableRow key={assignment.id}>
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
                            <input accept="image/*" id="file-upload" type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            <Grid style={{ marginTop: '1rem' }}>
                                <label htmlFor="file-upload">
                                    <Button variant="contained" component="span">
                                        Upload
                                    </Button>
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
