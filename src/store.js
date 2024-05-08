import { createStore } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { applyMiddleware, createAsyncThunk } from '@reduxjs/toolkit'
import rootReducer from "./reducers";
const middleware = [createAsyncThunk];
const store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);
export default store;