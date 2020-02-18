import React from 'react';
import { Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from "axios";


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function NavBar() {
  const classes = useStyles();
  // const [homePage, setHomePage] = useState(false);

  const logout = () => {
    axios.post('http://localhost:8001/api/logout', null, { withCredentials: true })
      .then((response) => {
        console.log(response);
        // setHomePage(true);
      })
  } 

  // return !homePage ? (
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Nag.me
          </Typography>
          <Button component= {Link} to="/goals" color="inherit">Goals</Button>
          <Button component= {Link} to="/nags" color="inherit">Nags</Button>
          <Button component= {Link} to="/login" color="inherit">Login</Button>
          {/* <Button component= {Link} to="/register" color="inherit">Register</Button> */}
          <Button onClick={logout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}