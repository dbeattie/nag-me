import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ClearIcon from '@material-ui/icons/Clear';
import CheckIcon from '@material-ui/icons/Check';
import Slide from '@material-ui/core/Slide';

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
          <Button 
            size="medium" 
            color="primary" 
            startIcon={<CheckIcon />}
            onClick={handleClickYes}>
            Yes
          </Button>
          <Button 
            size="medium" 
            color="secondary" 
            endIcon={<ClearIcon />}
            onClick={handleClickNo}>
            No
          </Button>
        </CardActions>
      </Card>
    </Slide>
  );
}
