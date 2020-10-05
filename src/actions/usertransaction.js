import axios from 'axios';
import {
    USERTRANSACTION_GET_ONE,
    USERTRANSACTION_GET_MULTIPLE,
    USERTRANSACTION_REGISTER_SUCCESS,
    USERTRANSACTION_REGISTER_FAIL,
    USERTRANSACTION_LOADING,
    USERTRANSACTION_LOADING_ERROR,
    USERTRANSACTION_UPDATE_SUCCESS,
    USERTRANSACTION_UPDATE_FAIL,
    USERTRANSACTION_DELETE_SUCCESS,
    USERTRANSACTION_DELETE_FAIL,
    USERTRANSACTION_EDIT,
} from "./../types/usertransaction";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'usertransactions';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USERTRANSACTION 
export const getUsertransactions = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : USERTRANSACTION_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USERTRANSACTION_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USERTRANSACTION_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USERTRANSACTION 
export const getUsertransaction = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USERTRANSACTION_GET_ONE,
        payload: id
    });  
};
//USERTRANSACTION DELETE
export const deleteUsertransaction = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USERTRANSACTION_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : USERTRANSACTION_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USERTRANSACTION REGISTER
export const registerUsertransaction = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERTRANSACTION_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERTRANSACTION_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USERTRANSACTION UPDATE
export const updateUsertransaction = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USERTRANSACTION_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USERTRANSACTION_UPDATE_FAIL,
                payload: err
            })
        })
};
