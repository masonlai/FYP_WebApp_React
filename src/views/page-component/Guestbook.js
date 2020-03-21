/*!
this script is one of component of page
Guest book is for the user leaving comment
 */

import React, {useContext, useEffect, useState, useCallback} from "react";

import {
    Container,
    Alert,
    Card, CardImg, CardText, CardBody,
    CardTitle, Col,
    FormGroup,
    Label,
    Input,
    Form,
    Button,
    Pagination,
    PaginationItem, PaginationLink,
    Row, Modal, ModalHeader, ModalBody, ModalFooter, Spinner
} from "reactstrap";
import '../../assets/scss/paper-kit/cards/page.scss'
import {getComments} from '../../components/apiManager/apiManager'
import {postComments} from '../../components/apiManager/apiManager'
import {CommentImage} from "../../components/apiManager/apiManager";
import {CommentVideo} from "../../components/apiManager/apiManager";
import {AuthContext} from "../Indexpage";
import Cookies from 'universal-cookie';
import avatar from '../../assets/img/default-avatar.png'
import {useDropzone} from 'react-dropzone';
import Gallery from '../page-component/Gallery'

//some css for the modal which is for uploading image
const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box'
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

function Guestbook(porps) {
    const [files, setFiles] = useState([]);
    const [imageRow, setImageRow] = useState('');
    const [comments, setComments] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [rows, setRows] = useState('');
    const [Uploadedrows, setUploadedrows] = useState(false);
    const [submit, setSubmit] = useState(false);
    const [urlcount, setUrlcount] = useState(0);
    const [modalError, setModalError] = useState('');
    const [urlID, setUrlID] = useState({});
    const [urlrow, seturlrow] = useState({});
    const [urlrowError, seturlrowError] = useState({'url1': false});
    const [page, setPage] = useState(1);
    const [Descending, setDescending] = useState(true);
    const [modal, setModal] = useState(false);
    const AuthData = useContext(AuthContext);
    const cookies = new Cookies();

    //Dropzone for uploading images
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        //on images drop into dropzone, run this
        onDrop: acceptedFiles => {
            Object.entries(acceptedFiles).map(([key, value]) => {
            });
            //set preview url for the function of thumbs to use
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview_url: URL.createObjectURL(file)
            })));


        }
    });

    //image preview
    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview_url}
                    style={img}
                />
            </div>
        </div>
    ));

    //toggle modal
    const toggle = () => {
        //if open modal, reset all states.
        if (modal == false) {
            setFiles([]);
            setUrlcount(0);
            setUrlID({});
            seturlrow({});
            seturlrowError({'url1': false});
            setSubmit(false);
            setModalError('')

        }
        setModal(!modal)

    };

    //add one more info of video url
    const urladd = () => {
        setUrlID(prevState => ({...prevState, [urlcount + 1]: 'url' + (urlcount + 1)}));
        seturlrow(prevState => ({...prevState, ['url' + (urlcount + 1)]: ''}));
        seturlrowError(prevState => ({...prevState, ['url' + (urlcount + 1)]: false}));
        setUrlcount(urlcount + 1)
    };

    //handle input of url change. if change, check correction.
    const urlchange = (e) => {
        const {value} = e.target;
        const {id} = e.target;
        if (urlErrorCheck(value) == true) {
            seturlrowError({
                ...urlrowError, [id]: true
            })
        }
        if (urlErrorCheck(value) == false) {
            seturlrowError({
                ...urlrowError, [id]: false
            })
        }
        seturlrow({
            ...urlrow, [id]: value
        })

    };

    //correct youtube url should be
    const urlErrorCheck = (content) => {
        var str = content;
        var res = str.split("https://www.youtube.com/");
        if (res.length == 2) {
            return false
        } else {
            return true
        }

    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        if (files.length == 0 && typeof urlrow['url1'] == "undefined") {
            setModalError("Can't submit emtpy form")
        } else {
            try {
                Object.entries(urlrow).map(([key, value]) => {
                    if (urlErrorCheck(value) == true) {
                        throw "InvalidMonthNo"
                    }
                });
                setModal(!modal);
                setUploadedrows(true);
                setSubmit(true)
            } catch (e) {
                setModalError("URL Error")
            }
        }

    };

    useEffect(() => {
        {/* get the page's comment from backend*/}
        getComments(porps.pageID, page).then(function (value) {
            setComments(value);
            {/* if getting one or more comment, set button of pagination*/}
            if (typeof value.one != typeof undefined) {
                setRows(<Pagination>
                    <PaginationItem active>
                        <PaginationLink href="#" onClick={handlePage} value={page}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>);
                {/* if having next page, set button of next page*/}
                if (value.one.next_num != false) {
                    setRows(<Pagination>
                        <PaginationItem active>
                            <PaginationLink href="#" onClick={handlePage} value={page}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={handlePage} value={page + 1}>
                                {page + 1}
                            </PaginationLink>
                        </PaginationItem></Pagination>);
                }
            }
        });
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    const handlePage = (e) => {
        e.preventDefault();
        const NewValue = e.target.getAttribute("value");
        setPage(NewValue);
        {/*get info of next page*/}
        getComments(porps.pageID, NewValue).then(function (value) {
            setComments(value);
            {/*reset button of pagination*/
            }
            if (value.one.prev_num != null) {
                if (value.one.next_num != false) {
                    setRows(<Pagination>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={handlePage} value={NewValue - 1}>
                                {NewValue - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                            <PaginationLink href="#" onClick={handlePage} value={NewValue}>
                                {NewValue}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={handlePage} value={parseInt(NewValue) + 1}>
                                {parseInt(NewValue) + 1}
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>)
                } else {
                    setRows(<Pagination>
                        <PaginationItem>
                            <PaginationLink href="#" onClick={handlePage} value={NewValue - 1}>
                                {NewValue - 1}
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                            <PaginationLink href="#" onClick={handlePage} value={NewValue}>
                                {NewValue}
                            </PaginationLink>
                        </PaginationItem>
                    </Pagination>)
                }
            } else {
                setRows(<Pagination>
                    <PaginationItem active>
                        <PaginationLink href="#" onClick={handlePage} value={NewValue}>
                            {NewValue}
                        </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#" onClick={handlePage} value={parseInt(NewValue) + 1}>
                            {parseInt(NewValue) + 1}
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>)
            }
        })

    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        postComments(cookies.get('user').access_token, porps.pageID, comment).then(function (value) {
            let comment_id = value.id;
            Object.entries(files).map(([key, value]) => {
                CommentImage(value, comment_id)
            });
            Object.entries(urlrow).map(([key, value]) => {
                var res = value.split("https://www.youtube.com/watch?v=");
                CommentVideo(res[1], comment_id)
            })

        }).then(function (value) {
            //after uploaded all info to backend, refresh data.
            getComments(porps.pageID, 1).then(function (value) {
                setComments(value);
                setLoading(false);
                window.scrollTo(0, 0)
            })
        });
    };


    const handleChange = (e) => {
        //handle comment input. if there are something was inputted by user, there will be a button for user to upload image or video
        const {value} = e.target;
        setComment(value);

        if (value === '') {
            setImageRow('')
        } else {
            setImageRow(<div>
                <Button color="danger" onClick={toggle}>Upload image or video</Button>
            </div>)
        }
    };

    const handleOrder = (e) => {
        //if user change the order
        setDescending(!Descending);
        const order = !Descending;
        const string_order = order.toString();
        getComments(porps.pageID, page, string_order).then(function (value) {
            setComments(value);
        })
    };
    return (
        <>
            <div className='backgorund-page'>
                a
                <div className='Portfolio'>
                    <Container>
                        <div>
                            <Modal isOpen={modal} toggle={toggle}>
                                <Form>
                                    <ModalHeader toggle={toggle}><b>Photo Gallery(JPG or PNG)</b></ModalHeader>
                                    <ModalBody>

                                        <section className="container">
                                            <div {...getRootProps({className: 'dropzone'})}
                                                 style={{borderStyle: 'dashed', height: '15vh'}}>
                                                <input {...getInputProps()} />
                                                <p style={{
                                                    color: '#000000',
                                                    textAlign: 'center',
                                                    position: 'absolute',
                                                    top: '0%',
                                                    left: '50%',
                                                    transform: 'translate(-50%, 7.5vh)'
                                                }}><b>drop some files here, or click to select files</b></p>
                                            </div>
                                            <aside style={thumbsContainer}>
                                                {thumbs}
                                            </aside>
                                        </section>
                                        {modalError !== '' && <Alert color="danger">
                                            {modalError}!
                                        </Alert>}
                                        <hr style={{border: '2px solid'}}/>
                                        <h4><b>Upload video via youtube</b></h4>
                                        eg:{' '}https://www.youtube.com/watch?v=XTa0sCfc_uk
                                        {Object.entries(urlID).map(([key, value]) => {
                                            return <div>{urlrowError[value] == false ?
                                                <FormGroup className="has-success">
                                                    <Label className="control-label"><h5 style={{color: '#000'}}><b>Youtube
                                                        video Url:</b></h5></Label>
                                                    <Input type="text" name="success" id={value} onChange={urlchange}/>
                                                </FormGroup> :
                                                <FormGroup className="has-danger">
                                                    <Label for="error" className="control-label"><b>Error
                                                        Url</b></Label>
                                                    <Input type="text" name="error" id={value} onChange={urlchange}
                                                           required/>
                                                </FormGroup>
                                            }</div>

                                        })}
                                        <br/>
                                        <a onClick={urladd}>{urlcount > 0 ? <b>Add one more </b> : <b>Add Url</b>}</a>
                                    </ModalBody>
                                    <ModalFooter>
                                        <div style={{marginTop: '1vh'}}>
                                            <Button color="primary" onClick={handleModalSubmit}>Submit</Button>{' '}
                                            <Button color="secondary" onClick={toggle}>Cancel</Button>
                                        </div>
                                    </ModalFooter></Form>
                            </Modal>
                        </div>


                        <hr style={{border: '2px solid'}}/>
                        {Object.entries(comments).map(([key, value]) => {
                            return <div>
                                <Row>
                                    <Col lg='2' xs='4'>
                                        <Card>
                                            <CardImg top width="50%" src={avatar} alt="Card image cap"
                                                     style={{borderRadius: '20%'}}/>
                                            <CardBody>
                                                <CardTitle><b><h3>{value.username}</h3></b></CardTitle>
                                                <CardText>
                                                    <small className="text-muted">{value.creating_date}</small>
                                                </CardText>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <h4><b>{value.content}</b></h4>
                                    </Col>
                                </Row>
                                <div style={{maxWidth: '100%', minWidth: '100%'}}>
                                    <Gallery media={value}/>
                                </div>
                                <hr style={{border: '2px solid'}}/>
                            </div>

                        })}
                        {AuthData.AuthData ?
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="lifeProfile">Comment Box</Label>
                                    <Input type="textarea" name="lifeProfile" onChange={handleChange}
                                           required/>
                                </FormGroup>
                                {imageRow}{submit && Uploadedrows &&
                            (<div><b>Image:{files.length > 0 ? files.length : 0}<br/>
                                Video:{urlcount > 0 ? urlcount : 0}</b></div>)}
                                <Button style={{marginTop: '1vh'}} outline color="success" block>{loading ?
                                    <Spinner animation="border" variant="light"/> : 'Share'}</Button>
                            </Form> : <Alert color="warning">
                                Please login to leave message.
                            </Alert>}
                        <Input style={{marginTop: '2vh'}} type="select" name="select" onChange={handleOrder}>
                            <option>Descending by time</option>
                            <option>Ascending by time</option>
                        </Input><br/>
                        {rows}
                    </Container>
                </div>
            </div>

        </>
    );
}

export default Guestbook;
