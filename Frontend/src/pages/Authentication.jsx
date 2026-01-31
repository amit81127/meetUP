import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
    Snackbar,
    Alert,
    IconButton,
    InputAdornment,
    CircularProgress,
    Fade,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { AuthContext } from "../contexts/AuthContext";

const defaultTheme = createTheme();

export default function Authentication() {
    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0); // 0 = login, 1 = register
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        if (!username || !password || (formState === 1 && !name)) {
            setError("Please fill all required fields");
            return;
        }

        setError("");
        setLoading(true);

        try {
            let result;

            if (formState === 0) {
                result = await handleLogin(username, password);
            } else {
                result = await handleRegister(name, username, password);
                setFormState(0);
                setName("");
            }

            setMessage(result);
            setOpen(true);
            setUsername("");
            setPassword("");
        } catch (err) {
            setError(err?.message || "Authentication failed");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleAuth();
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />

                {/* Left Image */}
                <Grid
                    sx={{
                        minHeight: "100vh",

                        gridColumn: {
                            xs: "1 / -1",
                            sm: "1 / span 1",
                            md: "1 / span 1",
                        },

                        display: {
                            xs: "none",
                            sm: "block",
                        },

                        backgroundImage: `
      linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)),
      url('https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80')
    `,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />




                {/* Right Form */}
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={8} square>
                    <Fade in timeout={600}>
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                                <LockOutlinedIcon />
                            </Avatar>

                            <Typography component="h1" variant="h5">
                                {formState === 0 ? "Welcome Back " : "Create Account"}
                            </Typography>

                            {/* Toggle Buttons */}
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    variant={formState === 0 ? "contained" : "outlined"}
                                    onClick={() => setFormState(0)}
                                    sx={{ mr: 1 }}
                                >
                                    Sign In
                                </Button>
                                <Button
                                    variant={formState === 1 ? "contained" : "outlined"}
                                    onClick={() => setFormState(1)}
                                >
                                    Sign Up
                                </Button>
                            </Box>

                            {/* Form */}
                            <Box sx={{ mt: 3, width: "100%" }}>
                                {formState === 1 && (
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        margin="normal"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                )}

                                <TextField
                                    fullWidth
                                    label="Username"
                                    margin="normal"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />

                                <TextField
                                    fullWidth
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    margin="normal"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />

                                {error && (
                                    <Typography color="error" sx={{ mt: 1 }}>
                                        {error}
                                    </Typography>
                                )}

                                <Button
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, height: 45 }}
                                    onClick={handleAuth}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : formState === 0 ? (
                                        "Login"
                                    ) : (
                                        "Register"
                                    )}
                                </Button>
                            </Box>
                        </Box>
                    </Fade>
                </Grid>
            </Grid>

            {/* Snackbar */}
            <Snackbar
                open={open}
                autoHideDuration={4000}
                onClose={() => setOpen(false)}
            >
                <Alert severity="success" variant="filled">
                    {message}
                </Alert>
            </Snackbar>
        </ThemeProvider>
    );
}
