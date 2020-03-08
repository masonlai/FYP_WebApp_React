/*!
this script is one of component of page
Guest book is for the user leaving comment
 */

import React, {useContext, useEffect, useState} from "react";

import {
    Container,
    Alert,
    Table,
    FormGroup,
    Label,
    Input,
    Form,
    Button,
    Pagination,
    PaginationItem, PaginationLink
} from "reactstrap";
import '../../assets/scss/paper-kit/cards/page.scss'
import {getComments} from '../../assets/apiManager/apiManager'
import {postComments} from '../../assets/apiManager/apiManager'
import {AuthContext} from "../Indexpage";
import Cookies from 'universal-cookie';


function Guestbook(porps) {
    const AuthData = useContext(AuthContext);
    const [comments, setComments] = useState('');
    const [comment, setComment] = useState('');
    const [rows, setRows] = useState('');
    const [page, setPage] = useState(1);
    const [Descending, setDescending] = useState(true);
    const cookies = new Cookies();

    useEffect(() => {
        {/* get the page's comment from backend*/
        }
        getComments(porps.pageID, page).then(function (value) {
            setComments(value);
            {/* if getting one or more comment, set button of pagination*/
            }
            if (typeof value.one != typeof undefined) {
                setRows(<Pagination>
                    <PaginationItem active>
                        <PaginationLink href="#" onClick={handlePage} value={page}>
                            {page}
                        </PaginationLink>
                    </PaginationItem>
                </Pagination>);
                {/* if having next page, set button of next page*/
                }
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
        })
    }, []);

    const handlePage = (e) => {
        e.preventDefault();
        const NewValue = e.target.getAttribute("value");
        setPage(NewValue);
        {/*get info of next page*/
        }
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
        postComments(cookies.get('user').access_token, porps.pageID, comment).then(function (value) {
            getComments(porps.pageID, 1).then(function (value) {
                setComments(value)
            })
        });
    };
    const handleChange = (e) => {
        const {value} = e.target;
        setComment(value);
    };
    const handleOrder = (e) =>{
        setDescending(!Descending);
        const order = !Descending;
        const string_order = order.toString();
        console.log(string_order);
        getComments(porps.pageID, page, string_order).then(function (value) {
            setComments(value);
        console.log(value)})
    };
    return (
        <>
            <div className='backgorund-page'>
                a
                <div className='Portfolio'>
                    <Container>
                        <Table striped>
                            <thead>
                            <tr>
                                <th>User</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {Object.entries(comments).map(([key, value]) => {
                                return <tr>
                                    <th scope="row">{value.username}</th>
                                    <td>{value.content}</td>
                                </tr>
                            })}
                            </tbody>
                        </Table>
                        {AuthData.AuthData ?
                            <Form onSubmit={handleSubmit}>
                                <FormGroup>
                                    <Label for="lifeProfile">Comment Box</Label>
                                    <Input type="textarea" name="lifeProfile" onChange={handleChange}
                                           required/>
                                </FormGroup>
                                <Button outline color="success" block>Share</Button>
                            </Form> : <Alert color="warning">
                                Please login to leave message.
                            </Alert>}
                        <Input type="select" name="select" onChange={handleOrder}>
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
