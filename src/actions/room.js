import axios from 'axios';
import {
    ROOM_GET_ONE,
    ROOM_GET_MULTIPLE,
    ROOM_REGISTER_SUCCESS,
    ROOM_REGISTER_FAIL,
    ROOM_LOADING,
    ROOM_LOADING_ERROR,
    ROOM_UPDATE_SUCCESS,
    ROOM_UPDATE_FAIL,
    ROOM_DELETE_SUCCESS,
    ROOM_DELETE_FAIL,
    ROOM_EDIT,
} from "../types/room";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'rooms';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL ROOM 
export const getRooms = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : ROOM_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: ROOM_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : ROOM_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE ROOM 
export const getRoom = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : ROOM_GET_ONE,
        payload: id
    });  
};
//ROOM DELETE
export const deleteRoom = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: ROOM_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : ROOM_DELETE_FAIL,
                payload : err
            })
        })
        
}
//ROOM REGISTER
export const registerRoom = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOM_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOM_REGISTER_FAIL,
                payload: err
            })
        })
};
 //ROOM UPDATE
export const updateRoom = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: ROOM_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : ROOM_UPDATE_FAIL,
                payload: err
            })
        })
};
