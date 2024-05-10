import React, { useRef, useState } from "react";

import { styled } from "@mui/material/styles";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField } from "@mui/material";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

const MyResults = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        backgroundColor: theme.palette.info.dark,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 'bold',
    }));

    const results = [
        { id: 1, semester: "Semester1", assignment: "Assignment 1", type: "Proposal", marks: 85 },
        { id: 2, semester: "Semester1", assignment: "Assignment 2", type: "Research Paper", marks: 70 },
    ];

    const generatePDF = () => {
        const doc = new jsPDF();
        const head = [['Semester', 'Assignment', 'Assignment Type', 'Marks']];
        const body = results.map(result => [result.semester, result.assignment, result.type, result.marks]);
        doc.autoTable({
            head: head,
            body: body,
            startY: 20
        });
        doc.save("results.pdf");
    };

    const handleSearch = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        const filtered = results.filter(result =>
            result.semester.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredResults(filtered);
    };

    const renderResults = searchQuery ? filteredResults : results;

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginLeft:'450px'}}>My Results</h2>
                </div>
                <div>
                    <TextField
                        label="Search By Semester"
                        variant="outlined"
                        size="small"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>
                <div style={{ marginRight: '1rem' }}>
                    <Button variant="contained" color="primary" onClick={generatePDF}>Generate PDF</Button>
                </div>
            </div>
            <div style={{ margin: '0 auto', maxWidth: '800px', borderRadius: '16px', overflow: 'hidden' }}>
                <TableContainer component={Paper} sx={{ borderRadius: '16px 16px 0 0' }}>
                    <Table aria-label="results table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Semester</StyledTableCell>
                                <StyledTableCell>Assignment</StyledTableCell>
                                <StyledTableCell>Assignment Type</StyledTableCell>
                                <StyledTableCell>Marks</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {renderResults.map((result) => (
                                <TableRow key={result.id}>
                                    <TableCell>{result.semester}</TableCell>
                                    <TableCell>{result.assignment}</TableCell>
                                    <TableCell>{result.type}</TableCell>
                                    <TableCell>{result.marks}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
};

export default MyResults;
