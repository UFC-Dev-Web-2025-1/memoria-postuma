"use client"
import { AppBar, Avatar, Badge, Box, Button, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FavoriteIcon from '@mui/icons-material/Favorite';

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// icones do menu
import HomeIcon from '@mui/icons-material/Home';
import StyleIcon from '@mui/icons-material/Style';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import InputIcon from '@mui/icons-material/Input';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authService } from "@/utils/auth";
import { tempoDesde } from "@/utils/texts";

interface NavbarProps {
  // por enquanto manterei o controle da pagina atual apenas por uma prop de string
  paginaAtual: string
}

export const Navbar: React.FC<NavbarProps> = ({ paginaAtual }) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const [usuarioInfos, setUsuarioInfos] = React.useState<User>()
  const [logado, setLogado] = React.useState<boolean>()

  const handleExibir = (role: Role) => {
    if (Role.NAO_AUTENTICADO === role) {
      return true
    } else {
      if (logado) {
        return true
      } else {
        return false
      }
    }
  }

  React.useEffect(() => {
    if (authService.isAuthenticated()) {
      setLogado(true)
      if (localStorage.getItem('user') != null) {
        const userObj = localStorage.getItem('user')
        if (userObj) {
          setUsuarioInfos(JSON.parse(userObj) as User)
        }
      }
    } else {
      setLogado(false)
    }

  }, [])

  const DrawerList = (    
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List sx={{ display: (logado)?'':'none' }}>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Avatar
                alt={usuarioInfos?.username}
                // src="https://img.freepik.com/fotos-gratis/homem-sorridente-de-vista-frontal-na-camara-escura_23-2149893830.jpg"
                sx={{ width: 56, height: 56 }}
              />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding >
          <ListItemButton>
            <Typography variant="body1">
              { usuarioInfos?.username }
            </Typography>
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <Typography variant="body2">
              Cadastrado há {tempoDesde(usuarioInfos?.createdAt)}
            </Typography>
          </ListItemButton>
        </ListItem>

      </List>
      <Divider />
      <List>
        {itemsDoMenu.map((item) => (
          <ListItem key={item.nome} sx={{display: (handleExibir(item.role)?'flex':'none')}}  disablePadding>

            <Link href={item.rota}>
              <ListItemButton>
                <ListItemIcon>
                  {item.icone}
                </ListItemIcon>
                <ListItemText primary={item.nome} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}

        <ListItem sx={{ display: 'flex', justifyContent: 'flex-end' }}>

          <ListItemButton sx={{ display: (logado)?'flex':'none' }} onClick={async () => {
            authService.logout()
            router.push('/login')
          }}>
            <ListItemText primary={'Sair'} />
            <ListItemIcon sx={{ display: 'flex', justifyContent: 'flex-end' }}>
              <InputIcon />
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#3C68AE' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon sx={{ color: 'white' }} />
          </IconButton>
          <Typography color="white" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {paginaAtual}
          </Typography>

          <Box sx={{ display: (logado)?'flex':'none' }}>
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
                  alt={usuarioInfos?.username}
                  // src="https://img.freepik.com/fotos-gratis/homem-sorridente-de-vista-frontal-na-camara-escura_23-2149893830.jpg"
                  sx={{ width: 45, height: 45 }}
                />
              </IconButton>
            </MenuItem>
          </Box>

          <Box sx={{ display: (logado)?'none':'flex' }}>
            <MenuItem sx={{ padding: 1 }}>
            <Link href={'/register'}>
              <Button color="warning" sx={{color: '#3C68AE'}} variant="contained">Registrar-se</Button>
            </Link>
            </MenuItem>

            <MenuItem sx={{ padding: 1 }}>
              <Link href={'/login'}>
                <Button color="warning" variant="outlined">Entrar</Button>
              </Link>
            </MenuItem>

          </Box>

        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>

    </Box>
  )
}

interface item {
  nome: string,
  icone: React.JSX.Element,
  rota: string,
  role: Role
}

enum Role {
  NAO_AUTENTICADO,
  AUTENTICADO
}

const itemsDoMenu: item[] = [
  {
    nome: 'Início',
    icone: <HomeIcon />,
    rota: '/home',
    role: Role.NAO_AUTENTICADO
  },
  {
    nome: 'Explorar',
    icone: <StyleIcon />,
    rota: '/explore',
    role: Role.NAO_AUTENTICADO
  },
  {
    nome: 'Meus memoriais',
    icone: <DynamicFeedIcon />,
    rota: "/home",
    role: Role.AUTENTICADO
  },
  {
    nome: 'Memoriais favoritos',
    icone: <FavoriteIcon />,
    rota: "/home",
    role: Role.AUTENTICADO
  },
  {
    nome: 'Notificações',
    icone: <NotificationsIcon />,
    rota: "/home",
    role: Role.AUTENTICADO
  }
]
