import React, { useState } from "react";
import AddStudents from "../../components/AddStudents";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

export default function UserMNG() {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <>
            <h1>Manage Users</h1>
            <Button variant="contained" onClick={handleOpen}>Add Students</Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add Students</DialogTitle>
                <DialogContent>
                    <AddStudents />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
