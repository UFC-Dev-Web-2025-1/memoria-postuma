"use client";
import { Box, Container, Grid } from "@mui/material";
import Navbar from "../components/Navbar";
import CardProfile from "../components/CardProfile";
import { ReactNode } from "react";

interface GridCustomProps {
  children: ReactNode,
  size?: number
}

const GridCustom: React.FC<GridCustomProps> = ({ children, size = 3 }) => {
  return (
    <Grid size={size} sx={{
      display: 'flex',
      justifyContent: 'center'
    }}>
      {children}
    </Grid>
  )
}

export default function Explore() {
  return (
    <Box bgcolor='#FDFAF6' sx={{paddingTop: 7}}>
      <Navbar />

      <Container maxWidth="lg"
        sx={{
          padding: '3rem',
          justifyContent: 'center',
        }}
      >

        <Grid container rowSpacing={4} columnSpacing={{ xs: 2, sm: 2, md: 6 }}>
          <GridCustom size={3}>
            <CardProfile />
          </GridCustom>
          
          <GridCustom size={3}>
            <CardProfile />
          </GridCustom>
          
          <GridCustom size={3}>
            <CardProfile />
          </GridCustom>

          <GridCustom size={3}>
            <CardProfile />
          </GridCustom>

          <GridCustom size={3}>
            <CardProfile />
          </GridCustom>
        </Grid>

      </Container>

    </Box>
  )
}