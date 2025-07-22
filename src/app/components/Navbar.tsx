import { AppBar, Avatar, Badge, Box, Button, IconButton, Link, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface NavbarProps {
<<<<<<< Updated upstream
  // por enquanto manterei o controle da pagina atual apenas por uma prop de string
  paginaAtual: string
}

export const Navbar:React.FC<NavbarProps> = ( { paginaAtual } ) => {
=======
  title: string;  // New prop to dynamically set the navbar title
}

export default function Navbar({ title }: NavbarProps) {
>>>>>>> Stashed changes
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#3C68AE' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography color="white" variant="h6" component="div" sx={{ flexGrow: 1 }}>
<<<<<<< Updated upstream
            {paginaAtual}
=======
           {title}
>>>>>>> Stashed changes
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <MenuItem sx={{ padding: 1 }}>
              <IconButton
                size="small"
              >
                <Badge badgeContent={0} color="error">
                  <FavoriteIcon sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </MenuItem>

            <MenuItem sx={{ padding: 1 }}>
              <IconButton
                size="small"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon sx={{ color: 'white' }} />
                </Badge>
              </IconButton>
            </MenuItem>

            <MenuItem sx={{ padding: 1 }}>
              <IconButton
                size="small"
              >
                <Avatar
                  alt="Foto de perfil"
                  src="https://img.freepik.com/fotos-gratis/homem-sorridente-de-vista-frontal-na-camara-escura_23-2149893830.jpg"
                  sx={{ width: 45, height: 45 }}
                />
              </IconButton>
            </MenuItem>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  )
}