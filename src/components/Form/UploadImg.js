import React, {useState} from 'react'

import CropperModal from '../Modal/CropperModal.jsx'
import {Button, Card, Form, Input, Container, Row, Col, Label} from "reactstrap";
import '../../assets/scss/paper-kit/cards/CropperModal.scss'
import {useHistory} from "react-router-dom";


const MAX_FILE_SIZE = 10 * 1024 * 1024 // max file size is 10mb

function UploadImg({ parentCallback }) {
    let history = useHistory();
    const [hooksModalVisible, sethooksModalVisible] = useState(false);
    const [hooksModalFile, sethooksModalFile] = useState(null);
    const [hooksResultImgUrl, sethooksResultImgUrl] = useState(null);


    const handleHooksFileChange = e => {
        const file = e.target.files[0]

        if (file) {
            if (file.size <= MAX_FILE_SIZE) {
                sethooksModalFile(file)
                sethooksModalVisible(true)
            } else {
                console.log('file is too big')
            }
        }
    }

    const handleGetResultImgUrl = () => blob => {
        const str = URL.createObjectURL(blob)
        sethooksResultImgUrl(str)
        parentCallback(blob)
    }

    return (
        <div className="upload">
            <div className="half-area">
                <div className='container'>
                    <div className='row'><div className=' offset-lg-1 col-lg-5 col-xs-12 '>
                    <div className="img-container">
                            <div className="frame m-auto">
                                {hooksResultImgUrl && (
                                    <img
                                        className='img'
                                        id='img'
                                        src={hooksResultImgUrl}
                                        alt="classResultImgUrl"
                                    />
                                )}</div>
                        </div></div>
                        <div className='col-xs-12 m-auto'>
                            <label className="upload-input-label">
                                <i className="fa fa-cut"></i>{'  '}<span>Select portrait</span>
                                <Input type="file" name="file" id="exampleFile" accept="image/jpeg,image/jpg,image/png"
                                       className="base-upload-input"
                                       onChange={handleHooksFileChange} required/>
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


export default UploadImg
