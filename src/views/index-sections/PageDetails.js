import React, {useState} from "react";
import SideMenu from "./SideMenu";


function PageDetails() {
    const [portrait, setPortrait] = useState(
        {marginTop: '25vh', marginLeft: '20vh'}
    );
    return (
        <>
            <div className='backgorund-page'>
                a
                    <SideMenu/>

                <div className='frame-bigger' style={portrait}>

                    <img className='portrait' src='http://127.0.0.1:5000/GetImage/501'/>
                </div>
            </div>
            <div>
            <div className='rounded mx-auto d-block tombstoneBackGround' style={{backgroundImage:
                        "url(" + require("assets/img/tombstone.png") + ")"}}>
                a
                <div className='font'><h1><b>Xi Jin Ping</b></h1></div>
                <div className='date'><h1><b>2020-01-01</b></h1></div>
                                <div className='to'>TO</div>
                <div className='date'><h1><b>2020-01-01</b></h1></div>

            </div></div>
        </>
    );
}

export default PageDetails;
