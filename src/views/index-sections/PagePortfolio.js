import React from "react";

import {Container, Row, Col, Pagination, PaginationItem, PaginationLink} from "reactstrap";
import '../../assets/scss/paper-kit/cards/page.scss'
import SideMenu from "./SideMenu";


function PagePortfolio() {

    return (
        <>
            <div className='backgorund-page'>
                a
                <SideMenu/>
                <div className='Portfolio'>
                    <Container>
                        <Row>
                        <div className='frame mt-3 ml-3' >
                            <img className='portrait' src='http://127.0.0.1:5000/GetImage/501'/>
                        </div>
                            <Col>
                                dasdsa
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

        </>
    );
}

export default PagePortfolio;
