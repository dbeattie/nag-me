import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Slide from '@material-ui/core/Slide';
import { shadows } from '@material-ui/system';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    background: "linear-gradient(45deg, #009dff 30%, #FF8E53 90%)",
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    marginBottom: "10px",
    borderRadius: "10px",
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 15,
    color: 'red'
  }
});

export default function NagOutlinedCard(props) {
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);

  const handleClickYes = () => {
    props.nagYes(props.id);
    setChecked(false);
  }

  const handleClickNo = () => {
    props.nagNo(props.id);
    setChecked(false);
  }

  return (
    <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2">
            {props.name}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            Complete Nag by: {props.simpleEndDate}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" onClick={handleClickYes}>
            Yes
          </Button>
          <Button size="small" color="primary" onClick={handleClickNo}>
            No
          </Button>
        </CardActions>
      </Card>
    </Slide>
  );
}
