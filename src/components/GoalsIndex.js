import React from 'react';
import MaterialTable from 'material-table';
import axios from "axios";
import { useState, useEffect, forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

  // function useFetch(url, defaultData) {
  //   const [data, updateData] = useState(defaultData)

  //   useEffect(async () => {
  //       if (!url) {
  //           updateData(defaultData)
  //           return
  //       }
  //       const resp = await fetch(url)
  //       const json = await resp.json()
  //       updateData(json)
  //   }, [url])

  //   return data
  // }
  
  
  
  function queryGoals(id) {

    return axios.get("http://localhost:8001/api/goals")
    .then((goals) => {
      //Convert Object of Objects into an Array of Objects
      const goalArr = Object.keys(goals.data).map(goal => {
        return goals.data[goal]
      });

      //Filter that Array by User_id and deletes data we don't want/need
      const filteredGoals = goalArr.filter(obj => {
        if (obj.user_id === id) {
          delete obj.id
          delete obj.user_id
          delete obj.start_date
          delete obj.cron
          return obj
        } else return null
      });
      return filteredGoals;
    }).catch(Error);
  };

  //function gets the right data output but I can't pass it into the table...
  //It's an async issue that I think needs to be resolved with useEffect
  const testTableData = queryGoals(2);
  



export default function GoalsIndex() {
  
  console.log(testTableData)

  const [state, setState] = React.useState({
    columns: [
      { title: 'Name', field: 'name' },
      { title: 'End Date', field: 'end_date', type: 'numeric'},
    ],
    data: [
      { name: 'Mehmet', end_date: 'Baran'},
      { name: 'Zerya', end_date: 'Baran'}
    ]
  });

  return (
    <div style={{ maxWidth: "100%" }}>
      <MaterialTable
        icons={tableIcons}
        title="Goals"
        columns={state.columns}
        data={state.data}
        editable={{
          onRowAdd: newData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.push(newData);
                  return { ...prevState, data };
                });
              }, 600);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                if (oldData) {
                  setState(prevState => {
                    const data = [...prevState.data];
                    data[data.indexOf(oldData)] = newData;
                    return { ...prevState, data };
                  });
                }
              }, 600);
            }),
          onRowDelete: oldData =>
            new Promise(resolve => {
              setTimeout(() => {
                resolve();
                setState(prevState => {
                  const data = [...prevState.data];
                  data.splice(data.indexOf(oldData), 1);
                  return { ...prevState, data };
                });
              }, 600);
            }),
        }}
      />
    </div>
  );
}