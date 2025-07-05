"use client";
import { Box, Container } from "@mui/material";
import Navbar from "../components/Navbar";

export default function ExploreDetails () {
  return (
    <Box bgcolor='#FDFAF6'>
      <Navbar />

      <Container maxWidth="lg"
        sx={{
          padding: '3rem',
          justifyContent: 'center',
          backgroundColor: 'red',
          minHeight: '100vh',
          maxHeight: '100%'
        }}
      >

      </Container>
      
    </Box>
  )
}