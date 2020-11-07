import axios from "axios";
import {
    TRANSACTION_DEPOSIT_REQUEST,
    TRANSACTION_DEPOSIT_SUCCESS,
    TRANSACTION_DEPOSIT_FAIL,
    TRANSACTION_WITHDRAWAL_REQUEST,
    TRANSACTION_WITHDRAWAL_SUCCESS,
    TRANSACTION_WITHDRAWAL_FAIL,
    TRANSACTION_TRANSFER_REQUEST,
    TRANSACTION_TRANSFER_SUCCESS,
    TRANSACTION_TRANSFER_FAIL,
    TRANSACTION_SALDO_REQUEST,
    TRANSACTION_SALDO_SUCCESS,
    TRANSACTION_SALDO_FAIL,
} from "../constants/transactionConstants";
import { logout } from './userActions';

export const deposit = (accountDeposit, amountDeposit, descDeposit) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_DEPOSIT_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "applictaion/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("/api/v1/deposit", {
            transaction_type: 1,
            trancastion_description: descDeposit,
            sender: parseInt(accountDeposit),
            recipient: parseInt(accountDeposit),
            timestamp: Date.now(),
            amount: parseInt(amountDeposit)
        }, config)
        dispatch({
            type: TRANSACTION_DEPOSIT_SUCCESS,
            playload: data,
        })
        dispatch(saldo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_DEPOSIT_FAIL,
            playload: message,
        })
    }
};

export const deposit = (accountWithdrawal, amountWithdrawal, descWithdrawal) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_WITHDRAWAL_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "applictaion/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("/api/v1/withdrawal", {
            transaction_type: 1,
            trancastion_description: descWithdrawal,
            sender: parseInt(accountWithdrawal),
            recipient: parseInt(accountWithdrawal),
            timestamp: Date.now(),
            amount: parseInt(amountWithdrawal),
        }, config)
        dispatch({
            type: TRANSACTION_WITHDRAWAL_SUCCESS,
            playload: data,
        })
        dispatch(saldo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_WITHDRAWAL_FAIL,
            playload: message,
        })
    }
};

export const deposit = (accountTransfer, amountTransfer, descTransfer) => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_TRANSFER_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                "Content-Type": "applictaion/json",
                Authorization: `${token}`,
            },
        };
        const { data: { data } } = await axios.post("/api/v1/transfer", {
            transaction_type: 1,
            trancastion_description: descTransfer,
            sender: parseInt(accountTransfer),
            recipient: parseInt(accountTransfer),
            timestamp: Date.now(),
            amount: parseInt(amountTransfer),
        }, config)
        dispatch({
            type: TRANSACTION_TRANSFER_SUCCESS,
            playload: data,
        })
        dispatch(saldo())
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_TRANSFER_FAIL,
            playload: message,
        })
    }
};

export const saldo = () => async(dispatch, getState) => {
    try {
        dispatch({
            type: TRANSACTION_SALDO_REQUEST,
        })

        const {
            userLogin: { token },
        } = getState()

        const config = {
            headers: {
                Authorization: `${token}`,
            },
        }
        const { data: { data } } = await axios.post(`/api/v1/account`, config)
        dispatch({
            type: TRANSACTION_SALDO_SUCCESS,
            playload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message ?
            error.response.data.message :
            error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: TRANSACTION_SALDO_FAIL,
            playload: message,
        })
    }
};