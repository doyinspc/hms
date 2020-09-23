import axios from 'axios';
import {
    ROOMCATEGORY_GET_ONE,
    ROOMCATEGORY_GET_MULTIPLE,
    ROOMCATEGORY_REGISTER_SUCCESS,
    ROOMCATEGORY_REGISTER_FAIL,
    ROOMCATEGORY_LOADING,
    ROOMCATEGORY_LOADING_ERROR,
    ROOMCATEGORY_UPDATE_SUCCESS,
    ROOMCATEGORY_UPDATE_FAIL,
    ROOMCATEGORY_DELETE_SUCCESS,
    ROOMCATEGORY_DELETE_FAIL,
    ROOMCATEGORY_EDIT,
} from "./../types/roomcategory";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'roomcategorys';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOMCATEGORY 
export const getRoomcategorys = params => (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : ROOMCATEGORY_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOMCATEGORY_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOMCATEGORY_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOMCATEGORY 
export const getRoomcategory = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOMCATEGORY_GET_ONE,
        payload: id
    });  
};
//ROOMCATEGORY DELETE
export const deleteRoomcategory = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOMCATEGORY_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMCATEGORY_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOMCATEGORY REGISTER
export const registerRoomcategory = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMCATEGORY_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMCATEGORY_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOMCATEGORY UPDATE
export const updateRoomcategory = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMCATEGORY_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMCATEGORY_UPDATE_FAIL,
                payload: err
            })
        })
};
