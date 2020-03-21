import React, {useState, useEffect, useCallback, useRef} from 'react'
import PropTypes from 'prop-types'

import Cropper from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import {Button, Col,} from "reactstrap";
import '../../assets/scss/paper-kit/cards/CropperModal.scss'

function HooksCropperModal({uploadedImageFile, onClose, onSubmit}) {
    const [src, setSrc] = useState(null);
    const cropperRef = useRef(null);

    useEffect(() => {
        const fileReader = new FileReader();
        fileReader.onload = e => {
            const dataURL = e.target.result;
            setSrc(dataURL)
        };

        fileReader.readAsDataURL(uploadedImageFile)
    }, [uploadedImageFile]);

    const handleSubmit = useCallback(() => {
        // let filename = uploadedImageFile.name

        console.log('Uploading');
        cropperRef.current.getCroppedCanvas().toBlob(async blob => {
            onSubmit(blob);
            onClose()
        })
    }, [onClose, onSubmit]);
    const close = () => {
        onClose()
    };

    return (
        <div className="hooks-cropper-modal" style={{zIndex: '50'}}>
            <div className="modal-panel">
                <div className="cropper-container-container">
                    <div className="cropper-container">
                        <Cropper
                            src={src}
                            className="cropper"
                            ref={cropperRef}
                            viewMode={1}
                            zoomable={false}
                            aspectRatio={1.7}
                            guides={false}
                            preview=".cropper-preview"
                        />
                    </div>
                    <Col className='d-none d-sm-block'>
                        <div className="preview-container">
                            <div className="cropper-preview"/>
                        </div>
                    </Col>
                </div>
                <div className="button-row mt-2">
                    <div style={{paddingRight: '3vh'}}>
                        <Button outline color="danger" onClick={close}>Cancel</Button></div>
                    <div style={{paddingLeft: '3vh'}}>
                        <Button outline color="success" onClick={handleSubmit}>Submite</Button></div>
                </div>
            </div>
        </div>
    )
}

HooksCropperModal.propTypes = {
    uploadedImageFile: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
};

export default HooksCropperModal
