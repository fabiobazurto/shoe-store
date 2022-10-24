import {API_BASE_URL} from "./../constants";
import axios from 'axios';

export class ProductService{
    static all_records(){
	return axios.get(API_BASE_URL + '/products');
    }
}
