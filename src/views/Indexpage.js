import React, {createContext, useState} from "react";
//import component
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import IndexHeader from "../components/Headers/IndexHeader.js";
import DemoFooter from "../components/Footers/Footer.js";
import Page from "./Page/Page.js";
import PageIndex from "./Page/PageIndex.js";
import Tutorial from '../components/Tutorial/Tutorial'
import Step1 from "../components/CreatePageForm/step1";
import Step2 from "../components/CreatePageForm/step2";
import Aboutus from "../components/aboutus";

import backgroundimage from '../assets/img/full-bloom.png'
//using cookies to save info of user who was login
import Cookies from 'universal-cookie';

import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {Login} from "../components/apiManager/apiManager";

export const AuthContext = createContext();
export const BackgroundContext = createContext();


function Indexpage() {
    document.documentElement.classList.remove("nav-open");

    //useEffect will run once when start application
    React.useEffect(() => {
        //if there are cookies, tell the app that user was logged in
        if (cookies.get('user')) {
            setAuthData(true)
        }
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });

    const cookies = new Cookies();

    function Logined(newValue) {
        cookies.set('user', newValue, {path: '/'});
    }

    const [AuthData, setAuthData] = useState(false);

    const toggleAuth = (info) => {
        Logined(info)
        setAuthData(true)
    };
    const logout = () => {
        setAuthData(false)
        cookies.remove('user', {path: '/'});
    }

    const refresh = () => {
        Login((cookies.get('user')).username, (cookies.get('user')).password).then(function (value) {
            setAuthData(false)
            cookies.remove('user', {path: '/'});
            Logined(value)
            setAuthData(true)
        })
    }
    const [Background, setBackground] = useState({
        backgroundRepeat: 'repeat',
        backgroundImage:
            "url(" + backgroundimage + ")",
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    });
    return (
        <AuthContext.Provider value={{AuthData, toggleAuth: toggleAuth, logout: logout, refresh: refresh}}>
            <BackgroundContext.Provider value={Background}>
                <Router>
                    <IndexNavbar/>
                    <div className="main">
                        <Switch>
                            <Route exact path="/index">
                                <IndexHeader/>
                            </Route>
                            <Route exact path="/PageIndex/:key/:page">
                                <PageIndex/>
                            </Route>
                            <Route path="/about">
                                <Page/>
                            </Route>
                            <Route path="/craetePage" component={Step1}/>
                            <Route path="/createPageStep2" component={Step2}/>
                            <Route path="/Page/:id" component={Page}/>
                            <Route path="/Tutorial" component={Tutorial}/>
                            <Route path="/Aboutus" component={Aboutus}/>
                            <Route component={IndexHeader}/>
                        </Switch>
                        <DemoFooter/>
                    </div>
                </Router>
            </BackgroundContext.Provider>
        </AuthContext.Provider>
    );
}

export default Indexpage;
