"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { TextField, Button, Typography, Box, IconButton, InputAdornment, Paper, Link } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export default function LoginPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "#e6f0ea", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Paper elevation={3} sx={{ p: 6, width: 450, height: 500, display: "flex", flexDirection: "column", alignItems: "center" }}>
                <Typography variant="h4" mb={2}>Login</Typography>
                <Typography mb={2}>
                    Não tem uma conta?{" "}
                    <Link href="/register" sx={{ color: "#99BC85", fontWeight: 500, textDecoration: "none" }}>REGISTRE</Link>
                </Typography>
                <TextField
                    label="Email"
                    placeholder="ex: emillyefanny@user.com"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Senha"
                    placeholder="ex: 12334669023cmsjz"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    slotProps={{
                        input: {
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
                        },
                    }}
                />
                <Button
                    variant="contained"
                    sx={{
                        mt: 3,
                        bgcolor: "#99BC85",
                        color: "#fff",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "#7fa36b" },
                        width: 120,
                        alignSelf: "center",
                        fontWeight: 600,
                        letterSpacing: 1
                    }}
                >
                    LOGIN
                </Button>
            </Paper>
        </Box>
    );
}