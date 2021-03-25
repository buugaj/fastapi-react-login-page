import React from 'react';
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import {makeStyles} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {needsOtpVerification} from './authSlice';
import {Login} from "./Login";
import {Snackbar} from "@material-ui/core";
import {Alert} from "@material-ui/lab";
import {SnackbarCloseReason} from "@material-ui/core/Snackbar/Snackbar";
import {OtpConfirm} from "./OTPConfirm";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
}));

export function Auth() {
    const otpVerification = useSelector(needsOtpVerification);
    const [errorMessage, setErrorMessage] = React.useState("");
    const [errorOpen, setErrorOpen] = React.useState(false);
    const showErrorMessage = (message: string) => {
        setErrorMessage(message);
        setErrorOpen(true);
    };
    const handleClose = (event: React.SyntheticEvent<any>, reason ?: SnackbarCloseReason) => {
        if (reason === "clickaway") {
            return;
        }
        setErrorOpen(false);
    };
    const classes = useStyles();

    return <Container component="main" maxWidth="xs">
        <CssBaseline/>
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>
            {!otpVerification && <Login showErrorMessage={showErrorMessage}/>}
            {otpVerification && <OtpConfirm showErrorMessage={showErrorMessage}/>}
        </div>
        <Snackbar open={errorOpen} autoHideDuration={5000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
                {errorMessage}
            </Alert>
        </Snackbar>
    </Container>
}
