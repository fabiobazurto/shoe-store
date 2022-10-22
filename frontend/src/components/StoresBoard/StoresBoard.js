import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  container: {
    marginBottom: '5em'
  },
  title: {
    fontFamily: 'ApercuMedium',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));

function StoresBoard() {
  const [count, setCount] = useState(0);
  const classes = useStyles();

  return (
	  <Container>
	  <div>
	  <h1>board</h1>
	  </div>
	  </Container>
  );
}

export default { StoresBoard }


