import { combineReducers } from 'redux';

import booking from "./booking";
import client from "./client";
import inventorycategory from "./inventorycategory";
import inventorytransaction from "./inventorytransaction";
import inventorytype from "./inventorytype";
import maintenancecategory from "./maintenancecategory";
import maintenancetransaction from "./maintenancetransaction";
import maintenancetype from "./maintenancetype";
import room from "./room";
import roomcategory from "./roomcategory";
import roominventory from "./roominventory";
import roomtype from "./roomtype";
import roomtransaction from "./roomtransaction";
import usercategory from "./usercategory";
import usertransaction from "./usertransaction";
import usertype from "./usertype";
import user from "./user";

export default combineReducers({
    bookingReducer: booking,
    clientReducer: client,
    inventorycategoryReducer: inventorycategory,
    inventorytransactionReducer: inventorytransaction,
    inventorytypeReducer: inventorytype,
    maintenancecategoryReducer: maintenancecategory,
    maintenancetransactionReducer: maintenancetransaction,
    maintenancetypeReducer: maintenancetype,
    roomReducer: room,
    roomcategoryReducer: roomcategory,
    roomtransactionReducer: roomtransaction,
    roomtypeReducer: roomtype,
    roominventoryReducer: roominventory, 
    usercategoryReducer: usercategory,
    usertransactionReducer: usertransaction,
    usertypeReducer: usertype,
    userReducer: user
});