import * as React from 'react';
import Navbar from 'components/Navbar';

export default function MovingNavbar(props) {
    return (
        <Navbar
            appBarParameters={{
                position: "absolute",
                sx: {
                    ...(props.isOpen && {
                        marginLeft: props.widthOpened,
                        width: `calc(100% - ${props.widthOpened}px)`,
                        transition: props.theme.transitions.create(['width', 'margin'], {
                            easing: props.theme.transitions.easing.sharp,
                            duration: props.theme.transitions.duration.enteringScreen,
                        }),
                    }),
                    ...(!props.isOpen && {
                        marginLeft: props.widthClosed,
                        width: `calc(100% - ${props.widthClosed}px)`,
                        transition: props.theme.transitions.create(['width', 'margin'], {
                            easing: props.theme.transitions.easing.sharp,
                            duration: props.theme.transitions.duration.leavingScreen,
                        }),
                    }),
                }
            }}
        />
    );
};




