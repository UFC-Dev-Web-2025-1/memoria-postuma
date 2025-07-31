"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { Navbar } from "../components/Navbar";
import { ReactNode, useEffect, useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import { CardProfile } from "../components/CardProfile";
import Link from "next/link";
import axios from "axios";

export default function Explore() {

  const API_URL = 'http://localhost:1337'
  const [memorials, setMemorials] = useState<Memorial[]>([])

  async function getMemorials(): Promise<Memorial[]> {
    try {
      const res = await axios.get(`${API_URL}/api/memorials?populate=*`)
      const data = res.data

      // console.log(data.data[0].foto_capa.formats.thumbnail.url)
      return data.data as Memorial[]
    } catch (err) {
      console.error('Erro ao buscar memorials:', err)
      return []
    }
  }


  useEffect(() => {
    getMemorials().then(setMemorials)
  }, [])


  return (
    <Box bgcolor='#FDFAF6' sx={{paddingTop: 12, minHeight: '100vh', maxHeight: '100%'}}>
      <Navbar paginaAtual="Explorar"/>

      <Container maxWidth='md' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', textAlign: 'center', gap: 1 }}>
        <Typography variant="h4">
          Explore os memoriais
        </Typography>

        <Typography variant="body1">
          Navegue por histórias, memórias e tributos dedicados àqueles que deixaram saudades.
          Mantenha viva a lembrança de quem marcou vidas.
        </Typography>

        <Link href="/createMemorial">
          <Button variant="contained" color="secondary" sx={{ color: 'white', marginTop: 2 }} startIcon={<AddIcon />}>Criar memorial</Button>
        </Link>
      </Container>

      <Container maxWidth="xl"
        sx={{
          padding: '3rem',
          display: 'flex',
          justifyContent: 'space-evenly',
          flexWrap: 'wrap',
          rowGap: 3,
          // backgroundColor: 'blue',
        }}
      >

      {
        memorials.map((item) => (
          <div key={item.id}>
            <CardProfile 
              nome={item.nome}
              descricao={item.historia}
              nascimento={item.data_nascimento}
              falecimento={item.data_falecimento}
              imagemMemorial={item.foto_perfil}
            />
          </div>
        ))
      }

      </Container>

    </Box>
  )
}