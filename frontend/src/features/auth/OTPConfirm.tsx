import React from 'react';
import {useForm} from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import {confirm_otp_token} from "../../api/auth";
import {useDispatch, useSelector} from "react-redux";
import {accessToken, clearAccessToken, setAccessToken} from './authSlice';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    circularProgress: {
        marginLeft: theme.spacing(1),
    },
}));

export function OtpConfirm(props: any) {
    const token = useSelector(accessToken);
    const [pending, setPending] = React.useState(false);
    const dispatch = useDispatch();
    const cancel = () => {
        dispatch(clearAccessToken());
    }
    const {register, errors, handleSubmit, formState} = useForm({
            mode: "all",
        }
    );
    const onSubmit = async (data: any) => {
        setPending(true);
        try {
            const response = await confirm_otp_token(token, data["otp_token"]);
            if("access_token" in response) {
                dispatch(setAccessToken(response["access_token"]));
            }
        } catch (e) {
            props.showErrorMessage(e);
        } finally {
            setPending(false)
        }
    };
    const classes = useStyles();

    return <>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="otp_token"
                    label="One time password"
                    name="otp_token"
                    autoComplete="email"
                    autoFocus
                    inputRef={register({
                        required: 'You must provide the one time password!',
                    })
                    }
                    error={!!errors.otp_token}
                    helperText={errors.otp_token ? errors.otp_token.message : null}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={!formState.isValid || pending}
                >
                    Sign In {pending && <CircularProgress className={classes.circularProgress} size={16}/>}
                </Button >
                <Button
                    fullWidth
                    variant="contained"
                    className={classes.submit}
                    onClick={cancel}
                >
                    Cancel
                </Button >
            </form>
        </>
}
