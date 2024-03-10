import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function SimpleCard({ name, to, count, icon }) {
  const navigate = useNavigate();

  return (
    <Card sx={{ minWidth: 250 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.primary" gutterBottom>
          {name}
        </Typography>
        <Box component={'div'} className='flex items-center gap-3'>
          {icon}
          <Typography variant="h5" component="div">
            {count}
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate(`/dashboard/${to}`)}>
          Manage
        </Button>
      </CardActions>
    </Card>
  );
}
