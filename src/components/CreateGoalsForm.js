import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: 200
    }
  }
}));

export default function CreateGoals() {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <h2>Create Goals</h2>
        <TextField id="outlined-basic" label="Goal Title" variant="outlined" />
        <TextField id="outlined-basic" label="Nag Title" variant="outlined" />
        <h2>Frequency</h2>
        {/* insert multiple small icons with days of the week for nags.  Use node-con to hook up */}
        <h2>Completion Date</h2>
        {/* Insert Calendar function for date picker - might need to create a new component */}
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </form>
     <h3>Date Picker</h3>
    </div>
  );
}
