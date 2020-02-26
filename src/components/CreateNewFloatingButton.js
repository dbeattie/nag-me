import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

export default function FloatingActionButton() {
  const classes = useStyles();

  return (
    <div>
      <Tooltip title="Add a Goal" placement="left-start">
        <Fab color="secondary" aria-label="add" className={classes.fab}component={Link} to="/goals/new">
          <AddIcon />
        </Fab>
      </Tooltip>
    </div>
  );
}