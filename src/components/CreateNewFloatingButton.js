import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

//function that creates a floating button
// **************************************

export default function FloatingActionButton() {
  const classes = useStyles();

  return (
    <div>
      <Fab color="secondary" aria-label="add" className={classes.fab}component={Link} to="/goals/new">
        <AddIcon />
      </Fab>
    </div>
  );
}