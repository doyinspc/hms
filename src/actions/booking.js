import axios from 'axios';
import {
    BOOKING_GET_ONE,
    BOOKING_GET_MULTIPLE,
    BOOKING_REGISTER_SUCCESS,
    BOOKING_REGISTER_FAIL,
    BOOKING_LOADING,
    BOOKING_LOADING_ERROR,
    BOOKING_UPDATE_SUCCESS,
    BOOKING_UPDATE_FAIL,
    BOOKING_DELETE_SUCCESS,
    BOOKING_DELETE_FAIL,
    BOOKING_EDIT,
} from "./../types/booking";
import { MAIN_TOKEN, API_PATHS, axiosConfig1, axiosConfig } from './common';

let TABLE_NAME = 'bookings';
const path = API_PATHS;

let params = {
    data:{},
    cat:'all',
    table:TABLE_NAME,
    token:MAIN_TOKEN
  }
//GET ALL BOOKING 
export const getBookings = dat => (dispatch, getState) => {
    //SET PAGE LOADING
    params.data = dat;
    params.cat = 'select';
    dispatch({type : BOOKING_LOADING});
        axios.get(path, {params}, axiosConfig)
            .then(res => {                                                                                                                                                                                                                                        
                dispatch({
                    type: BOOKING_GET_MULTIPLE,
                    payload: res.data
                })
            })
            .catch(err => {
                dispatch({
                    type : BOOKING_LOADING_ERROR,
                    payload:err
                })
            })
};
//GET SINGLE BOOKING 
export const getBooking = id => (dispatch, getState) => {
    //SET PAGE LOADING
    dispatch(
        {
        type : BOOKING_GET_ONE,
        payload: id
    });  
};
//BOOKING DELETE
export const deleteBooking = dat => (dispatch, getState) =>{
    
    params.data = dat;
    params.cat = 'deleter';
    axios.get(path, {params}, axiosConfig)
        .then(res => {
            dispatch({
                type: BOOKING_DELETE_SUCCESS,
                payload: dat.id
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_DELETE_FAIL,
                payload : err
            })
        })
        
}
//BOOKING REGISTER
export const registerBooking = data => dispatch => {
   
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: BOOKING_REGISTER_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_REGISTER_FAIL,
                payload: err
            })
        })
};
 //BOOKING UPDATE
export const updateBooking = (data) => (dispatch, getState) => {
    //body
    axios.post(path, data, axiosConfig1)
        .then(res => {
            dispatch({
                type: BOOKING_UPDATE_SUCCESS,
                payload: res.data.data
            })
        })
        .catch(err => {
            dispatch({
                type : BOOKING_UPDATE_FAIL,
                payload: err
            })
        })
};
