import React from "react";
import fetch from 'isomorphic-fetch';

let postApi = (path) => {
    return 'http://127.0.0.1:5000'+path;
};

export const Login = async (username, password) => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    const settings = {
        method: 'POST',
        body:formdata,
        mode: 'cors'
    };
    try {
        const fetchResponse = await fetch(postApi('/login'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
}