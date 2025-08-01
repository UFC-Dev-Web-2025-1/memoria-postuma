import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FlareIcon from '@mui/icons-material/Flare';
import ChurchIcon from '@mui/icons-material/Church';
import { Box, Button } from '@mui/material';
import { API_URL, limitarPalavras } from '@/utils/texts';

interface DateLifeInfoProps {
  type: string,
  date: string
}

const DateLifeInfo: React.FC<DateLifeInfoProps> = ({ type, date }) => {
  return (
    <Box sx={{
      display: 'flex',
      gap: '0.3rem',
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      {
        (type === 'birth') ?
          <FlareIcon sx={{ color: '#99BC85' }} />
          :
          <ChurchIcon sx={{ color: '#99BC85' }} />
      }
      <Typography variant='body2'>
        {date}
      </Typography>
    </Box>
  )
}

interface CardMemorialHomeProps {
  fotoMemorial: any,
  mensagem: string,
  nome: string,
  documentId: string
}

export const CardMemorialHome: React.FC<CardMemorialHomeProps> = ({ fotoMemorial, mensagem, nome, documentId }) => {

  const [imagemPerfil, setImagemPerfil] = React.useState<string>('')

  React.useEffect(() => {
    setImagemPerfil(`${API_URL}${fotoMemorial?.formats?.thumbnail?.url}`)
  }, [])

  return (
    <Card sx={{
      maxWidth: 260, minWidth: 260, display: 'flex', flexDirection: 'column', height: 'auto',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center'
    }}>
      <CardHeader
        sx={{ alignSelf: 'start' }}
        title={nome}
      />
      <CardMedia
        component="img"
        // imagem de exemplo 
        image={imagemPerfil}
        alt="Avatar icon"
        sx={{
          display: 'flex',
          width: 230,
          height: 230,
          borderRadius: 50,
        }}
      />

      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
      }}>

        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          {limitarPalavras(mensagem, 8)}
        </Typography>

      </CardContent>

      <CardActions disableSpacing sx={{ maxWidth: 280, minWidth: 280, display: 'flex', justifyContent: 'start', paddingInline: 2 }}>
        <Button variant='text' color='primary' sx={{ fontWeight: '600' }} >Continuar lendo...</Button>
      </CardActions>

    </Card>
  );
}