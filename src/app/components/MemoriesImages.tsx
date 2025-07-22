import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/FavoriteBorder';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${
      height * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}

export default function MemoriesImages() {
  return (
    <ImageList
      sx={{
        width: 700,
        // height: 650,
        // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
        transform: 'translateZ(0)',
      }}
      rowHeight={300}
      gap={1}
    >
      {itemData.map((item) => {
        const cols = item.featured ? 2 : 1;
        const rows = item.featured ? 2 : 1;

        return (
          <ImageListItem key={Math.random()} cols={cols} rows={rows}>
            <img
              {...srcset(item.img, 250, 200, rows, cols)}
              
              loading="lazy"
            />
            <ImageListItemBar
              sx={{
                background:
                  'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                  'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
              }}
              position="top"
              actionIcon={
                <IconButton
                  sx={{ color: 'white' }}
                >
                  <StarBorderIcon />
                </IconButton>
              }
              actionPosition="left"
            />
          </ImageListItem>
        );
      })}
    </ImageList>
  );
}

const itemData = [
  {
    img: 'https://st4.depositphotos.com/1037987/23174/i/450/depositphotos_231742138-stock-photo-senior-black-man-sitting-grass.jpg',
    title: 'Família reunida com avô sorridente',
    author: '@nappy',
    featured: true
  }
  ,{
    img: 'https://conteudo.imguol.com.br/c/entretenimento/1e/2021/01/29/idoso-negro-1611935501059_v2_615x300.jpg',
    title: 'Família reunida com avô sorridente',
    author: '@nappy',
  },
  {
    img: 'https://static5.depositphotos.com/1037987/476/i/450/depositphotos_4763841-stock-photo-grandparents-laughing-with-grandchildren.jpg',
    title: 'Avô abraçando neta no parque',
    author: '@nappy'
  },
  {
    img: 'https://img.freepik.com/fotos-gratis/um-casal-a-celebrar-o-natal-juntos_23-2150982293.jpg',
    title: 'Homem idoso sorrindo com netos',
    author: '@nappy',
  },
  {
    img: 'https://st.depositphotos.com/1010710/2197/i/450/depositphotos_21978065-stock-photo-happy-mature-couple-in-car.jpg',
    title: 'Família rindo na sala de estar',
    author: '@nappy'
  },
  {
    img: 'https://static5.depositphotos.com/1037987/476/i/450/depositphotos_4763841-stock-photo-grandparents-laughing-with-grandchildren.jpg',
    title: 'Senhor de idade com netos no sofá',
    author: '@nappy'
  },
  {
    img: 'https://img.freepik.com/fotos-gratis/adolescentes-diversos-praticando-atividades-de-saude-e-bem-estar-para-si-mesmos-e-para-a-sua-comunidade_23-2151416205.jpg',
    title: 'Avô e neta pintando juntos',
    author: '@nappy',
  }
];
