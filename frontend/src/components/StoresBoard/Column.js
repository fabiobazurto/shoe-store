import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Typography } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import Grid from "@material-ui/core/Grid";
import blue from "@material-ui/core/colors/blue";


const useStyles = makeStyles((theme) => ({
  paper: {
    border: "1px solid #e3f2fd",
    boxShadow: "0 0 11px #eaf0f6",
    marginBottom: "0.5rem",
    "&:hover": {
      backgroundColor: "#e3f2fd",
      color: "white",
    },
  },
  button: {
    backgroundColor: blue[100],
    "&:hover": {
      backgroundColor: theme.palette.primary.main,
      "& $addIcon": {
        color: "white",
      },
    },
  },
  addIcon: {
    color: theme.palette.primary.main,
  },
}));

const posts = [
  {
    id: 12,
    title: "Review Fall/Winter Product Launch",
    content: "Meeting for Adidas 112, Bonobos 325, Calvin Klein 42.",
    date: "Oct 8",
  },
  {
    id: 43,
    title: "Organize September 15 Incoming Shipment",
    content: "Expecting Hershal, Banana Republic top up.",
    date: "Sep 15",
  },
];

export default function Board(props) {
  const classes = useStyles();
      // <Paper className={classes.paper}>
      //   <Button fullWidth={true} color="primary" className={classes.button}>
      //     <Add className={classes.addIcon} />
      //   </Button>
      // </Paper>

  return (
    <React.Fragment>
      <Typography
        variant="h5"
        gutterBottom
        style={{ fontFamily: "ApercuMedium" }}
      >
        {props.name}
      </Typography>
      <Grid
        container
        spacing={1}
        direction="row"
        justify="center"
        alignItems="flex-start"
      >
      </Grid>
    </React.Fragment>
  );
}
