import React, { useEffect } from 'react';
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
  console.log("i am the props: ", props);
  const classes = useStyles();

  const getNagName = async () => {
  
    const result = await axios.get("http://localhost:8001/api/nags",)
    
    const nagArray = Object.keys(result.data).map(nag => {
      return result.data[nag];
    });

    const filterNags = nagArray.find(obj => {
      if (obj.goal_id === props.id) {
        return obj.nag_name;
      } else return null;
    });
    // console.log("I am filterNag:", filterNags.nag_name);
    setNag(filterNags.nag_name);
  }
    

  useEffect(() => {
    console.log("getNagName:", getNagName())
    getNagName();
  }, [])


  const [goal, setGoal] = React.useState(props.name || "");
  const [goalid, setGoalid] = React.useState(props.id || "");
  const [nag, setNag] = React.useState("");
  const [enddate, setEnddate] = React.useState('');
  const [phone1, setPhone1] = React.useState(props.friend1 || '');
  const [phone2, setPhone2] = React.useState(props.friend2 || '');

  const startdate =new Date();

  // getNagName();
  let history = useHistory();
  const submitMe = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8001/api/goals/edit', { goalid, goal, startdate, enddate, phone1, phone2, nag })
    .then(res => {
      // console.log(res);
      // console.log(res.data);
    })
    console.log("hello, I am going to redirect to Goals page!");
    history.push("/goals");
  }

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
              updateDate={(selectedDate) => {
                // console.log(selectedDate);
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
