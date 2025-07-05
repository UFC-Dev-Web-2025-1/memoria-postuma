import { AppBar, Badge, Box, Button, IconButton, Link, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ bgcolor: '#E4EFE7' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography color="black" variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Explorar
          </Typography>

          <Box sx={{ gap: '0.8rem', marginInlineEnd: 2, display: 'flex' }}>
            <Link href="/register">
              <Button size="medium" variant="contained" color="primary" sx={{ color: 'white', fontWeight: '600' }}>Registrar</Button>
            </Link>
            <Link href="/login">
              <Button size="medium" variant="contained" sx={{ color: 'white', fontWeight: '600' }} color="primary">Entrar</Button>
            </Link>
          </Box>

          <Box sx={{ display: 'flex' }}>
            <MenuItem sx={{ padding: 1 }}>
              <IconButton
                size="small"
              >
                <Badge badgeContent={0} color="error">
                  <NotificationsIcon sx={{ color: 'black' }}/>
                </Badge>
              </IconButton>
            </MenuItem>

            <MenuItem sx={{ padding: 1 }}>
              <IconButton
                size="small"
              >
                <Badge badgeContent={0} color="error">
                  <SearchIcon sx={{ color: 'black' }}/>
                </Badge>
              </IconButton>
            </MenuItem>
          </Box>

        </Toolbar>
      </AppBar>
    </Box>
  )
}