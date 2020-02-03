import React, {useState} from "react";
import {Button} from "reactstrap";
import SlidingPanel from "react-sliding-side-panel";

const SideMenu=()=> {
    const [openPanel, setOpenPanel] = useState(false);
    return (
        <>
            <div className='sideMenubtu'>
                <div>
                    <Button className='menu' onClick={() => setOpenPanel(true)}>
                        <div>M<br/>e<br/>n<br/>u</div>
                    </Button>
                </div>
                <SlidingPanel
                    type={'left'}
                    isOpen={openPanel}
                    size={8}
                >
                    <div className='overflow'>
                        <div className='sideMenu buttonTop'>
                            <Button outline color="secondary" size="lg" className='buttonItem'>Home</Button>
                            <br/>
                            <Button outline color="secondary" size="lg" className='buttonItem'>Portfolio</Button>
                            <br/>
                            <Button outline color="secondary" size="lg" className='buttonItem'>Guestbook</Button>
                            <br/>
                            <Button outline color="secondary" size="lg" className='buttonItem'
                                    onClick={() => setOpenPanel(false)}>close</Button>
                        </div>
                    </div>
                </SlidingPanel>
            </div>
        </>
    )
};

export default SideMenu;