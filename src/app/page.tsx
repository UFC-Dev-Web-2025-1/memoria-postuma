"use client"
import styles from "./page.module.css";
import LoginPage from "./login/page";
import Explore from "./explore/page";
import theme from "./theme";
import Navbar from "./components/Navbar";
import { Container, Box, Typography, Button, Grid, Card, CardContent, Avatar, Link } from "@mui/material";
import Image from "next/image";
import tela1 from "@/assets/tela1.png";
import telaMobile from "@/assets/telaMobile.png";


const memoriais = [
  {
    nome: "João Rocha",
    descricao: "João Rocha foi um homem simples e generoso, conhecido...",
    foto: "/src/assets/imagem.png",
  },
  {
    nome: "Pedro Aurelio",
    descricao: "Homem de coração generoso e sorriso fácil. Amava a vida...",
    foto: "/images/pedro-aurelio.jpg",
  },
  {
    nome: "Maria Antonia",
    descricao: "Era aquela pessoa que fazia questão de ouvir, cuidar...",
    foto: "/images/maria-antonia.jpg",
  },
];

export default function Home() {
  return (
    <>
    <Navbar></Navbar>
      {/* Hero Section */}
      <Box
        sx={{
          position: "relative",
          height: { xs: 300, md: 420 },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundImage: `url(${tela1.src})`, 
        }}
      >
        {/* Overlay escura */}
        <Box sx={{ position: "absolute", inset: 0, bgcolor: "rgba(0,0,0,0.48)", zIndex: 1 }} />
        <Container maxWidth="md" sx={{ textAlign: "center", zIndex: 2, position: "relative" }}>
          <Typography variant="h3" sx={{ color: "white", fontWeight: 600 }}>
            GUARDE LEMBRANÇAS,<br />COMPARTILHE HISTÓRIAS
          </Typography>
          <Typography variant="body1" sx={{ color: "white", mt: 2 }}>
            Crie memoriais, explore homenagens de outras pessoas e mantenha vivas as lembranças de quem continua presente nos corações de quem fica.
          </Typography>
          <Button variant="contained" sx={{ mt: 4, bgcolor: "#6A8DFF" }}>
            + CRIAR UM MEMORIAL
          </Button>
        </Container>
      </Box>

      {/* Memorias Section */}
      <Container maxWidth="md" sx={{ my: 5, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          CELEBRE A HISTÓRIA DELES
        </Typography>
        <Typography variant="body1" gutterBottom>
          Nossos entes queridos merecem que sua história seja conhecida, para mostrar ao mundo quem eles eram, para deixar as memórias viverem para sempre. Explore as histórias das pessoas abaixo.
        </Typography>

        <Grid container spacing={3} justifyContent="center" sx={{ mt: 2 }}>
          {memoriais.map((memorial) => (
            <Grid item xs={12} sm={4} key={memorial.nome}>
              <Card sx={{ minHeight: 240 }}>
                <CardContent sx={{ textAlign: "center" }}>
                  <Avatar src={memorial.foto} sx={{ width: 60, height: 60, mx: "auto", mb: 1 }} />
                  <Typography variant="h6">{memorial.nome}</Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    {memorial.descricao}
                  </Typography>
                  <Button variant="outlined" size="small">CONTINUAR LENDO</Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Link href="/explore">
          <Button variant="outlined" sx={{ mt: 3 }}>EXPLORAR MEMORIAIS</Button>
        </Link>
      </Container>

      {/* Seção: Espaço para eternizar histórias */}
      <Box sx={{ bgcolor: "#F5F2EB", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} >
              <Box sx={{ bgcolor: "#191919", color: "white", p: 4, borderRadius: 2, mb: 2 }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  UM ESPAÇO PARA ETERNIZAR HISTÓRIAS E UNIR LEMBRANÇAS
                </Typography>
                <Typography variant="body1">
                  Acreditamos que toda vida merece ser lembrada e celebrada com carinho. Nosso projeto nasceu do desejo de oferecer um lugar seguro e acolhedor para guardar memórias, homenagens e histórias de quem deixou saudades.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ textAlign: "center" }}>
                <Image
                  src= {telaMobile.src}
                  alt="Memorial digital"
                  width={300}
                  height={600}
                  style={{ borderRadius: "40px", boxShadow: "0 4px 40px rgba(0,0,0,0.15)" }}
                />
              </Box>
            </Grid>
          </Grid>
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              O QUE É UM MEMORIAL DIGITAL?
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Um memorial digital é uma página online criada para homenagear alguém especial que partiu. Aqui, é possível reunir fotos, histórias, datas marcantes e mensagens de carinho em um único lugar.
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Cada memorial pode ser personalizado e compartilhado com familiares e amigos, tornando-se um espaço de lembrança que pode ser visitado a qualquer momento, de onde estiver. Assim, mantemos viva a memória de quem amamos, atravessando gerações.
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
}