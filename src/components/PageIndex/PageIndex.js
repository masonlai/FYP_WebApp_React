import React, {useContext, useState, useEffect} from "React";

// reactstrap components
import {Media, Row, Col, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import {getPageIndex} from "../../assets/apiManager/apiManager";
import {BackgroundContext} from '../../views'
import '../../assets/scss/paper-kit/cards/pageIndex.scss'
import { useLocation, withRouter} from "react-router-dom";

// core components

function PageIndex(props) {
    const location = useLocation();
    const key = props.location.state.key;
    const [page, setPage] = useState(props.location.state.page);
    const theme = useContext(BackgroundContext);
    const [index, setIndex] = useState('');
    const [rows, setRows] = useState('');
    useEffect(() => {
        getPageIndex(key, page).then(function (value) {
            setIndex(value);
            if (value.one.next_num != 'null') {
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
        })
    }, []);
    const handlePage = (e) => {
        e.preventDefault();
        const NewValue = e.target.getAttribute("value");
        setPage(NewValue);
        getPageIndex(key, NewValue).then(function (value) {
            setIndex(value);
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
                </PaginationItem></Pagination>)
        })

    };
    const split = (string) => {
        return string.split(" ")
    };
    return (

        <div style={theme}>
            <div className='form'>
                <div className='container'>
                    <div className='createForm'>
                        <div style={{marginTop: '3vh'}}/>
                        {Object.entries(index).map(([key, value]) => {
                            return <div className='space'>
                                <Media>
                                    <Media left href={value.portrait}>
                                        <div className='frame'>
                                            <Media className='mediaImage' object src={value.portrait}
                                                   alt="Generic placeholder image"/>
                                        </div>
                                    </Media>
                                    <Media body className='offset-lg-1'>
                                        <Row className='align-items-center'>
                                            <Col lg='6'>
                                                <Media heading className='mb-3'>
                                                    <b>{value.first_name} {value.last_name}</b>
                                                </Media>
                                                <text>
                                                    From {split(value.date_of_birth)[1]} {split(value.date_of_birth)[2]} {split(value.date_of_birth)[3]}&nbsp;
                                                    to {split(value.date_of_death)[1]} {split(value.date_of_death)[2]} {split(value.date_of_death)[3]}<br/>
                                                    nationality: {value.nationality}
                                                </text>
                                            </Col>
                                            <Col lg='6'>
                                                <text>Gender: {value.gender}<br/>Place of Birth: {value.place_of_birth}
                                                </text>
                                                <br/>
                                            </Col></Row>
                                    </Media>
                                </Media>
                            </div>
                        })}
                    </div>
                    <Col className='d-flex justify-content-lg-center'>

                        {rows}

                    </Col>
                </div>
            </div>
        </div>

    );
}

export default withRouter(PageIndex);

