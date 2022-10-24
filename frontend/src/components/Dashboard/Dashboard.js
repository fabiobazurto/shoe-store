import React, { Component, useEffect, useState } from 'react';
import axios from 'axios';
import { styled } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import XgTableCollapsible from './../XgTable/XgTableCollapsible';
import Websocket from "react-websocket";
import { API_BASE_URL, WEBSOCKET_URL} from "./../../constants";

import {
  Typography
} from "@material-ui/core";


//model
import { StoreShoeStock } from './../../models/store_shoe_stock';
import { TableRecord } from './../../models/table_record';
import { StoreService } from './../../models/store';
import { ProductService } from './../../models/product';

class Dashboard extends Component {

  // State
  constructor(props) {
    super(props);
    this.state = {
      rows: [],
      statistics: {},
      columns: ['Store', 'Product', 'Total'],
    };

    this.models=[];
    this.stores=[];
    var response = StoreService.all_records().then( res => {
      this.stores =  res.data;
      var response = ProductService.all_records().then( res => {
	this.models =  res.data;
	this.initialize_data();
      });
    });
  }
  
  initialize_data(){
    this.stores.forEach( store=>{
      this.state.statistics[store.name] = {};
      this.models.forEach(shoes=>{
	this.state.statistics[store.name][shoes.name]= -1
	  store.store_products.forEach( product =>{
	    if(product.name==shoes.name){
	      	this.state.statistics[store.name][shoes.name]= product.stock
	    }
	  });
      });
    });
    this.format_response_data();
  }  
  
  format_response_data(){
    var local_rows= [];
    Object.keys(this.state.statistics).forEach(store=>{
      var has_stock_problems = false;      
      var table_record = new TableRecord(store);
      Object.keys(this.state.statistics[store]).forEach(model=>{
	table_record.child_rows.push(new StoreShoeStock(store,model, this.state.statistics[store][model]));
	if(this.state.statistics[store][model]<10 && this.state.statistics[store][model]!=-1 && !has_stock_problems)
	  has_stock_problems = true;
      });
      table_record.bad_stock = has_stock_problems;
      local_rows.push(table_record);
    });
    this.setState({ rows:  local_rows});
  }

  handleData = messageData =>{
    var inventory_json = JSON.parse(messageData);
    var store = inventory_json['store']
    var model = inventory_json['model']
    var inventory =  inventory_json['inventory']

    if(this.state.statistics[store]){
      this.state.statistics[store][model] = inventory;
    }
    else{
      var json_model = {};
      json_model[model] = inventory
      this.state.statistics[store] = json_model;
    }
    this.format_response_data();
  }
  

  render(){
    return (
      <Container>
	<Typography variant="h3">Dashboard</Typography>

<p>	<span class="box success">Good Stock</span>
	<span class="box warning">In transit</span>
	<span class="box alert">Low stock</span></p>
	<Websocket
      url={WEBSOCKET_URL}
      onMessage={this.handleData}
        />
	<XgTableCollapsible rows={this.state.rows} cols={this.state.columns}/>
	</Container>
    );
  }
}

export default Dashboard;
