import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function FixedContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container  style={{position: 'fixed'}}>
        <Box sx={{bgcolor: '#ffffff', height: '8vh', maxWidth:'xl', }} />
      </Container>
    </React.Fragment>
  );
}