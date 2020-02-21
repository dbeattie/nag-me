import React, { useState, useContext } from 'react';
import clsx from 'clsx';
import { Link } from "react-router-dom";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiEvents from '@material-ui/icons/EmojiEvents';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import Loop from '@material-ui/icons/Loop';
import Person from '@material-ui/icons/Person';
import PersonAdd from '@material-ui/icons/PersonAdd';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AuthContext from '../helpers/AuthContext';

import axios from "axios";

const drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  },
}));

// const checkAuth = () => {
//   return axios.get('http://localhost:8001/api/auth', { withCredentials: true })
//     .then((response) => {
//       if (response.data.result === "true") {
//         return true
//       } else return false
//     });
// };

// Simplify the logic of the return here??
// const NavDrawerStructure = 

export default function NavBar(props) {
  
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const {auth, setAuth} = useContext(AuthContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logoutCloseDrawer= () => {
    logout()
    handleDrawerClose()
  }

  const logout = () => {
        axios.post('http://localhost:8001/api/logout', null, { withCredentials: true })
          .then((response) => {
            // console.log(response);
            setAuth(false);
          })
      } 
  if (!auth) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Nag.me<Loop />
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar /> 
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem component= {Link} to="/login" onClick={handleDrawerClose}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="Login"/>
            </ListItem>
            <ListItem component= {Link} to="/register" onClick={handleDrawerClose}>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="Register"/>
            </ListItem>
            {/* TRY TO SIMPLIFY THE LOGIC WITH A MAP LIKE THIS: {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>{index % 2 === 0 ? <ExitToApp /> : <PersonAdd />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))} */}
          </List>
        </Drawer>
      </div>
    );
  } else {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <Typography variant="h6" noWrap className={classes.title}>
              Nag.me<Loop />
            </Typography>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              className={clsx(open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Toolbar /> 
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="right"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem component= {Link} to="/goals" onClick={handleDrawerClose}>
              <ListItemIcon>
                <EmojiEvents />
              </ListItemIcon>
              <ListItemText primary="Goals"/>
            </ListItem>
            <ListItem component= {Link} to="/nags" onClick={handleDrawerClose}>
              <ListItemIcon>
                <LibraryAddCheckIcon />
              </ListItemIcon>
              <ListItemText primary="Nags"/>
            </ListItem>
            <ListItem onClick={logoutCloseDrawer}>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText primary="Logout"/>
            </ListItem>
          </List>
        </Drawer>
      </div>
    );
  };
};