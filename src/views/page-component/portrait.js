/*!
this script is one of component of page
portrait
 */

import React from "react";

function Portrait(props) {

    return (
        <>>
            <div className={'frame-bigger'+' '+props.position+'-page'}>
                <img className='portrait' src={props.src}/>
            </div>

        </>
    );
}

export default Portrait;
