"use client";
import { Box, Container, Grid, Typography } from "@mui/material";
import Navbar from "../components/Navbar";
import { ReactNode } from "react";
import { CardProfile } from "../components/CardProfile";
import { useRouter } from "next/navigation";

export default function TelaInicial() {
  return (
    <Box bgcolor='#FDFAF6' sx={{paddingTop: 12, minHeight: '100vh', maxHeight: '100%'}}>
      <Navbar title ="Recordare - Preservação de Memórias Póstumas"/>

      <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', gap: 1 }}>
        <Typography variant="h4">
        Transforme Lembranças em Homenagens
        </Typography>

        <Typography variant="body1">
          Mantenha as histórias de entes queridos, acessível a qualquer momento de qualquer lugar.
        </Typography>
      </Container>

      

    </Box>
  )
}