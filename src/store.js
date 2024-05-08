import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { applyMiddleware, createAsyncThunk } from '@reduxjs/toolkit'
import {thunk} from "redux-thunk";
import rootReducer from "./reducers";
const middleware = [thunk];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
export default store;