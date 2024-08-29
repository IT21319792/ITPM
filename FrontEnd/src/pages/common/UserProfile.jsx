import React, { useEffect, useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authAxios from '../utils/authAxios';
import { apiUrl } from '../utils/Constants';
import Loader from '../../components/Loader/Loader';
import { useAuth } from './AuthContext';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Create a theme instance
const theme = createTheme();

// Use Tailwind CSS classes
const CenteredContainer = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '65vh',
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  textAlign: 'center',
  color: theme?.palette?.text?.primary || '#000',
}));

// React functional component
const UserProfile = () => {
  const navigate = useNavigate();
  const { logout, userRole } = useAuth();
  const [student, setStudent] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updateFormData, setUpdateFormData] = useState({
    _id: '',
    firstName: '',
    lastName: '',
    email: '',
    contactNo: '',
  });

  const handleUpdateUser = (row) => {
    setOpenUpdateDialog(true);
    setUpdateFormData({
      _id: row._id,
      firstName: row.firstName,
      lastName: row.lastName,
      email: row.email,
      contactNo: row.contactNo,
    });
  };

  const handleDialogClose = () => {
    setOpenUpdateDialog(false);
  };

  const handleUpdate = async () => {
    try {
      const result = await authAxios.put(`http://localhost:510/student/update-student/${updateFormData._id}`, updateFormData);
      if (result) {
        getStudentDetails();
        toast.success('User Updated Successfully');
        handleDialogClose();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const getStudentDetails = async () => {
    try {
      const response = await authAxios.get('http://localhost:510/student/get-student');
      setStudent(response.data);
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      if (error.response && error.response.status === 404) {
        toast.error('Student profile not found.');
      } else {
        toast.error(error.response?.data?.message || 'An error occurred');
      }
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      const result = await authAxios.delete(`http://localhost:510/student/delete-account/${id}`);
      if (result) {
        toast.warning('User Deleted Successfully');
        logout();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    getStudentDetails();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CenteredContainer container>
        {
          !isLoading ? (
            <Grid item xs={12} sm={8} md={6} lg={4}>
              <ProfilePaper elevation={3}>
                <Avatar sx={{ width: 100, height: 100, margin: '0 auto' }} />
                <Typography variant="h5" sx={{ marginTop: 1 }}>
                  {student.firstName} {student.lastName}
                </Typography>
                <Typography variant="caption" display="block" sx={{ marginBottom: 1 }}>
                  {student.role}
                </Typography>
                <Divider sx={{ marginBottom: 2 }} />
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Email:</span> {student.email}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 1 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Phone:</span> {student.contactNo}
                </Typography>
                <Typography variant="body1" sx={{ marginBottom: 2 }}>
                  <span style={{ fontWeight: 'bold', color: '#444' }}>Create Date:</span> {new Date(student.createdAt).toLocaleDateString()}
                </Typography>
                <div>
                  <Button onClick={() => handleUpdateUser(student)}>Edit</Button>
                  <Button color='error' onClick={() => handleDeleteStudent(student._id)}>Delete</Button>
                </div>
              </ProfilePaper>
            </Grid>
          ) : <Loader />
        }
        <Dialog open={openUpdateDialog} onClose={handleDialogClose}>
          <DialogTitle>Update Details</DialogTitle>
          <DialogContent>
            <TextField
              required
              label="First Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setUpdateFormData({ ...updateFormData, firstName: e.target.value })}
              value={updateFormData.firstName}
            />
            <TextField
              required
              label="Last Name"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setUpdateFormData({ ...updateFormData, lastName: e.target.value })}
              value={updateFormData.lastName}
            />
            <TextField
              required
              label="Contact No"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setUpdateFormData({ ...updateFormData, contactNo: e.target.value })}
              value={updateFormData.contactNo}
            />
            <TextField
              required
              label="Email"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={(e) => setUpdateFormData({ ...updateFormData, email: e.target.value })}
              value={updateFormData.email}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdate} color="primary">Submit</Button>
            <Button onClick={handleDialogClose} color="secondary">Cancel</Button>
          </DialogActions>
        </Dialog>
      </CenteredContainer>
    </ThemeProvider>
  );
};

export default UserProfile;
