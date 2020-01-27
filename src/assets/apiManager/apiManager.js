import React from "react";
import fetch from 'isomorphic-fetch';
import theme from '../img/a.jpg'

let postApi = (path) => {
    return 'http://127.0.0.1:5000' + path;
};

export const Login = async (username, password) => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors'
    };
    try {
        const fetchResponse = await fetch(postApi('/login'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const Signup = async (username, password, email, religion) => {
    const formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("email", email);
    formdata.append("religion", religion);
    const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors'
    };
    try {
        const fetchResponse = await fetch(postApi('/registration'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const CreatePage = async (dateOfBirth, dateOfDeath, fistName
    , lastName, gender, nationality, placeOfBirth, imageUrl,theme, lifeProfile, position) => {
    const formdata = new FormData();
    formdata.append("first_name", fistName);
    formdata.append("last_name", lastName);
    formdata.append("gender", gender);
    formdata.append("date_of_birth", dateOfBirth);
    formdata.append("date_of_death", dateOfDeath);
    formdata.append("place_of_birth", placeOfBirth);
    formdata.append("nationality", nationality);
    formdata.append("life_profile", lifeProfile);
    formdata.append("portrait", imageUrl);
    formdata.append("theme", theme);
    formdata.append("portrait_position", position);

    const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors',
    };
    try {
        const fetchResponse = await fetch(postApi('/CreatingPage'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};


export const test = async (file) => {
    const formdata = new FormData();

    formdata.append("file", file);
   const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors',
    };
    try {
        const fetchResponse = await fetch(postApi('/test'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }

};
