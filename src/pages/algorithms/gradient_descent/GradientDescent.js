// ------------------------ IMPORTS ------------------------  
import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { Button, Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { LeftItem } from 'pages/algorithms/dashboard/utils';
import GradientDescent1D from './slides/GradientDescent1D.js';
import GradientDescent2D from './slides/GradientDescent2D.js';
import Introduction1D from './slides/Introduction1D.js';
import Introduction2D from './slides/Introduction2D.js';

const steps = [
    '1D Introduction', 
    'Visualization', 
    'Step By Step', 
    'Hyper-Parameter', 
    '2D Introduction', 
    'Visualization', 
    'Step By Step', 
    'Hyper-Parameter'
];

export default function GradientDescent() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {
        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
        window.scrollTo(0, 0)
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        window.scrollTo(0, 0)
    };

    const handleReset = () => {
        setActiveStep(0);
        window.scrollTo(0, 0)
    };
    
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            {activeStep === steps.length ? (
                <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                    </Box>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <Container maxWidth="md">
                        <Box height={50} />
                        {/* First Slide */}
                        {(activeStep === 0) && (
                            <Introduction1D />
                        )}
                        
                        {(activeStep === 1) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Enter any function you want (the variable must be x), Hyper-Parameter and set the starting point.<br/>
                                        Hit Play button to start the animation, you can also pause it and zoom in the graph by clicking pasue button or clear everthing on the X button.<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent1D 
                                    alphaType = 'input'
                                    buttonsType = 'playGround'
                                    generateQuestionTable = { false }
                                />
                            </Box>
                        )}

                        {(activeStep === 2) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Try calculate the value of each variable as the algorithm does (2 decimal points).<br/>
                                        Each click on arrow will draw the next/previous step<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent1D 
                                    alphaType = 'input'
                                    buttonsType = 'stepByStep'
                                    generateQuestionTable = { true }
                                />
                            </Box>
                        )}

                        {(activeStep === 3) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Search for the best alpha which gets to the minimum with least steps.<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent1D 
                                    alphaType = 'slider'
                                    buttonsType = 'hyperParameter'
                                    generateQuestionTable = { false }
                                />
                            </Box>
                        )}

                        {(activeStep === 4) && (
                            <Introduction2D />
                        )}

                        {(activeStep === 5) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Try it yourself like before (variables must be x and y).<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent2D 
                                    alphaType = 'input'
                                    buttonsType = 'playGround'
                                    generateQuestionTable = { false }
                                />
                            </Box>
                        )}

                        {(activeStep === 6) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Challenge yourslef and calculate each step.<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent2D 
                                    alphaType = 'input'
                                    buttonsType = 'stepByStep'
                                    generateQuestionTable = { true }
                                />
                            </Box>
                        )}

                        {(activeStep === 7) && (
                            <Box>
                                <LeftItem>
                                    <Typography>
                                        Search for the best alpha which gets to the minimum with least steps.<br/>
                                    </Typography>
                                </LeftItem>
                                <GradientDescent2D 
                                alphaType = 'slider'
                                buttonsType = 'hyperParameter'
                                generateQuestionTable = { false }
                                />
                            </Box>
                        )}
                        <Box height={50} />
                    </Container>
                    
                    {/* slide managing code */}
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                        >
                            Back
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleNext}>
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </React.Fragment>
            )}
            <Box height={50} />
        </Box>
    );
}
