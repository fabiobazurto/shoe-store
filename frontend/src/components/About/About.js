import React, { useState, Component } from 'react';
import axios from 'axios';
import { API_BASE_URL, WEBSOCKET_URL} from "./../../constants";

import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import NumericInput from 'react-numeric-input';

import { StoreService } from './../../models/store';
import { ProductService } from './../../models/product';

class About extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected_source: 0,
      selected_destination: 0,
      selected_product: 0,
      selected_units: 0,
      stores:[],
      products:[],
    };

//    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    var response = StoreService.all_records().then( res => {
      this.setState({ stores:  res.data});
    });

    var response = ProductService.all_records().then( res => {
      this.setState({ products:  res.data});
    });
  }


  onSourceChange = e => {
    this.setState({
      selected_source: e.target.value
    });
  };

  onDestinationChange = e => {
    this.setState({
      selected_destination: e.target.value
    });
  };

  onProductChange = e => {
    this.setState({
      selected_product: e.target.value
    });
  };

  onUnitsChange = value => {
    this.setState({
      selected_units: value
    });
  };
  
  handleSubmit(event) {

    const payload = {
      source: this.state.selected_source,
      destination: this.state.selected_destination,
      product_id: this.state.selected_product,
      units: this.state.selected_units
    };
    console.log(payload);
    axios.post(API_BASE_URL + '/inventory/transfer',payload).then( res => {
      alert('Transfer was successfully');

      this.setState({selected_source:''});
      
      this.setState({selected_destination:''});
      
      this.setState({selected_product:''});
      
      this.setState({selected_units:''});
      // reset form
    });

    event.preventDefault();
  }

  render() {
    const stores = this.state.stores;
    const products = this.state.products;

    var ws = new WebSocket('ws://localhost:8080/');
    ws.onopen = function(e) {
      ws.send("My name is Joddddhn");
    };
    ws.onmessage = function(event) {
      var line = event.data; // get line from websocket event
      console.log(line);
    };

    
    return (
      <Container>
	<div className='align-left'>
	<form onSubmit={this.handleSubmit}>
	<p>
	<label> Source Store</label><br/>
        <select name="source" value={this.state.selected_source} onChange={this.onSourceChange}>
	{ 
          (stores && stores.length > 0) && stores.map((store) => {
            return (<option value={store.id}> {store.name}</option>);
          })
        }
      </select>
	</p>

	<p>
	<label>Product</label><br/>
        <select name="product_id" value={this.state.selected_product} onChange={this.onProductChange}>
	{ 
          (products && products.length > 0) && products.map((product) => {
            return (<option value={product.id}> {product.name}</option>);
          })
        }
      </select>
	</p>		
	
	<p>
	<label>Destination Store</label><br/>
        <select name="destination" value={this.state.selected_destination} onChange={this.onDestinationChange}>
	{ 
          (stores && stores.length > 0) && stores.map((store) => {
            return (<option value={store.id}> {store.name}</option>);
          })
        }
      </select>
	</p>

	<p>
	<label>Units</label><br/>
	<NumericInput name="units"  onChange={(value) => this.onUnitsChange(value)} />
	</p>

        <input type="submit" value="Submit" />
	</form>
	</div>
	</Container>
    );
  }
}

export default About;
