/*!
*This is index of deceased page.
*importing the page-component make it work
 */
import React, {useContext, useEffect, useState} from "react";
import SideMenu from "../page-component/SideMenu";
import Portrait from "../page-component/portrait";
import Tombstone from "../page-component/Tombstone";
import Portfolio from "../page-component/Portfolio";
import Guestbook from "../page-component/Guestbook";
import MusicPlayer from '../page-component/BackgroundMusic'
import {getPageDetails} from "../../assets/apiManager/apiManager"
import {getRecord} from "../../assets/apiManager/apiManager"
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import {AuthContext} from "../Index";

function Page(props) {
    const auth = useContext(AuthContext);
    const [details, setDetails] = useState('');
    const [deathday, setDeathday] = useState('');
    const [birthday, setBirthday] = useState('');
    const [record, setRecord] = useState('');
    const [background, setBackground] = useState({
        backgroundColor: '#cccccc',
        height: '100VH',
        width: '100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
    });

    useEffect(() => {
        {/* getPageDetails is a fetch script for sending post request to backend server and get the details of page */
        }
        getPageDetails(props.location.state.id).then(function (value) {
            setDetails(value);
            setDeathday(split(value.date_of_death)[1] + ' ' + split(value.date_of_death)[2] + ' ' + split(value.date_of_death)[3]);
            setBirthday(split(value.date_of_birth)[1] + ' ' + split(value.date_of_birth)[2] + ' ' + split(value.date_of_birth)[3]);
            setBackground({
                backgroundColor: '#cccccc',
                height: '100VH',
                width: '100%',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'relative',
                backgroundImage: 'url("' + value.theme + '")'
            })
        });
        getRecord(props.location.state.id).then(function (value) {
            {/*getting visited record from server. */
            }
            setRecord(value)
        })
    }, []);
    const split = (string) => {
        return string.split(" ")
    };

    const refresh = (id) => {
        getRecord(id).then(function (value) {
            console.log(value);
            setRecord(value)
        })
    };
    return (
        <>
            <Router>
                <div style={background}>
                    <SideMenu/>
                    {details.Music != null &&
                    <MusicPlayer icon={details.Music_icon} music={details.Music}/>
                    }
                    <Switch>
                        <Route exact path="/Page">
                            a
                            <Portrait src={details.portrait} position={details.portrait_position}/>
                        </Route>
                        <Route path="/portfolio">
                            <Portfolio name={details.first_name + ' ' + details.last_name}
                                       birthday={birthday}
                                       lifeProfile={details.life_profile}
                                       deathday={deathday}
                                       nationality={details.nationality}
                                       placeOfBirth={details.place_of_birth}
                                       gender={details.gender}
                                       portrait={details.portrait}/>
                        </Route>
                        <Route path="/guestbook">
                            <Guestbook pageID={props.location.state.id}/>
                        </Route>
                    </Switch>
                </div>
                <Tombstone name={details.first_name + ' ' + details.last_name} birthday={birthday} deathday={deathday}
                           record={record} flowerBase={details.flower_url_base} pageId={props.location.state.id} refresh={refresh}/>
            </Router>
        </>
    )
        ;
}

export default Page;
