import React, {useContext} from "react";
import fetch from 'isomorphic-fetch';
import theme from '../img/a.jpg'
/* http://masonlai123.pythonanywhere.com/*/
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

export const CreatePage = async (AuthData, dateOfBirth, dateOfDeath, fistName
    , lastName, gender, nationality, placeOfBirth, imageUrl, theme, personal_theme, lifeProfile, position, backgroundMusic) => {
    const formdata = new FormData();
    formdata.append("Authorization", AuthData);
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
    formdata.append("personal_theme", personal_theme);
    formdata.append("portrait_position", position);
    formdata.append("background_music", backgroundMusic);

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

export const getPageIndex = async (key, page) => {
    const settings = {
        method: 'GET',
        mode: 'cors',
    };
    const path = '/GetPageIndex/' + key + '/' + page;
    try {
        const fetchResponse = await fetch(postApi(path), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const getPageDetails = async (page) => {
    const settings = {
        method: 'GET',
        mode: 'cors',
    };
    const path = '/Page/' + page;
    try {
        const fetchResponse = await fetch(postApi(path), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const getComments = async (id, page, desc='true') => {
    const settings = {
        method: 'GET',
        mode: 'cors',
    };
    const path = '/GetComment/' + id + '/' + page + '/' + desc;
    try {
        const fetchResponse = await fetch(postApi(path), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const postComments = async (AuthData, page_id, content) => {
    const formdata = new FormData();
    formdata.append("Authorization", AuthData);
    formdata.append("page_id", page_id);
    formdata.append("content", content);
    const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors'
    };
    try {
        const fetchResponse = await fetch(postApi('/CraeteComment'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};

export const visitRecord = async (page_id, Authorization, flower) => {
    const formdata = new FormData();
    formdata.append("page_id", page_id);
    formdata.append("Authorization", Authorization);
    formdata.append("flower_name", flower);
    const settings = {
        method: 'POST',
        body: formdata,
        mode: 'cors',
    };
    try {
        const fetchResponse = await fetch(postApi('/visitRecord'), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }

};

export const getRecord = async (page_id) => {
    const settings = {
        method: 'GET',
        mode: 'cors',
    };
    const path = '/get_visitRecord/' + page_id;
    console.log(path);
    try {
        const fetchResponse = await fetch(postApi(path), settings);
        const data = await fetchResponse.json();
        return data

    } catch (e) {
        return e;
    }
};