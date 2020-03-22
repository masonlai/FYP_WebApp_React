import React, {useState} from 'react'

import CropperModal from './CropperThemeModal.jsx'
import {Input} from "reactstrap";
import '../../assets/scss/paper-kit/cards/CropperModal.scss'


const MAX_FILE_SIZE = 10 * 1024 * 1024; // max file size is 10mb

function UploadTheme({ parentCallback }) {

    const [hooksModalVisible, sethooksModalVisible] = useState(false);
    const [hooksModalFile, sethooksModalFile] = useState(null);
    const [hooksResultImgUrl, sethooksResultImgUrl] = useState(null);


    const handleHooksFileChange = e => {
        const file = e.target.files[0];

        if (file) {
            if (file.size <= MAX_FILE_SIZE) {
                sethooksModalFile(file);
                sethooksModalVisible(true)
            } else {
                alert('file is too big')
            }
        }
    };

    const handleGetResultImgUrl = () => blob => {
        const str = URL.createObjectURL(blob);
        sethooksResultImgUrl(str);
        parentCallback(blob)
    };

    return (
        <div className="upload">
            <div className="half-area">
                <div className='container'>
                    <div className='row'>
                        <div className='col-xs-12 m-auto'>
                            <label className="upload-input-label">
                                <i className="fa fa-upload"></i>{'  '}<span>Upload personal theme</span>
                                <Input type="file" name="file" id="exampleFile" accept="image/jpeg,image/jpg,image/png"
                                       className="base-upload-input"
                                       onChange={handleHooksFileChange}/>
                            </label></div>
                    </div>
                </div>
            </div>
            {hooksModalVisible && (
                <CropperModal
                    uploadedImageFile={hooksModalFile}
                    onClose={() => {
                        sethooksModalVisible(!hooksModalVisible)
                    }}
                    onSubmit={handleGetResultImgUrl()}
                />
            )}
        </div>
    )
}


export default UploadTheme
