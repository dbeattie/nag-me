import 'date-fns';
import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  // KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';

export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  // const [selectedDate, setSelectedDate] = React.useState(new Date().getTime());

  const initalDate = props.initialEndDate ? props.initialEndDate : new Date().getTime();
  const [selectedDate, setSelectedDate] = React.useState(initalDate);

  const handleDateChange = date => {
    setSelectedDate(date);
    props.updateDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        {/* <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        /> */}
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Please select completion date:"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        {/* <KeyboardTimePicker                 comment time picker (stretch) for now
          margin="normal"
          id="time-picker"
          label="Please select completion time:"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time', 
          }}
        /> */}
      </Grid>
    </MuiPickersUtilsProvider>
  );
}
