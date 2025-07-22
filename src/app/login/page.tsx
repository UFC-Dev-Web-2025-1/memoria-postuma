"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { 
    TextField, 
    Button, 
    Typography, 
    Box, 
    IconButton, 
    InputAdornment, 
    Paper, 
    Link,
    Divider,
    Alert,
    CircularProgress
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authStyles } from "../../styles/auth.styles";
import { authService } from "../../utils/auth";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginLoading, setLoginLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleGoogleLogin = async () => {
        setGoogleLoading(true);
        setAlert(null);
        
        try {
            const result = await authService.loginWithGoogle();
            if (result.success && result.user) {
                login(result.user);
                setAlert({ type: 'success', message: result.message });
                router.push('/home');
            } else {
                setAlert({ type: 'error', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Erro ao entrar com Google' });
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleLogin = async () => {
        setLoginLoading(true);
        setAlert(null);
        
        try {
            const result = await authService.login(email, password);
            if (result.success && result.user) {
                login(result.user);
                setAlert({ type: 'success', message: result.message });
                router.push('/home');
                setEmail("");
                setPassword("");
                setAlert({ type: 'success', message: result.message });
            } else {
                setAlert({ type: 'error', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Erro ao fazer login' });
        } finally {
            setLoginLoading(false);
        }
    };

    return (
        <Box sx={authStyles.container}>
            <Paper elevation={3} sx={{ ...authStyles.paper, height: alert ? 600 : 550 }}>
                <Typography variant="h4" sx={authStyles.title}>
                    Entrar
                </Typography>
                <Typography sx={authStyles.subtitle}>
                    Não tem uma conta?{" "}
                    <Link href="/" sx={authStyles.link}>
                        REGISTRE-SE
                    </Link>
                </Typography>

                {alert && (
                    <Alert 
                        severity={alert.type} 
                        sx={{ width: '100%', mb: 2 }}
                        onClose={() => setAlert(null)}
                    >
                        {alert.message}
                    </Alert>
                )}
                
                <TextField
                    label="e-mail"
                    placeholder="ex: emillyefanny@user.com"
                    fullWidth
                    margin="normal"
                    sx={authStyles.textField}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loginLoading || googleLoading}
                />
                
                <TextField
                    label="senha"
                    placeholder="ex: 12334669023cmsjz"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    sx={authStyles.textField}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loginLoading || googleLoading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        disabled={loginLoading || googleLoading}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                />
                
                <Button
                    variant="contained"
                    sx={authStyles.primaryButton}
                    onClick={handleLogin}
                    disabled={loginLoading || googleLoading || !email || !password}
                    startIcon={loginLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {loginLoading ? 'ENTRANDO...' : 'ENTRAR'}
                </Button>

                <Divider sx={authStyles.divider}>ou</Divider>

                <Button
                    variant="outlined"
                    sx={authStyles.googleButton}
                    onClick={handleGoogleLogin}
                    disabled={loginLoading || googleLoading}
                    startIcon={
                        googleLoading ? <CircularProgress size={20} color="inherit" /> : (
                            <Box
                                component="img"
                                src="https://developers.google.com/identity/images/g-logo.png"
                                alt="Google"
                                sx={authStyles.googleIcon}
                            />
                        )
                    }
                >
                    {googleLoading ? 'ENTRANDO...' : 'ENTRAR COM GOOGLE'}
                </Button>
            </Paper>
        </Box>
    );
}