import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import StarBorderIcon from '@mui/icons-material/FavoriteBorder';
import axios from 'axios';
import { API_URL } from '@/utils/texts';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${width * cols}&h=${height * rows
      }&fit=crop&auto=format&dpr=2 2x`,
  };
}

interface MemoriesImagesProps {
  fotos?: string[],
  id: string
}

export const MemoriesImages: React.FC<MemoriesImagesProps> = ({ fotos, id }) => {

  const [imagensPublicadas, setImagensPublicadas] = React.useState<string[]>([])

  async function getMemorialFotos() {
    try {
      const res = await axios.get(`${API_URL}/api/memorials/${id}?populate=*`)
      const data: Memorial = res.data.data


      // puxando as imagens publicadas
      if (data != undefined) {
        let array: string[] = []
        data.fotos_memorial.map((foto: any) => {
          array.push(getImagemMemorial(foto))
        })
        setImagensPublicadas(array)
      }

    } catch (err) {
      console.error('Erro ao buscar memorial pelo id:', err)
    }
  }

  const getImagemMemorial = (diretorioImagem: any) => {
    return `${API_URL}${diretorioImagem?.formats?.thumbnail?.url}`
  }

  React.useEffect(() => {
    getMemorialFotos()
  }, [id])

  return (
    <ImageList sx={{ width: 700, transform: 'translateZ(0)' }} rowHeight={300} gap={1}>
      {imagensPublicadas.map((item, index) => (
        <ImageListItem key={index} cols={2} rows={2}>
          <img {...srcset(item, 250, 200, 1, 2)} loading="lazy" />
          <ImageListItemBar
            sx={{
              background:
                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
            }}
            position="top"
            actionIcon={
              <IconButton sx={{ color: 'white' }}>
                <StarBorderIcon />
              </IconButton>
            }
            actionPosition="left"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}