import axios from 'axios';
import {
    ROOMMAINTENANCE_GET_ONE,
    ROOMMAINTENANCE_GET_MULTIPLE,
    ROOMMAINTENANCE_REGISTER_SUCCESS,
    ROOMMAINTENANCE_REGISTER_FAIL,
    ROOMMAINTENANCE_LOADING,
    ROOMMAINTENANCE_LOADING_ERROR,
    ROOMMAINTENANCE_UPDATE_SUCCESS,
    ROOMMAINTENANCE_UPDATE_FAIL,
    ROOMMAINTENANCE_DELETE_SUCCESS,
    ROOMMAINTENANCE_DELETE_FAIL,
    ROOMMAINTENANCE_EDIT,
} from "./../types/roommaintenance";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'roommaintenances';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOMMAINTENANCE 
export const getRoommaintenances = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : ROOMMAINTENANCE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOMMAINTENANCE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOMMAINTENANCE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOMMAINTENANCE 
export const getRoommaintenance = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOMMAINTENANCE_GET_ONE,
        payload: id
    });  
};
//ROOMMAINTENANCE DELETE
export const deleteRoommaintenance = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOMMAINTENANCE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMMAINTENANCE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOMMAINTENANCE REGISTER
export const registerRoommaintenance = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMMAINTENANCE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMMAINTENANCE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOMMAINTENANCE UPDATE
export const updateRoommaintenance = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMMAINTENANCE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMMAINTENANCE_UPDATE_FAIL,
                payload: err
            })
        })
};
