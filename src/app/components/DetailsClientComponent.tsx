'use client';
import { Avatar, Box, Container, IconButton, Typography } from "@mui/material";
import { Navbar } from "./Navbar";
import FlareIcon from '@mui/icons-material/Flare';
import ChurchIcon from '@mui/icons-material/Church';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ShareIcon from '@mui/icons-material/Share';
import { DetailsTab } from "./DetailsTab";
import { API_URL, formatacaoDataPorExtensa } from "@/utils/texts";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface DateLifeInfoProps {
  type: string,
  date: string | undefined,
  size?: number
}

const DateLifeInfo: React.FC<DateLifeInfoProps> = ({ type, date, size }) => {
  return (
    <Box sx={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
      {type === 'birth' ? <FlareIcon color="info" /> : <ChurchIcon color="info" />}
      <Typography variant='body1'>{date}</Typography>
    </Box>
  )
}

export default function DetailsClientComponent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  const [memorial, setMemorial] = useState<Memorial | null>(null);
  const [imagensPublicadas, setImagensPublicadas] = useState<string[]>([]);

  const getImagemMemorial = (img: any) =>
    `${API_URL}${img?.formats?.thumbnail?.url || ''}`;

  useEffect(() => {
    if (!id) return;

    axios.get(`${API_URL}/api/memorials/${id}?populate=*`)
      .then(res => {
        const data: Memorial = res.data.data;
        setMemorial(data);

        const imagens = data.fotos_memorial.map((foto: any) => getImagemMemorial(foto));
        setImagensPublicadas(imagens);
      })
      .catch(err => {
        console.error("Erro ao buscar memorial:", err);
      });
  }, [id]);

  return (
    <Box bgcolor='#FDFAF6' sx={{ paddingTop: 7 }}>
      <Navbar paginaAtual="Explorar memorial" />
      <Container maxWidth="lg" sx={{ justifyContent: 'center', minHeight: '100vh' }}>
        <Box sx={{ display: 'flex', paddingBottom: 2, flexDirection: 'column' }}>
          <Box>
            <img src={getImagemMemorial(memorial?.foto_capa)} width={'100%'} height={300} />
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%', paddingY: 2, justifyContent: 'center', gap: 5 }}>
            <Avatar
              alt="Foto do memorial"
              src={getImagemMemorial(memorial?.foto_perfil)}
              sx={{ width: 200, height: 200 }}
            />

            <Box sx={{ flex: 0.7, display: 'flex', flexDirection: 'column' }}>
              <Typography variant="body1">Em memória de</Typography>
              <Typography variant="h6" fontWeight={'bold'}>{memorial?.nome}</Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, marginTop: 1 }}>
                <DateLifeInfo type="birth" date={formatacaoDataPorExtensa(memorial?.data_nascimento)} />
                <DateLifeInfo type="death" date={formatacaoDataPorExtensa(memorial?.data_falecimento)} />
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 3 }}>
              <IconButton><FavoriteBorderIcon /></IconButton>
              <IconButton><TurnedInNotIcon /></IconButton>
              <IconButton><ShareIcon /></IconButton>
            </Box>
          </Box>
        </Box>

        <Box>
          <DetailsTab
            historia={memorial?.historia}
            fotos_memorial={imagensPublicadas}
            id={id ?? 'id nao alocado'}
          />
        </Box>
      </Container>
    </Box>
  );
}
