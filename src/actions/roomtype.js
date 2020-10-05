import axios from 'axios';
import {
    ROOMTYPE_GET_ONE,
    ROOMTYPE_GET_MULTIPLE,
    ROOMTYPE_REGISTER_SUCCESS,
    ROOMTYPE_REGISTER_FAIL,
    ROOMTYPE_LOADING,
    ROOMTYPE_LOADING_ERROR,
    ROOMTYPE_UPDATE_SUCCESS,
    ROOMTYPE_UPDATE_FAIL,
    ROOMTYPE_DELETE_SUCCESS,
    ROOMTYPE_DELETE_FAIL,
    ROOMTYPE_EDIT,
} from "./../types/roomtype";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'roomtypes';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOMTYPE 
export const getRoomtypes = params=> (dispatch, getState) => {
    //SET PAGE LOADING
    params.token = MAIN_TOKEN;
    dispatch({type : ROOMTYPE_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOMTYPE_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOMTYPE_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOMTYPE 
export const getRoomtype = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOMTYPE_GET_ONE,
        payload: id
    });  
};
//ROOMTYPE DELETE
export const deleteRoomtype = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOMTYPE_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTYPE_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOMTYPE REGISTER
export const registerRoomtype = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMTYPE_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTYPE_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOMTYPE UPDATE
export const updateRoomtype = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOMTYPE_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOMTYPE_UPDATE_FAIL,
                payload: err
            })
        })
};
