import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../authentication/firebase';
import Sign from '../authentication/Sign';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import './Menu.css';



const Menu = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    navigate('/');
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="menu">
      <IconButton
        className="menu-toggle"
        edge="start"
        color="inherit"
        aria-label="menu"
        onClick={toggleMenu}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="right"
        open={menuOpen}
        onClose={toggleMenu}
      >
        <div className="drawer-content">
          <List>
            {user ? (
              <>
                <ListItemButton component={Link} to="" onClick={toggleMenu}>
                  <ListItemText primary="Calculadora" disableTypography="false"/>
                </ListItemButton>
                <ListItemButton component={Link} to="/dashboard" onClick={toggleMenu}>
                  <ListItemText primary="Panel de Control" disableTypography="false"/>
                </ListItemButton>
                <ListItemButton className="sign-out-btn" onClick={handleLogout}>
                  <ListItemText primary="cerrar sesión" className="sign-out-text" disableTypography="false"/>
                </ListItemButton>
              </>
            ) : (
              <ListItem>
                <Sign />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default Menu;
