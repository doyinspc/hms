import axios from 'axios';
import {
    USER_GET_ONE,
    USER_GET_MULTIPLE,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_LOADING,
    USER_LOADING_ERROR,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_EDIT,
} from "./../types/user";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'users';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USER 
export const getUsers = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : USER_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: USER_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : USER_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE USER 
export const getUser = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : USER_GET_ONE,
        payload: id
    });  
};
//USER DELETE
export const deleteUser = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : USER_DELETE_FAIL,
                payload : err
            })
        })
        
}
//USER REGISTER
export const registerUser = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_REGISTER_FAIL,
                payload: err
            })
        })
};
 //USER UPDATE
export const updateUser = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};
