import axios from 'axios';
import {
    USER_LOGIN,
    USER_LOGIN_ERROR,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL,
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
} from "../types/user";
import { MAIN_TOKEN, API_PATHS, axiosConfig, axiosConfig1 } from './common';

let TABLE_NAME = 'user_types';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL USER 
export const getUsers = data => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = data;
    params.cat = 'all';
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
export const userLogin = data => (dispatch, getState) => {

    dispatch({type : USER_LOADING});
        axios.post(path, data, axiosConfig1)
            .then(res => {                                                                                                                                                                                                                                      
                dispatch({
                    type: USER_LOGIN,
                    payload: res.data.data,
                    token: res.data.token
                })
            })
            .catch(err => {
                
                dispatch({
                    type : USER_LOGIN_ERROR,
                    payload:err
                })
            })
};
export const getUserLogout = () => (dispatch, getState) => {
    dispatch({
        type: USER_LOGOUT_SUCCESS
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
export const deleteUser = data => (dispatch, getState) =>{
    dispatch({type : USER_LOADING});
    axios.get(path, JSON.stringify({data}), {params})
        .then(res => {
            dispatch({
                type: USER_DELETE_SUCCESS,
                payload: res.data
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
    dispatch({type : USER_LOADING});
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USER_REGISTER_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_REGISTER_FAIL,
                payload: err
            })
        })
};

//USER REGISTER
export const registerUserPost = data => dispatch => {
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: USER_LOGIN,
                payload: res.data.data,
                token: res.data.token
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};
 //USER UPDATE
export const updateUser = (data, id) => (dispatch, getState) => {
    //body
    const body = JSON.stringify(data);  
    params.data = body;
    params.id = id;
    params.cat = 'update';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: USER_UPDATE_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type : USER_UPDATE_FAIL,
                payload: err
            })
        })
};
