import React, { useEffect, useContext } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialUIPickers from './Picker';
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import CssBaseline from "@material-ui/core/CssBaseline";
import axios from 'axios';
import GoalsContext from '../helpers/GoalsContext';

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
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3)
  },
  typo: {
    marginTop: theme.spacing(3),
  },
}));

export default function EditGoals(props) {
  // console.log("i am the props: ", props);
  // console.log("I am the passed in endDate: ", props.endDate);
  const classes = useStyles();

  const getNagName = async () => {
  
    const result = await axios.get("http://localhost:8001/api/nags", { withCredentials: true })
    
    const nagArray = Object.keys(result.data).map(nag => {
      return result.data[nag];
    });

    console.log("NAG ARRAY:", nagArray[0])

    // setNag(nagArray[1].nag_name);
    // setGoalId(goals[1].id)
    // setGoal(goals[1].goal_name)
    // setEndDate(goals[1].end_date)
    // setPhone1(goals[1].friend_1_phone_number)
    // setPhone2(goals[1].friend_2_phone_number)
  }

  useEffect(() => {
    getNagName();
  }, [])

  const {goals, setGoals} = useContext(GoalsContext);
  const [goalId, setGoalId] = React.useState(props.id || "");
  const [goal, setGoal] = React.useState(props.name || "");
  const [nag, setNag] = React.useState("");
  const [endDate, setEndDate] = React.useState('');
  const [phone1, setPhone1] = React.useState(props.friend1 || '');
  const [phone2, setPhone2] = React.useState(props.friend2 || '');

  const startDate =new Date();

  // console.log("I am props.endDate:", props.endDate);

  let history = useHistory();

  const submitMe = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8001/api/goals/edit', { goalId, goal, startDate, endDate, phone1, phone2, nag }, { withCredentials: true })
    .then(res => {
      console.log("I am the response data:", res.data);
    })
    console.log("hello, I am going to redirect to Goals page!");
    history.push("/goals");
  }

  // console.log("WHAT End Date is Being Passed:", endDate);
  
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" className={classes.form} >
            Edit Goals
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
                value={goal}
                margin="normal"
                onChange={(e) => setGoal(e.target.value)} />
              <TextField 
                id="outlined-basic" 
                label="Nag Title" 
                variant="outlined"
                fullWidth
                margin="normal"
                value={nag}
                onChange={(e) => setNag(e.target.value)} />
              <TextField 
                id="outlined-basic"
                label="First Friend Phone: " 
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone1}
                onChange={(e) => setPhone1(e.target.value)} />
              <TextField 
                id="outlined-basic"
                label="Second Friend Phone: " 
                variant="outlined"
                fullWidth
                margin="normal"
                value={phone2}
                onChange={(e) => setPhone2(e.target.value)} />
            {/* <h2>Frequency</h2> */}
            {/* insert multiple small icons with days of the week for nags.  Use node-con to hook up */}
            <h2>Completion Date</h2>
            <MaterialUIPickers
              initialEndDate={props.endDate}
              updateDate={(d) => {
                setEndDate(d);
              }}
            />
            <Button 
              className={classes.submit} 
              fullWidth
              variant="contained" 
              color="primary" 
              type="submit"
              onClick={props.dismiss}
            >
              Submit
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>

  );
}
