import React from 'react';
import {useHistory} from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import CarTable from './CarTable'
import Header from './Header';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  Boxspacing: {
    margin: theme.spacing(2, 7, 0, 7)
  },
  Add: {
    fontSize: 22
  },
  Text: {
    fontSize: 26,
  },
}));

/*
Page representing the dashboard that lists all of the currently supported vehicles.
*/
export default function Dashboard(props) {

  const classes = dashStyles();

  let history = useHistory();
  
  // redirects you to the add car page
  let addcar = () => {
    history.push("/addcar");
  };

  return (  
    <MuiThemeProvider theme={theme}>
      <CssBaseline />  
      <Header props={props}/>
      <Box display="flex" className={classes.Boxspacing}>
        <Box alignSelf="center">
          <b className={classes.Text}>
            Currently Supported Vehicles
          </b>
        </Box>
        <Box flexGrow={1}/>
        <Box alignSelf="center">
          <Button onClick={addcar} color="primary" className={classes.Add}>
            + Add Vehicle
          </Button>
        </Box>
      </Box>
      <CarTable/>
    </MuiThemeProvider>
  );
}