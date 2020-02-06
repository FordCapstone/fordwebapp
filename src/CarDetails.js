import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Header from './Header';

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

export default function CarInfo(props) {
    console.log(props);
    return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Header props={props} title="Manage Media"/>
      <Typography align="left" variant="h3">
        { props.location.state.id }
      </Typography>
    </MuiThemeProvider>
    );
}