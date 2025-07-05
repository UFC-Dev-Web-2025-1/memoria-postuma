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

export default function CardProfile() {

  return (
    <Card sx={{
      maxWidth: 260, minWidth: 260, display: 'flex', flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      textAlign: 'center'
    }}>
      <CardHeader
        sx={{ alignSelf: 'start' }}
        title="Pedro Aurelio"
      />
      <CardMedia
        component="img"
        // height="194"
        // imagem de exemplo 
        image="https://fastly.picsum.photos/id/242/500/500.jpg?hmac=_2EOQqUaWWLne0zEhD6IGOXKoJ5E3ng4imXmM2-0_6Q"
        alt="Avatar icon"
        sx={{
          display: 'flex',
          width: 230,
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
          Breve descrição...
        </Typography>

        <Box sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 2
        }}>
          <DateLifeInfo type='birth' date='10/02/1982' />
          <DateLifeInfo type='death' date='28/11/2019' />
        </Box>

      </CardContent>

      <CardActions disableSpacing sx={{ maxWidth: 280, minWidth: 280, display: 'flex', justifyContent: 'space-between' }}>

        <Button variant='text' color='primary' sx={{ fontWeight: '600' }} >Ver mais</Button>

        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

      </CardActions>

    </Card>
  );
}
