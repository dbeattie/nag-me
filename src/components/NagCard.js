import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from 'axios'

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  }
});




export default function NagOutlinedCard(props) {
    const classes = useStyles();
        const nagYes = (id) => {
            axios.post('http://localhost:8001/api/nags/toggletrue', { id })
              .then(res => {
                console.log("I am res.data:", res);
              })
          }

          const nagNo = (id) => {
            axios.post('http://localhost:8001/api/nags/togglefalse', { id })
              .then(res => {
                console.log("I am res.data:", res);
              })
          }
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Complete Nag by: {props.endDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => nagYes(props.id)}>
           Yes 
        </Button>
        <Button size="small" color="primary" onClick={() => nagNo(props.id)}>
          No
        </Button>
      </CardActions>
    </Card>
  );
}
