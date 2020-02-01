import React, {useState} from "react";
// react plugin used to create switch buttons
import {test} from "../../assets/apiManager/apiManager";
import on99 from '../../assets/img/apple-icon.png'
import UploadTheme from '../../components/Form/UploadTheme'

function SectionButtons() {
  const elements = ['one', 'two', 'three','OK'];
  return (
      <div style={{marginTop:'100px'}}>
    <ul>
      {elements.map((value, index) => {
        return <li key={index}>{value}</li>
      })}
    </ul></div>
  )
}

export default SectionButtons;
