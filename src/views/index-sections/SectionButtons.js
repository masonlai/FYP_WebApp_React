import React, {useState} from "react";
// react plugin used to create switch buttons
import {test} from "../../assets/apiManager/apiManager";
import on99 from '../../assets/img/apple-icon.png'
import UploadImg from '../../components/Form/UploadImg'

function SectionButtons() {
    const [imageUrl, setImageUrl] = useState('');
    const [a, setA] = useState('');
    const callback = (hooksResultImgUrl) => {
        setImageUrl(hooksResultImgUrl)
    };

    const uploadChange = () => {
        var reader = new FileReader();
        reader.readAsDataURL(imageUrl);
        reader.onloadend = function () {
            var base64data = reader.result;
            setA(base64data);
          test(a)
        }
    };
    return (
        <>
            <UploadImg parentCallback={callback}/>
            <button onClick={uploadChange}>dasd
            </button>
        </>
    );
}

export default SectionButtons;
