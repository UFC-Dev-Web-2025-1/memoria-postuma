"use client";
import { Avatar, Box, Container, IconButton, Tab, Tabs, Typography } from "@mui/material";
import {Navbar} from "../components/Navbar";
import FlareIcon from '@mui/icons-material/Flare';
import ChurchIcon from '@mui/icons-material/Church';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import TurnedInNotIcon from '@mui/icons-material/TurnedInNot';
import ShareIcon from '@mui/icons-material/Share';
import DetailsTab from "../components/DetailsTab";

interface DateLifeInfoProps {
  type: string,
  date: string,
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
            <img src={itemData.img} width={'100%'} height={300} />
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
              alt="Remy Sharp"
              src="https://conteudo.imguol.com.br/c/entretenimento/1e/2021/01/29/idoso-negro-1611935501059_v2_450x450.jpg"
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
                João Rocha de Almeida
              </Typography>

              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                marginTop: 1
              }}>
                <DateLifeInfo type="birth" date="12 de Fevereiro de 1987" />
                <DateLifeInfo type="death" date="28 de Novembro de 2014" />
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
          <DetailsTab />
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
