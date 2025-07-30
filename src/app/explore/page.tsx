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

const dadosFake = [
  {
    id: 1,
    nome: "João Rocha",
    descricao: "Um contador de histórias, exemplo de sabedoria e afeto.",
    nascimento: "03/01/1943",
    falecimento: "21/06/2020",
    imagemMemorial: "https://conteudo.imguol.com.br/c/entretenimento/1e/2021/01/29/idoso-negro-1611935501059_v2_450x450.jpg"
  },
  {
    id: 2,
    nome: "Joana Furtado",
    descricao: "Espalhou amor por onde passou, com leveza e generosidade.",
    nascimento: "12/04/1956",
    falecimento: "08/09/2022",
    imagemMemorial: "https://img.freepik.com/fotos-premium/retrato-de-sorrindo-mulher-velha_1048944-15395438.jpg?ga=GA1.1.1870156352.1740323016&semt=ais_hybrid&w=740"
  },
  {
    id: 3,
    nome: "Pedro Aurélio",
    descricao: "Homem simples, coração imenso, memória eterna.",
    nascimento: "30/03/1996",
    falecimento: "19/07/2021",
    imagemMemorial: "https://img.freepik.com/fotos-gratis/jovem-posando-com-camera-no-campo_23-2149333929.jpg"
  },
  {
    id: 4,
    nome: "Helena Dias",
    descricao: "Pintava a vida com cores vivas e esperança.",
    nascimento: "05/09/1990",
    falecimento: "27/01/2023",
    imagemMemorial: "https://images.unsplash.com/photo-1607746882042-944635dfe10e"
  },
  {
    id: 5,
    nome: "Ricardo Souza",
    descricao: "Alegrava qualquer ambiente com seu bom humor e otimismo.",
    nascimento: "22/11/1964",
    falecimento: "13/05/2020",
    imagemMemorial: "https://img.freepik.com/fotos-premium/um-homem-sorridente-desfrutando-ao-ar-livre-no-verao_100800-4988.jpg"
  }
];
