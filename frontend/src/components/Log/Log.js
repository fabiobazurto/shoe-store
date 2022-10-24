import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
//import Paper from '@material-ui/core/Paper';

//import KeyboardArrowDownIcon from '@material-ui/icons-material/KeyboardArrowDown';
//import KeyboardArrowUpIcon from '@material-ui/icons-material/KeyboardArrowUp';

import {
  Typography,
  Button
} from "@material-ui/core";

//model
import { StoreShoeStock } from './../../models/store_shoe_stock';

//  Component which uses drag-n-drop activation when clicking inside the component
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`th`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`tbody`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export default function Log() {
  const [rowse, setRowse] = useState([]);

  const [statistics, setStatistics] = useState({});  
  // Used to detect websocket state
  const [serverMessage, setServerMessage] = useState("");
  const [webSocketReady, setWebSocketReady] = useState(false);

  //using useState so when socket updates it triggers a component rerender
  const [webSocket, setWebSocket] = useState(new WebSocket("ws://127.0.0.1:8080/"));

  var rows=[];



  
  useEffect(() => {
    webSocket.onopen = (event) => {
      setWebSocketReady(true);
    };

    webSocket.onmessage = function (event) {
      var inventory_json = JSON.parse(event.data);
      var store = inventory_json['store']
      var model = inventory_json['model']
      var inventory =  inventory_json['inventory']

      if(statistics[store]){
	statistics[store][model] = inventory;
      }
      else{
	statistics[store] = { model: inventory };
      }

      rows.unshift(new StoreShoeStock(inventory_json['store'], inventory_json['model'], inventory_json['inventory']))
      rows = rows.slice(0, 10)
      setRowse(rows);
      setServerMessage(JSON.parse(event.data));
      console.log(rows);
    };

    webSocket.onclose = function (event) {
      setWebSocketReady(false);
      setTimeout(() => {
        setWebSocket(new WebSocket("ws://127.0.0.1:8080/"));
      }, 1000);
    };

    webSocket.onerror = function (err) {
      console.log('Socket encountered error: ', err.message, 'Closing socket');
      setWebSocketReady(false);
      webSocket.close();
    };

    return () => {
       webSocket.close();
    };
  }, [webSocket]);
  
  return (
    <Container>
	<Typography variant="h3">Logs</Typography>
    <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow> 
          <StyledTableCell><h3 align='left'>Stores</h3></StyledTableCell>
          <StyledTableCell align="right">Shoes</StyledTableCell>
          <StyledTableCell align="right">Total stock</StyledTableCell>
          <StyledTableCell align="right"></StyledTableCell>	  
        </TableRow>
      </TableHead>
      <TableBody>
          {rowse.map((row) => (
            <StyledTableRow>
              <StyledTableCell  align="left" scope="row">
                {row.store}
              </StyledTableCell>
              <StyledTableCell align="right">{row.model}</StyledTableCell>
	      <StyledTableCell align="right">{row.inventory}</StyledTableCell>
		  <StyledTableCell align="right"></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
      </Container>
  );
}
