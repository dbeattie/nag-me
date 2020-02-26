import "date-fns";
import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";

//handling MaterialUi date picker
//*******************************

export default function MaterialUIPickers(props) {
  const initialDate = props.initialEndDate
    ? props.initialEndDate
    : new Date().getTime();

  const [selectedDate, setSelectedDate] = useState(initialDate);
  // console.log("I am the default selectedDate:", selectedDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    props.updateDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Please select completion date:"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            "aria-label": "change date"
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
