/*!
this script is one of component of page
a side menu of page which is using to switch the info of page
 */

import React, {useState, useRef, useEffect} from "react";
import {Button} from "reactstrap";
import SlidingPanel from "react-sliding-side-panel";
import {
    Link
} from "react-router-dom";
import getWindowWidth from "../../assets/apiManager/getWindowWidth";

const SideMenu = (props) => {
    const [openPanel, setOpenPanel] = useState(false);
    const [size, setSize] = useState(10);
    const ref = useRef();
    const {height, width} = getWindowWidth();

    {/*if user click out side close panel*/}
    useOnClickOutside(ref, () => setOpenPanel(false));

    useEffect(() => {
        {/*Menu button depend on the width of device*/}
        if(width <575.98){
            setSize(40)
        }
    },[]);
    const side_button = {
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        borderBottomLeftRadius: 0,
        borderTopLeftRadius: 0,
    }

    return (
        <>
            <div className='sideMenubtu'>
                <div>
                    <Button style={side_button} onClick={() => setOpenPanel(true)}>
                        <div>M<br/>e<br/>n<br/>u</div>
                    </Button>
                </div>
                <SlidingPanel
                    type={'left'}
                    isOpen={openPanel}
                    size={size}
                >
                    <div className='overflow' ref={ref}>
                        <div className='sideMenu buttonTop'>
                            <text style={{color: 'white'}}>.</text>
                            <div className='buttonContainer'>
                                <Link to={`${props.url}`}><Button color="secondary" size="lg" block onClick={() => setOpenPanel(false)}
                                                        className='buttonItem'>Home</Button></Link>
                            </div>
                            <br/>
                            <div className='buttonContainer'>
                                <Link to={`${props.url}/Portfolio`}><Button color="secondary" size="lg" block onClick={() => setOpenPanel(false)}
                                                             className='buttonItem'>Portfolio</Button></Link></div>
                            <br/>
                            <div className='buttonContainer mb-5'>
                                <Link to={`${props.url}/Guestbook`}><Button color="secondary" size="lg" block onClick={() => setOpenPanel(false)}
                                                             className='buttonItem'>Guestbook</Button></Link></div>
                            <test style={{color:'white'}}>{'a'}</test>

                        </div>
                    </div>
                </SlidingPanel>
            </div>
        </>
    )
};

{/*detect if user click outside of side menu*/}
function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}

export default SideMenu;