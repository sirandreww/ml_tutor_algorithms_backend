import * as React from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box, Container } from '@mui/material';
import { Grid, Paper } from '@mui/material';
import Graph2D from 'components/Graph2D';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <Box
      sx={{
        backgroundColor: "white",
        pt: 20,
        pb: 6,
        minHeight: 700,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} md={6}>
            {/* Hero Title */}
            <Typography
              component="h1"
              variant="h1"
              align="left"
              color="black"
              fontFamily={"Arial"}
              gutterBottom
            >
              MLomda
            </Typography>

            {/* Hero description */}
            <Typography variant="h4" align="left" color="#777777" paragraph fontFamily={"Arial"}>
              Understand how Machine Learning works by using 3D animation and simple explanations.
            </Typography>

            {/* a bit of space */}
            <Box sx={{ minHeight: 30, }}></Box>

            {/* Button */}
            <Link to={"/algorithms"} style={{ textDecoration: 'none' }}>
              <Button variant="contained" sx={{ textTransform: "none", backgroundColor: "#209070", height: "60px", width: "200px" }}>
                <Typography variant="h6" align="center" color="white" fontFamily={"Arial"}>
                  Get started
                </Typography>
              </Button>
            </Link>

          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ width: "100%", height: "475px" }} elevation={3}>
              <Graph2D function="x^2 + 0.01*(y^4 - 100*y^2 + 100*y)" />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}