import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {useHistory} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Header from './Header';
import MediaTable from './MediaTable'
import Card from './CarCard'
import ARTabs from './Tabs'

const the = createMuiTheme({
  palette: {
    primary: {
      main: '#0055A5'
    }
  },
});

const dashStyles = makeStyles(theme => ({
  Container: {
    marginTop: theme.spacing(7),
    marginBottom: theme.spacing(15),
    marginRight: theme.spacing(17),
    marginLeft: theme.spacing(17)
  },
  Add: {
    float: 'right',
    margin: theme.spacing(1, 0, 1, 0),
    fontSize: 22,
  },
  Bot: {
    backgroundColor: '#FAFAFA',
    height: 82,
  }
}));

function createData(label, value) {
  return {label, value};
}

var primarytags = [];
var secondarydict = {};

/*
Page that contains the media listings and the AR taggings for cars.
*/
export default function CarInfo(props) {
  
  const classes = dashStyles();
  let history = useHistory();
  const [value, setValue] = useState(true);

  // Gets all the tags for current vehicle
  let gettags = async event => {
    try {
      let response = await fetch('https://pmd374kj6j.execute-api.us-east-2.amazonaws.com/prod/car/tag?carid='+props.location.state.carid.toString());
      let responseJson = await response.json();
      const ptags = [];
      for (var tag of responseJson) 
      {
        if (tag.primarytag === true)
        {
          ptags.push(createData(tag.name, tag.tagid));
        }
        else
        {
          if (tag.primarytagid in secondarydict)
          {
            secondarydict[tag.primarytagid].push(createData(tag.name, tag.tagid));
          }
          else
          {
            secondarydict[tag.primarytagid] = [createData(tag.name, tag.tagid)];
          }
        }
      }
      primarytags = ptags;
      setValue(false);
     }
    catch(error) {}
  }
  if (value)
  {
    gettags();
  }

  let AddMedia = () => {
    history.push({pathname: '/addmedia', state: { carid: props.location.state.carid, primarytags: primarytags, secondarydict: secondarydict}});
  };

  return (  
    <MuiThemeProvider theme={the}>
      <CssBaseline />   
      <Header props={props}/>
      <Card icon={props.location.state.icon} model={props.location.state.model} year={props.location.state.year} carid={props.location.state.carid} make={props.location.state.make}/>
      <Grid className={classes.Container}>
        <Button onClick={AddMedia} color="primary" className={classes.Add}>
          + Add Media
        </Button>
        <MediaTable carid={props.location.state.carid}/>
      </Grid>
      <ARTabs primarytags={primarytags} secondarydict={secondarydict} carid={props.location.state.carid}/>
      <div className={classes.Bot}/>
    </MuiThemeProvider>
  );
}