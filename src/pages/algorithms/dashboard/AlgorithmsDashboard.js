import * as React from 'react';
import Container from '@mui/material/Container';
import Navbar from 'components/Navbar.js';
import Footer from 'components/Footer.js';

export default function AlgorithmsDashboard(props) {
  return (
    <div>
      <Navbar />
      <Container maxWidth="lg">
        {props.component}
      </Container>
      <Footer />
    </div>
  );
}
