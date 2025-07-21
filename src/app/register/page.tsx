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

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registerLoading, setRegisterLoading] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    const handleGoogleRegister = async () => {
        setGoogleLoading(true);
        setAlert(null);
        
        try {
            const result = await authService.loginWithGoogle();
            if (result.success) {
                setAlert({ type: 'success', message: result.message });
                router.push('/');
                
            } else {
                setAlert({ type: 'error', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Erro ao registrar com Google' });
        } finally {
            setGoogleLoading(false);
        }
    };

    const handleRegister = async () => {
        setRegisterLoading(true);
        setAlert(null);
        
        try {
            const result = await authService.register(email, password);
            if (result.success) {
                setAlert({ type: 'success', message: result.message });
                setEmail("");
                setPassword("");
                router.push('/login');
                
            } else {
                setAlert({ type: 'error', message: result.message });
            }
        } catch (error) {
            setAlert({ type: 'error', message: 'Erro ao registrar usuário' });
        } finally {
            setRegisterLoading(false);
        }
    };

    return (
        <Box sx={authStyles.container}>
            <Paper elevation={3} sx={{ ...authStyles.paper, height: alert ? 600 : 550 }}>
                <Typography variant="h4" sx={authStyles.title}>
                    Registre-se
                </Typography>
                <Typography sx={authStyles.subtitle}>
                    Já tem uma conta? {" "}
                    <Link href="/login" sx={authStyles.link}>
                        ENTRAR
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
                    disabled={registerLoading || googleLoading}
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
                    disabled={registerLoading || googleLoading}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={() => setShowPassword(!showPassword)}
                                        edge="end"
                                        disabled={registerLoading || googleLoading}
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
                    onClick={handleRegister}
                    disabled={registerLoading || googleLoading || !email || !password}
                    startIcon={registerLoading ? <CircularProgress size={20} color="inherit" /> : null}
                >
                    {registerLoading ? 'REGISTRANDO...' : 'REGISTRAR'}
                </Button>

                <Divider sx={authStyles.divider}>ou</Divider>

                <Button
                    variant="outlined"
                    sx={authStyles.googleButton}
                    onClick={handleGoogleRegister}
                    disabled={registerLoading || googleLoading}
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
                    {googleLoading ? 'REGISTRANDO...' : 'ENTRAR COM GOOGLE'}
                </Button>
            </Paper>
        </Box>
    );
}