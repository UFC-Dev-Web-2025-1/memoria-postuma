import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import CardProfile from "../components/CardProfile";

export default function Explore() {
  return (
    <Box bgcolor='#FDFAF6'>
      <Navbar />

      <Container maxWidth="xl"
        sx={{
          padding: '3rem',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '4rem',
        }}
      >
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />
        <CardProfile />

      </Container>

    </Box>
  )
}