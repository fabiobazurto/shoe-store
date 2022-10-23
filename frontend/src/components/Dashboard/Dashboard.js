import React, { useEffect, useState } from 'react';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import XgTableCollapsible from './../XgTable/XgTableCollapsible';

//model
import { StoreShoeStock } from './../../models/store_shoe_stock';
import { TableRecord } from './../../models/table_record';

const websocket_url = "ws://127.0.0.1:8080/";

export default function Dashboard() {

  const [rows, setRows] = useState([]);

  const [statistics, setStatistics] = useState({});  
  // Used to detect websocket state
  const [serverMessage, setServerMessage] = useState("");
  const [webSocketReady, setWebSocketReady] = useState(false);
  
  //using useState so when socket updates it triggers a component rerender
  const [webSocket, setWebSocket] = useState(new WebSocket(websocket_url));

  const columns = ['Store', 'Product', 'Total']
  
  const stores = ['ALDO Centre Eaton', 'ALDO Destiny USA Mall', 'ALDO Pheasant Lane Mall', 'ALDO Holyoke Mall', 'ALDO Maine Mall', 'ALDO Crossgates Mall', 'ALDO Burlington Mall', 'ALDO Solomon Pond Mall', 'ALDO Auburn Mall', 'ALDO Waterloo Premium Outlets']

  const models = ['ADERI', 'MIRIRA', 'CAELAN', 'BUTAUD', 'SCHOOLER', 'SODANO', 'MCTYRE', 'CADAUDIA', 'RASIEN', 'WUMA', 'GRELIDIEN', 'CADEVEN', 'SEVIDE', 'ELOILLAN', 'BEODA', 'VENDOGNUS', 'ABOEN', 'ALALIWEN', 'GREG', 'BOZZA' ]  
  
  const inventory_data = function(){
    var local_rows= [];

    Object.keys(statistics).map(function(store){
      var has_stock_problems = false;      
      var table_record = new TableRecord(store);
      Object.keys(statistics[store]).map(function(model){
	table_record.child_rows.push(new StoreShoeStock(store,model, statistics[store][model]));
	if(statistics[store][model]<10 && statistics[store][model]!=-1 && !has_stock_problems)
	  has_stock_problems = true;
      });
      table_record.bad_stock = has_stock_problems;
      local_rows.push(table_record);
    });
    setRows(local_rows);
  }

  const initialize_data = function(){
    stores.map(function(store){
      statistics[store] = {};
       models.map(function(shoes){
	 statistics[store][shoes]= -1;
      });
    });
    inventory_data();
  }
  

  useEffect(() => {

    initialize_data();
    
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
	statistics[store] = { "${model}": inventory };
      }
      inventory_data();
    };

    webSocket.onclose = function (event) {
      setWebSocketReady(false);
      console.log('Reconnecting socket');
      setTimeout(() => {
        setWebSocket(new WebSocket(websocket_url));
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
      <XgTableCollapsible rows={rows} cols={columns}/>
    </Container>
  );
}
