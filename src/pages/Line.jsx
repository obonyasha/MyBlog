import { useContext, useEffect } from "react";
import usePagination from "../hooks/usePagination";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import Cardpost from "../components/Cardpost";
import Pagination from "../components/Pagination";

import Ctx from "../context";


const Line = () => {
    const { posts } = useContext(Ctx);
    const paginate = usePagination(posts, 20);


    useEffect(() => {
        paginate.step(1);
    }, [posts])

    return (
        <Container className="p-4 h-100">
            <Row className="mb-4">
                <Pagination hk={paginate} />
            </Row>
            {posts ?
                <>
                    <Row>
                        {paginate.setDataPerPage().map((el) =>
                            <Col md className="mb-4" key={el._id}>
                                <Cardpost
                                    {...el}
                                    img={el.image}
                                />
                            </Col>)}
                    </Row>
                </> :
                <Spinner animation="border" />
            }
            <Row className="mb-4">
                <Pagination hk={paginate} />
            </Row>
        </Container>
    )
}

export default Line;