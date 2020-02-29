import React, {useEffect, createContext, useContext, useState} from "react";
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/Footer.js";
import Page from "views/index-sections/Page.js";
import PageIndex from "views/index-sections/PageIndex.js";
import Tutorial from '../components/Tutorial/Tutorial'
import Step1 from "../components/Form/step1";
import Step2 from "../components/Form/step2";
import Aboutus from "../components/aboutus";
import MusicPlayer from './TEST'


import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

export const AuthContext = createContext();
export const BackgroundContext = createContext();

function Index() {
    document.documentElement.classList.remove("nav-open");
    React.useEffect(() => {
        document.body.classList.add("index");
        return function cleanup() {
            document.body.classList.remove("index");
        };
    });
    const [AuthData, setAuthData] = useState('');
    const toggleAuth = (info) => {
        setAuthData(info)
    };
    const [Background, setBackground] = useState({
        backgroundRepeat: 'repeat',
        backgroundImage:
            "url(" + require("assets/img/full-bloom.png") + ")",
        overflow: 'hidden',
        position: 'relative',
        width: '100%',
    });
    return (
        <AuthContext.Provider value={{AuthData, toggleAuth: toggleAuth}}>
            <BackgroundContext.Provider value={Background}>
                <Router>
                    <IndexNavbar/>
                    <div className="main">
                        <Switch>
                            <Route exact path="/index">
                                <IndexHeader/>
                            </Route>
                            <Route exact path="/PageIndex">
                                <PageIndex/>
                            </Route>
                            <Route path="/about">

                                <Page/>
                            </Route>
                            <Route path="/craetePage" component={Step1} />
                            <Route path="/createPageStep2" component={Step2}/>
                            <Route path="/Page" component={Page}/>
                            <Route path="/Tutorial" component={Tutorial}/>
                            <Route path="/Aboutus" component={Aboutus}/>
                        </Switch>
                        <DemoFooter/>
                    </div>
                </Router>
            </BackgroundContext.Provider>
        </AuthContext.Provider>
    );
}

export default Index;
