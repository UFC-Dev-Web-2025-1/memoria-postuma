"use client"
import { Navbar } from "../components/Navbar";
import { Container, Box, Typography, Button, Grid, Card, CardContent, Avatar } from "@mui/material";
import tela1 from "@/assets/tela1.png";
import telaMobile from "@/assets/telaMobile.png";
import AddIcon from '@mui/icons-material/Add'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { CardMemorialHome } from "../components/CardMemorialHome";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

const memoriais = [
  {
    nome: "João Rocha",
    descricao: "João Rocha foi um homem simples e generoso...",
    foto: "https://conteudo.imguol.com.br/c/entretenimento/1e/2021/01/29/idoso-negro-1611935501059_v2_450x450.jpg",
  },
  {
    nome: "Pedro Aurelio",
    descricao: "Homem de coração generoso e sorriso fácil. Amava a vida...",
    foto: "https://botatende.com.br/wp-content/uploads/2023/10/Perf-2-1024x1024.webp",
  },
  {
    nome: "Maria Antonia",
    descricao: "Era aquela pessoa que fazia questão de ouvir, cuidar...",
    foto: "https://revitalizeweightloss.com/wp-content/uploads/2023/11/testimonial-slider_1.png",
  },
];

export default function Home() {

  const API_URL = 'http://localhost:1337'
  const [memorials, setMemorials] = useState<Memorial[]>([])

  async function getDisplayMemorials(): Promise<Memorial[]> {
    try {
      const res = await axios.get(`${API_URL}/api/memorials?pagination[limit]=3&populate=*`)
      const data = res.data

      // console.log(data.data[0].foto_capa.formats.thumbnail.url)
      return data.data as Memorial[]
    } catch (err) {
      console.error('Erro ao buscar memorials:', err)
      return []
    }
  }


  useEffect(() => {
    getDisplayMemorials().then(setMemorials)
  }, [])

  return (
    <Box bgcolor='#FDFAF6' >
      <Navbar paginaAtual={"Início - Bem-vindo"} />
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 420, md: 600 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${tela1.src})`,
        }}
      >
        {/* Overlay escura */}
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(31, 31, 31, 0.31)", zIndex: 1 }} />

        <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', textAlign: "center", zIndex: 2, position: "relative" }}>
          <Typography variant="h3" sx={{ color: "white" }}>
            GUARDE LEMBRANÇAS,<br />COMPARTILHE HISTÓRIAS
          </Typography>
          <Typography variant="body1" sx={{ color: "white", mt: 2 }}>
            Crie memoriais, explore homenagens de outras pessoas e mantenha vivas as lembranças de quem continua presente nos corações de quem fica.
          </Typography>
          <Link href="/createMemorial">
            <Button variant="contained" sx={{ mt: 6 }} color="secondary" startIcon={<AddIcon />}>
              Criar um memorial
            </Button>
          </Link>

        </Container>
      </Box>

      {/* Memorias Section */}
      <Container maxWidth="md" sx={{ my: 5, textAlign: "center", display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Typography variant="h4" sx={{ textTransform: 'uppercase' }}>
          Celebre a história deles
        </Typography>

        <Typography variant="body1">
          Nossos entes queridos merecem que sua história seja conhecida, para mostrar ao mundo quem eles eram, para deixar as memórias viverem para sempre. Explore as histórias das pessoas abaixo.
        </Typography>

        <Box sx={{
          display: 'flex',
          gap: 3,
          width: '100%'
        }}>
          {
            memorials.map((memorial) => (
              <CardMemorialHome key={memorial.id} nome={memorial.nome} fotoMemorial={memorial.foto_perfil} mensagem={memorial.historia} />
            ))
          }
        </Box>

        <Link href="/explore">
          <Button variant="outlined" sx={{ mt: 3 }} endIcon={<ArrowForwardIosIcon />}>Explorar memoriais</Button>
        </Link>
      </Container>

      {/* Seção: Espaço para eternizar histórias */}
      <Box width={'100%'}
        sx={{
          bgcolor: "black",
          display: 'flex',
          justifyContent: 'space-between'
        }}>

        <Box width={'80%'} sx={{ padding: 10, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box width={'60%'}>
            <Typography variant="h5">
              UM ESPAÇO PARA ETERNIZAR HISTÓRIAS E UNIR LEMBRANÇAS
            </Typography>
            <Typography variant="body1">
              Acreditamos que toda vida merece ser lembrada e celebrada com carinho. Nosso projeto nasceu do desejo de oferecer um lugar seguro e acolhedor para guardar memórias, homenagens e histórias de quem deixou saudades.
            </Typography>
          </Box>
        </Box>

        <Box>
          <img
            src={'https://sampi.net.br/dir-arquivo-imagem/2025/06/2adc1ffa9baefddaae6778dee44473aa.jpg'}
            alt=""
            height="100%"
            width="100%"
          />
        </Box>

      </Box>

      <Box width={'100%'}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          paddingY: 8
        }}>

        <Box width={'80%'} sx={{ padding: 10, color: 'black', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box width={'60%'}>
            <Typography variant="h5">
              O QUE É UM MEMORIAL DIGITAL?
            </Typography>
            <Typography variant="body1">
              Cada memorial pode ser personalizado e compartilhado com familiares e amigos, tornando-se um espaço de lembrança que pode ser visitado a qualquer momento, de onde estiver. Assim, mantemos viva a memória de quem amamos, atravessando gerações.
            </Typography>
          </Box>
        </Box>

        <Box sx={{
          display: 'flex',
          justifyContent: 'center'
        }}>
          <img
            src={telaMobile.src}
            alt=""
            width="40%"
          />
        </Box>

      </Box>
    </Box>
  );
}