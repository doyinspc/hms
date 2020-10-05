import axios from 'axios';
import {
    ROOMTRANSACTION_GET_ONE,
    ROOMTRANSACTION_GET_MULTIPLE,
    ROOMTRANSACTION_REGISTER_SUCCESS,
    ROOMTRANSACTION_REGISTER_FAIL,
    ROOMTRANSACTION_LOADING,
    ROOMTRANSACTION_LOADING_ERROR,
    ROOMTRANSACTION_UPDATE_SUCCESS,
    ROOMTRANSACTION_UPDATE_FAIL,
    ROOMTRANSACTION_DELETE_SUCCESS,
    ROOMTRANSACTION_DELETE_FAIL,
    ROOMTRANSACTION_EDIT,
} from "./../types/roomtransaction";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'roomtransactions';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOMTRANSACTION 
export const getRoomtransactions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : ROOMTRANSACTION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOMTRANSACTION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOMTRANSACTION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOMTRANSACTION 
export const getRoomtransaction = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOMTRANSACTION_GET_ONE,
        payload: id
    });  
};
//ROOMTRANSACTION DELETE
export const deleteRoomtransaction = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOMTRANSACTION_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTRANSACTION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOMTRANSACTION REGISTER
export const registerRoomtransaction = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMTRANSACTION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTRANSACTION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOMTRANSACTION UPDATE
export const updateRoomtransaction = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMTRANSACTION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTRANSACTION_UPDATE_FAIL,
                payload: err
            })
        })
};
