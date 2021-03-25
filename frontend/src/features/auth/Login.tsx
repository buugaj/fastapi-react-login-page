import React from 'react';
import {useForm} from "react-hook-form";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {makeStyles} from "@material-ui/core/styles";
import {CircularProgress} from "@material-ui/core";
import {login} from "../../api/auth";
import {useDispatch} from "react-redux";
import {setAccessToken} from './authSlice';

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

export function Login(props: any) {
    // eslint-disable-next-line no-control-regex
    const email_regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const [pending, setPending] = React.useState(false);
    const dispatch = useDispatch();
    const {register, errors, handleSubmit, formState} = useForm({
            mode: "all",
        }
    );
    const onSubmit = async (data: any) => {
        setPending(true);
        try {
            const response = await login(data["email"], data["password"]);
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
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    inputRef={register({
                        required: 'You must provide the email address!',
                        pattern: {
                            value: email_regex,
                            message: 'You must provide a valid email address!',
                        },
                    })
                    }
                    error={!!errors.email}
                    helperText={errors.email ? errors.email.message : null}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    inputRef={register({
                        required: 'This field is required'
                    })
                    }
                    error={!!errors.password}
                    helperText={errors.password ? errors.password.message : null}
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
            </form>
        </>
}
