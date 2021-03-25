import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {useDispatch} from "react-redux";
import {clearAccessToken} from '../auth/authSlice';

export function Content() {
    const dispatch = useDispatch();
    const logout = () => {
        dispatch(clearAccessToken());
    }
    return <Container component="main" maxWidth="xs">
        <div>
            <Typography component="h1" variant="h5">
                You're logged in!
            </Typography>
            <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={logout}
            >
                Log out
            </Button>
        </div>
    </Container>
}
