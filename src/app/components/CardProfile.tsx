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
import Link from 'next/link';

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
          <FlareIcon color='info' />
          :
          <ChurchIcon color='info' />
      }
      <Typography variant='body2'>
        {date}
      </Typography>
    </Box>
  )
}

interface CardProfileProps {
  nome: string,
  descricao: string,
  nascimento: string,
  falecimento: string,
  imagemMemorial: any
}

export const CardProfile: React.FC<CardProfileProps> = ({ nome, descricao, nascimento, falecimento, imagemMemorial }) => {

  function limitarPalavras(text: string, wordLimit: number): string {
    const words = text.split(' ')
    if (words.length <= wordLimit) return text
    return words.slice(0, wordLimit).join(' ') + '...'
  }

  function formatacaoData(dateString: string): string {
    const date = new Date(dateString)
    const day = String(date.getDate()).padStart(2, '0')
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  React.useEffect(() => {
    console.log(imagemMemorial)
  }, [])
  
  return (
    <Card sx={{
      maxWidth: 'auto', minWidth: 260, display: 'flex', flexDirection: 'column'
    }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'row',
          // backgroundColor: 'green',
          paddingBottom: 0
        }}
      >
        <CardMedia
          component="img"
          // image={imagemMemorial.formats.thumbnail.url}
          alt="Avatar icon"
          sx={{
            display: 'flex',
            width: 210,
            height: 210,
            borderRadius: 50,
            marginInlineEnd: 1
          }}
        />
        <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center', flexDirection: 'column', justifyContent: 'center', gap: 1 }}>
          <Typography variant="h6" sx={{ color: 'black' }}>
            {nome}
          </Typography>

          <Typography variant="subtitle2" sx={{ color: 'text.secondary', maxWidth: 170 }}>
            {limitarPalavras(descricao, 10)}
          </Typography>

          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2
          }}>
            <DateLifeInfo type='birth' date={formatacaoData(nascimento)} />
            <DateLifeInfo type='death' date={formatacaoData(falecimento)} />
          </Box>
        </Box>
      </CardContent>

      <CardActions disableSpacing sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', paddingTop: 1 }}>

        <Link href="/explore/details">
          <Button variant='text' color='primary' sx={{ fontWeight: '600' }} >Ver mais</Button>
        </Link>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}
