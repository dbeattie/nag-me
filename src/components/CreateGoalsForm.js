import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MaterialUIPickers from './Picker';
import Button from '@material-ui/core/Button';
import axios from 'axios';

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
  const [goal, setGoal] = React.useState("");
  const [nag, setNag] = React.useState("");
  const [startdate, setStartdate] = React.useState(new Date());
  const [enddate, setEnddate] = React.useState('');
  const [phone1, setPhone1] = React.useState('');
  const [phone2, setPhone2] = React.useState('');

  const submitMe = (e) => {
    e.preventDefault();
    axios.put('http://localhost:8001/api/goals/new', { goal, startdate, enddate, phone1, phone2, nag })
    .then(res => {
      console.log(res);
      console.log(res.data);

      // axios.put('http://localhost:8001/api/nags/new', { nag, nagCounts })
      // .then(res => {
      //   console.log(res);
      //   console.log(res.data);
      // })
    })

    
  }

  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off" onSubmit={submitMe}>
        <h2>Create Goals</h2>
          <TextField 
            id="outlined-basic" 
            label="Goal Title" 
            variant="outlined"
            onChange={(e) => setGoal(e.target.value)} />
          <TextField 
            id="outlined-basic" 
            label="Nag Title" 
            variant="outlined"
            onChange={(e) => setNag(e.target.value)} />
          <TextField 
            id="outlined-basic"
            label="First Friend Phone: " 
            variant="outlined"
            onChange={(e) => setPhone1(e.target.value)} />
          <TextField 
            id="outlined-basic"
            label="Second Friend Phone: " 
            variant="outlined"
            onChange={(e) => setPhone2(e.target.value)} />
        <h2>Frequency</h2>
        {/* insert multiple small icons with days of the week for nags.  Use node-con to hook up */}
        <h2>Completion Date</h2>
        <MaterialUIPickers 
          updateDate={(selectedDate) => {
            console.log(selectedDate);
            setEnddate(selectedDate);
          }}
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}
