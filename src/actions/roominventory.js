import axios from 'axios';
import {
    ROOMINVENTORY_GET_ONE,
    ROOMINVENTORY_GET_MULTIPLE,
    ROOMINVENTORY_REGISTER_SUCCESS,
    ROOMINVENTORY_REGISTER_FAIL,
    ROOMINVENTORY_LOADING,
    ROOMINVENTORY_LOADING_ERROR,
    ROOMINVENTORY_UPDATE_SUCCESS,
    ROOMINVENTORY_UPDATE_FAIL,
    ROOMINVENTORY_DELETE_SUCCESS,
    ROOMINVENTORY_DELETE_FAIL,
    ROOMINVENTORY_EDIT,
} from "./../types/roominventory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'roominventorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOMINVENTORY 
export const getRoominventorys = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : ROOMINVENTORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOMINVENTORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOMINVENTORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOMINVENTORY 
export const getRoominventory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOMINVENTORY_GET_ONE,
        payload: id
    });  
};
//ROOMINVENTORY DELETE
export const deleteRoominventory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOMINVENTORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMINVENTORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOMINVENTORY REGISTER
export const registerRoominventory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMINVENTORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMINVENTORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOMINVENTORY UPDATE
export const updateRoominventory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMINVENTORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMINVENTORY_UPDATE_FAIL,
                payload: err
            })
        })
};
