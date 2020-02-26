import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import MaterialUIPickers from "./Picker";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from "axios";

// Styling components
// ***********************
const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3)
  },
  typo: {
    marginTop: theme.spacing(3)
  }
}));

// Page that creates goals based on user input
// *******************************************
export default function CreateGoals(props) {
  const classes = useStyles();

  const [goal, setGoal] = React.useState("");
  const [nag, setNag] = React.useState("");
  const [enddate, setEnddate] = React.useState("");
  const [phone1, setPhone1] = React.useState("");
  const [phone2, setPhone2] = React.useState("");

  const startdate = new Date();

  const newGoal = {
    goal: goal,
    startdate: startdate,
    enddate: enddate,
    phone1: phone1,
    phone2: phone2,
    nag: nag
  };

  let history = useHistory();
  const submitMe = e => {
    e.preventDefault();
    axios
      .put("http://localhost:8001/api/goals/new", newGoal, {
        withCredentials: true
      })
      .then(res => {
        console.log(res);
      });
    history.push("/goals");
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.form}>
            Create Goals
          </Typography>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={submitMe}
          >
            <TextField
              id="outlined-basic"
              label="Goal Title"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={e => setGoal(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Nag Title"
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={e => setNag(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="First Friend Phone: "
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={e => setPhone1(e.target.value)}
            />
            <TextField
              id="outlined-basic"
              label="Second Friend Phone: "
              variant="outlined"
              fullWidth
              margin="normal"
              onChange={e => setPhone2(e.target.value)}
            />
            <h2>Completion Date</h2>
            <MaterialUIPickers
              updateDate={selectedDate => {
                setEnddate(selectedDate);
              }}
            />
            <Button
              className={classes.submit}
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
