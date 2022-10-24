import {API_BASE_URL} from "../constants";
import axios from 'axios';

export class LocalStore{
  constructor(name, store_products=[]){
    this.name = name;
    this.store_products = store_products;
  }
    
  all_records(){
      axios.get(API_BASE_URL + '/stores');
  }
}
