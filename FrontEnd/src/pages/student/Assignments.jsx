import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogContent, Button, IconButton, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import axios from "axios";
import authAxios from "../utils/authAxios";
import { uploadFileToCloud } from "../utils/CloudinaryConfig";
import { toast } from "react-toastify";
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Assignments = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialog2, setOpenDialog2] = useState(false);
    const [submittedAssignment, setSubmittedAssignment] = useState({});
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [comment, setComment] = useState('');
    const [loggedInId, setLoggedInId] = useState("");
    const [assignments, setAssignments] = useState([]);
    const [file, setFile] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [formData, setFormData] = useState({
        fileUrl: "",
        comment: "",
        submittedBy: ""
    });

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

    useEffect(() => {
        const fetchLoggedInId = async () => {
            try {
                const response = await authAxios.get("http://localhost:510/student/get-student");
                setLoggedInId(response.data._id);
                console.log(response.data._id);
            } catch (error) {
                console.error("Error fetching logged in user ID:", error);
            }
        };
        fetchLoggedInId();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleViewDetails = (assignment) => {
        setSelectedAssignment(assignment);
        setOpenDialog(true);
    };

    const fetchSubmittedAssignments = async (id) => {
        try {
            const response = await authAxios.get(`http://localhost:510/student/assignments/${id}`);
            setSubmittedAssignment(response.data);
            setComment(response.data.comment || "");
            setPreviewImage(response.data.fileUrl || "");
            console.log(response);
        } catch (error) {
            console.error(error);
        }
    };

    const handleViewAssignments = (assignment) => {
        fetchSubmittedAssignments(assignment._id);
        setOpenDialog2(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setSelectedAssignment(null);
        setComment('');
        setFormData({
            fileUrl: "",
            comment: "",
            submittedBy: ""
        })
    }

    const handleCloseDialog2 = () => {
        setOpenDialog2(false);
        setFormData({
            fileUrl: "",
            comment: "",
            submittedBy: ""
        })
        setComment('');
    };

    const renameFile = (file, newName) => {
        const renamedFile = new File([file], newName, { type: file.type });
        return renamedFile;
    };

    const handleFileUpload = async (event) => {
        console.log('file change');
        const file = event.target.files[0];
        if (file) {
            if (file.type === 'application/pdf') {
                const renamedFile = await renameFile(file, file.name.replace(/\.pdf$/, '.jpg'));
                if (renamedFile) {
                    setIsUploading(true);
                    try {
                        const resp = await uploadFileToCloud(renamedFile);
                        setPreviewImage(resp);
                    } catch (error) {
                        console.error('Error uploading file:', error);
                    } finally {
                        setIsUploading(false);
                    }
                } else {
                    console.error('Error renaming file.');
                }
            } else if (file.type.startsWith('file/')) {
                setIsUploading(true);
                try {
                    const resp = await uploadFileToCloud(file);
                    setPreviewImage(resp);
                } catch (error) {
                    console.error('Error uploading file:', error);
                } finally {
                    setIsUploading(false);
                }
            } else {
                alert('Please select an image or PDF file.');
            }
        }
    };

    const handleFileUpdate = async (event) => {
        console.log('file change');
        const file = event.target.files[0];
        if (file) {
            setIsUploading(true);
            try {
                const resp = await uploadFileToCloud(file);
                setPreviewImage(resp);
            } catch (error) {
                console.error('Error uploading file:', error);
            } finally {
                setIsUploading(false);
            }
        }
    };

    useEffect(() => {
        if (selectedAssignment) {
            setFormData(prevFormData => ({
                ...prevFormData,
                assignmentId: selectedAssignment._id,
                fileUrl: previewImage,
                comment: comment,
                submittedBy: loggedInId
            }));
        }
    }, [comment, previewImage, selectedAssignment, loggedInId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            console.log('formData', formData);
            console.log('previewImage', previewImage);
            if (!formData.fileUrl) {
                throw Error('Image is required')
            }
            const response = await authAxios.post('http://localhost:510/student/submit-assignment', formData);
            console.log("Assignment Submitted successfully!");
            handleCloseDialog();
            toast.success("Assignment Submitted successfully!");
        } catch (error) {
            console.error("Error submitting Assignment:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        const updatedData = {
            fileUrl: previewImage,
            comment: comment,
            submittedBy: loggedInId
        };

        try {
            const response = await authAxios.put(`http://localhost:510/student/assignments/${submittedAssignment._id}`, updatedData);
            console.log("Assignment Updated successfully!");
            handleCloseDialog2();
            toast.success("Assignment Updated successfully!");
        } catch (error) {
            console.error("Error updating assignment:", error);
            toast.error(error.response.data.error);
        }
    };

    const handleDeleteSubmission = async (id) => {
        try {
            const response = await authAxios.delete(`http://localhost:510/student/assignments/${id}`);
            console.log(response);
            handleCloseDialog2();
            toast.success('Assignment deleted successfully');
        } catch (error) {
            console.error(error);
            toast.error(error.response.data.error);
        }
    };

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'bold',
    }));

    return (
        <>
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Pending Assignments - {assignments.length}</h2>
            </div>
            <div style={{ margin: '0 auto', maxWidth: '1000px', borderLeftRadius: '16px', borderRightRadius: '16px' }}>
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
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {assignments.map((assignment) => (
                                <TableRow key={assignment._id}>
                                    <TableCell>{assignment.title}</TableCell>
                                    <TableCell>{assignment.type}</TableCell>
                                    <TableCell>{assignment.subType}</TableCell>
                                    <TableCell>{formatDate(assignment.deadline)}</TableCell>
                                    <TableCell>{assignment.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleViewDetails(assignment)}>
                                            <UploadFileIcon />
                                        </IconButton>
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => handleViewAssignments(assignment)}>
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

            <Dialog open={openDialog2} onClose={handleCloseDialog2}>
                {submittedAssignment ?
                    <DialogContent style={{ maxWidth: '80%', margin: 'auto' }}>
                        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Assignment Details</h1>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <div>
                                    <strong>Title:</strong>
                                    {submittedAssignment.assignmentId ? submittedAssignment.assignmentId.title : ""}
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <strong>File:</strong>
                                    <a href="{submittedAssignment ? submittedAssignment.fileUrl : ''}" download>
                                        Download File
                                    </a>
                                </div>

                            </Grid>
                            <Grid item xs={12}>
                                <div>
                                    <strong>Submited Date:</strong>
                                    {submittedAssignment ? `${formatDate(submittedAssignment.updatedAt)}` : ""}
                                </div>
                            </Grid>

                            <form onSubmit={handleUpdate}>
                                <div className="col mt-10">
                                    <label className="block text-sm font-medium text-slate-500" htmlFor="acceptanceLetterUpload">
                                        Upload File
                                    </label>
                                    <input
                                        type="file"
                                        accept="file/*"
                                        className="block w-72 min-w-[425px] mb-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                                    placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                        name="acceptanceLetterUpload"
                                        onChange={handleFileUpdate}
                                    />

                                </div>

                                <Grid item xs={12}>
                                    <TextField fullWidth multiline rows={4} label="Add Comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
                                </Grid>

                                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                    <Button style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" type="submit">
                                        Save
                                    </Button>
                                    <Button color="error" style={{ marginRight: '8px' }} variant="contained" type="submit"
                                        onClick={() => { handleDeleteSubmission(submittedAssignment._id) }}>
                                        Delete
                                    </Button>
                                </div>
                            </form>
                        </Grid>

                    </DialogContent> :
                    'Not Submitted Yet!'}
            </Dialog>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogContent style={{ maxWidth: '90%', margin: '0 auto' }}>
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
                            <div><strong>Deadline:</strong> {selectedAssignment ? formatDate(selectedAssignment.deadline) : ""}</div>
                        </Grid>
                        <Grid item xs={12}>
                            <div><strong>Description:</strong> {selectedAssignment ? selectedAssignment.description : ""}</div>
                        </Grid>

                        <form onSubmit={handleSubmit}>
                            <div className="col mt-10">
                                <label className="block text-sm font-medium text-slate-500" htmlFor="acceptanceLetterUpload">
                                    Upload File
                                </label>
                                <input
                                    type="file"
                                    accept="file/*"
                                    className="block w-72 min-w-[425px] mb-3 px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm
                                    placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                                    invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                                    name="acceptanceLetterUpload"
                                    onChange={handleFileUpload}
                                />

                            </div>

                            <Grid item xs={12}>
                                <TextField fullWidth multiline rows={4} label="Add Comment" variant="outlined" value={comment} onChange={(e) => setComment(e.target.value)} />
                            </Grid>

                            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
                                <Button style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" type="submit">
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
