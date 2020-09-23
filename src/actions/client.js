import axios from 'axios';
import {
    CLIENT_GET_ONE,
    CLIENT_GET_MULTIPLE,
    CLIENT_REGISTER_SUCCESS,
    CLIENT_REGISTER_FAIL,
    CLIENT_LOADING,
    CLIENT_LOADING_ERROR,
    CLIENT_UPDATE_SUCCESS,
    CLIENT_UPDATE_FAIL,
    CLIENT_DELETE_SUCCESS,
    CLIENT_DELETE_FAIL,
    CLIENT_EDIT,
} from "./../types/client";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'clients';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL CLIENT 
export const getClients = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : CLIENT_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: CLIENT_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : CLIENT_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE CLIENT 
export const getClient = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : CLIENT_GET_ONE,
        payload: id
    });  
};
//CLIENT DELETE
export const deleteClient = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: CLIENT_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_DELETE_FAIL,
                payload : err
            })
        })
        
}
//CLIENT REGISTER
export const registerClient = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLIENT_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_REGISTER_FAIL,
                payload: err
            })
        })
};
 //CLIENT UPDATE
export const updateClient = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: CLIENT_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : CLIENT_UPDATE_FAIL,
                payload: err
            })
        })
};
