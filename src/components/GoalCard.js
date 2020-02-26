import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";


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

export default function GoalOutlinedCard(props) {
  const classes = useStyles();
    return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Goal End Date: {props.simpleEndDate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="medium" variant="outlined" color="primary" onClick={() => props.edit(props)}>
          Edit
        </Button>
        <Button
          size="medium"
          variant="outlined"
          color="secondary"
          onClick={() => props.delete(props.id)}
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}
