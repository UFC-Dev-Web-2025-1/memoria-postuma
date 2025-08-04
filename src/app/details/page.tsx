"use client";
import { Avatar, Box, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import {Navbar} from "../components/Navbar";
import FlareIcon from '@mui/icons-material/Flare';
import ChurchIcon from '@mui/icons-material/Church';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ShareIcon from '@mui/icons-material/Share';
import {DetailsTab} from "../components/DetailsTab";
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
    <Box sx={{
      display: 'flex',
      gap: '0.5rem',
      alignItems: 'center'
    }}>
      {
        (type === 'birth') ?
          <FlareIcon color="info" />
          :
          <ChurchIcon color="info" />
      }
      <Typography variant='body1'>
        {date}
      </Typography>
    </Box>
  )
}

export default function ExploreDetails() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')

  const [memorial, setMemorial] = useState<Memorial>()
  let imagensPublicadas: string[] = []

  async function getMemorial() {
    try {
      const res = await axios.get(`${API_URL}/api/memorials/${id}?populate=*`)
      const data: Memorial = res.data.data

      setMemorial(data)
      // console.log(memorial)

      // puxando as imagens publicadas
      if (data != undefined) {
        data.fotos_memorial.map((foto: any) => {
          imagensPublicadas.push(getImagemMemorial(foto))
        })
      }

    } catch (err) {
      console.error('Erro ao buscar memorial pelo id:', err)
    }
  }

  const getImagemMemorial = (diretorioImagem: any) => {
    return `${API_URL}${diretorioImagem?.formats?.thumbnail?.url}`
  }

  useEffect(() => {
    getMemorial()
  }, [])

  return (
    <Box bgcolor='#FDFAF6' sx={{paddingTop: 7}}>
      <Navbar paginaAtual="Explorar memorial"/>

      <Container maxWidth="lg"
        sx={{
          justifyContent: 'center',
          // backgroundColor: 'red',
          minHeight: '100vh',
          maxHeight: '100%'
        }}
      >
        <Box sx={{
          display: 'flex',
          paddingBottom: 2,
          flexDirection: 'column'
        }}>
          <Box>
            <img src={getImagemMemorial(memorial?.foto_capa)} width={'100%'} height={300} />
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            paddingY: 2,
            justifyContent: 'center',
            gap: 5
          }}>
            <Avatar
              alt="Foto do memorial"
              src={getImagemMemorial(memorial?.foto_perfil)}
              sx={{ width: 200, height: 200 }}
            />

            <Box sx={{
              flex: 0.7,
              display: 'flex',
              flexDirection: 'column',
              // backgroundColor: 'grey'
            }}>
              <Typography variant="body1">
                Em memória de
              </Typography>

              <Typography variant="h6" fontWeight={'bold'} >
                {memorial?.nome}
              </Typography>

              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginTop: 1
              }}>
                <DateLifeInfo type="birth" date={formatacaoDataPorExtensa(memorial?.data_nascimento)} />
                <DateLifeInfo type="death" date={formatacaoDataPorExtensa(memorial?.data_falecimento)} />
              </Box>

            </Box>

            <Box sx={{
              display: 'flex',
              gap: 3,
            }}>
              <IconButton size="medium" color="inherit">
                <FavoriteBorderIcon />
              </IconButton>

              <IconButton size="medium" color="inherit">
                <TurnedInNotIcon />
              </IconButton>

              <IconButton size="medium" color="inherit">
                <ShareIcon />
              </IconButton>

            </Box>

          </Box>
        </Box>

        <Box>
          <DetailsTab historia={memorial?.historia} fotos_memorial={imagensPublicadas} id={(id === null)?'id nao alocado':id} />
        </Box>
      </Container>

    </Box>
  )
}

const itemData =
{
  img: 'https://mundonegro.inf.br/wp-content/uploads/2021/07/Dia-Mundial-dos-Avos.jpg',
  title: 'Breakfast',
};
