import React, {useEffect, createContext, useContext, useState} from "react";

// reactstrap components

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import DemoFooter from "components/Footers/Footer.js";

// index sections
import SectionButtons from "views/index-sections/SectionButtons.js";
import SectionCarousel from "views/index-sections/SectionCarousel.js";
import SectionDark from "views/index-sections/SectionDark.js";
import SectionDownload from "views/index-sections/SectionDownload.js";
import SectionExamples from "views/index-sections/SectionExamples.js";
import SectionJavaScript from "views/index-sections/SectionJavaScript.js";
import SectionLogin from "views/index-sections/SectionLogin.js";
import SectionNavbars from "views/index-sections/SectionNavbars.js";
import SectionNavigation from "views/index-sections/SectionNavigation.js";
import SectionNotifications from "views/index-sections/SectionNotifications.js";
import SectionNucleoIcons from "views/index-sections/SectionNucleoIcons.js";
import SectionProgress from "views/index-sections/SectionProgress.js";
import SectionTypography from "views/index-sections/SectionTypography.js";
import CreatePage from "../views/examples/CreatePage";

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
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
                            <Route exact path="/index1">
                                <CreatePage/>
                            </Route>
                            <Route path="/about">
                                <SectionButtons/>
                                <SectionCarousel/>
                                <SectionDark/>
                                <SectionDownload/>
                                <SectionExamples/>
                                <SectionJavaScript/>
                                <SectionLogin/>
                                <SectionNavbars/>
                                <SectionNavigation/>
                                <SectionNotifications/>
                                <SectionNucleoIcons/>
                                <SectionProgress/>
                                <SectionTypography/>
                            </Route>
                            <Route path="/craeting_webpage">
                                <SectionButtons/>
                                <SectionCarousel/>
                                <SectionDark/>
                                <SectionDownload/>
                                <SectionExamples/>
                                <SectionJavaScript/>
                                <SectionLogin/>
                                <SectionNavbars/>
                                <SectionNavigation/>
                                <SectionNotifications/>
                                <SectionNucleoIcons/>
                                <SectionProgress/>
                                <SectionTypography/>
                            </Route>
                        </Switch>
                        <DemoFooter/>
                    </div>
                </Router>
            </BackgroundContext.Provider>
        </AuthContext.Provider>
    );
}

export default Index;
