import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Grid } from "@mui/material";
import { Link } from "react-router-dom";

export default function Research() {
    const [itemName, setItemName] = useState("");
    const [category, setCategory] = useState("");
    const [student1, setStudent1] = useState("");
    const [student2, setStudent2] = useState("");
    const [student3, setStudent3] = useState("");
    const [student4, setStudent4] = useState("");

    const [supervisor1, setSupervisor1] = useState("");
    const [supervisor2, setSupervisor2] = useState("");
    const [image, setImage] = useState(null);

    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic here
    };

    return (
        <div className="max-w-md mx-auto">
            <h1 className="text-3xl text-center mb-6">Research Paper Submission</h1>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Research Title"
                            variant="outlined"
                            value={itemName}
                            onChange={(e) => setItemName(e.target.value)}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <h2 className="text-xl mb-2">Students</h2>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="student1-label">Student 1</InputLabel>
                            <Select
                                labelId="student1-label"
                                value={student1}
                                onChange={(e) => setStudent1(e.target.value)}
                                label="Student 1"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="student2-label">Student 2</InputLabel>
                            <Select
                                labelId="student2-label"
                                value={student2}
                                onChange={(e) => setStudent2(e.target.value)}
                                label="Student 2"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="student3-label">Student 3</InputLabel>
                            <Select
                                labelId="student3-label"
                                value={student3}
                                onChange={(e) => setStudent3(e.target.value)}
                                label="Student 3"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="student4-label">Student 4</InputLabel>
                            <Select
                                labelId="student4-label"
                                value={student4}
                                onChange={(e) => setStudent4(e.target.value)}
                                label="Student 4"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <h2 className="text-xl mb-2">Supervisors</h2>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="supervisor1">Supervisor1</InputLabel>
                            <Select
                                labelId="supervisor1-label"
                                value={supervisor1}
                                onChange={(e) => setSupervisor1(e.target.value)}
                                label="Student 3"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel id="supervisor2-label">Supervisor2</InputLabel>
                            <Select
                                labelId="supervisor2-label"
                                value={supervisor2}
                                onChange={(e) => setSupervisor2(e.target.value)}
                                label="Student 4"
                            >
                                <MenuItem value="IT21158186">IT21158186</MenuItem>
                                <MenuItem value="IT21174308">IT21174308</MenuItem>
                                <MenuItem value="IT21158575">IT21158575</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item xs={12}>
                        <input
                            accept="file/*"
                            id="file-upload"
                            type="file"
                            onChange={handleFileChange}
                            className="hidden"
                        />
                        <label htmlFor="file-upload">
                            <Button variant="contained" component="span">
                                Upload File
                            </Button>
                        </label>
                    </Grid>
                </Grid>

                <br />

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
    <Button style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: '8px' }} variant="contained" fullWidth>
        Add
    </Button>
    <div style={{ width: '8px' }}></div> {/* This adds space between buttons */}
    <Button style={{ backgroundColor: '#f44336', color: 'white' }} variant="contained" fullWidth component={Link} to="/inventory">
        Cancel
    </Button>
</div>

            </form>
        </div>
    );
}
