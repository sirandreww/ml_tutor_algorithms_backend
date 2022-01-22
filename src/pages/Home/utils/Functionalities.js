import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import backgroundImage from "assets/images/appCurvyLines.png"
import graphIcon from "assets/images/graphIcon.png"
import StepByStepIcon from "assets/images/StepByStepIcon.jpg"
import historyIcon from "assets/images/historyIcon.jpg"
import LenseIcon from "assets/images/LenseIcon.png"
import { Paper } from '@mui/material';

const item = {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    px: 5,
};

function ProductValues() {
    const text_color = '#3c4e76';
    return (
        <Container maxWidth="lg">
            <Paper sx={{ width: "100%" }} elevation={3}>
                <Box
                    sx={{
                        background: `url(${backgroundImage})`,
                        backgroundColor: '#E4EFE7',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat',
                        pt: 6,
                        pb: 6,
                        minHeight: 400,
                    }}
                >
                    <Container maxWidth="xl">
                        <Grid container spacing={5}>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={graphIcon}
                                        alt="graph icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        2D/3D visual representation
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        Understand the underlying mathematics using visual methods.
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={StepByStepIcon}
                                        alt="step by step icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        Step by Step demonstrations
                                    </Typography >
                                    <Typography variant="h5" color={text_color} align="center">
                                        We take you through the learning process with no sudden jumps along the way!
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={historyIcon}
                                        alt="history icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        Track your progress
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        Never lose track of where you are.
                                    </Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={3}>
                                <Box sx={item}>
                                    <Box
                                        component="img"
                                        src={LenseIcon}
                                        alt="history icon"
                                        sx={{ height: 55 }}
                                    />
                                    <Typography variant="h6" sx={{ my: 5 }} color={text_color} align="center">
                                        Easy to understand
                                    </Typography>
                                    <Typography variant="h5" color={text_color} align="center">
                                        Finally get that one topic you could never master!
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Paper>
        </Container>
    );
}

export default ProductValues;