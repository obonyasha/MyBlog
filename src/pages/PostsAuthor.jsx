import { useContext } from "react";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import Cardpost from "../components/Cardpost";

import Ctx from "../context";

const Line = () => {
    const { posts } = useContext(Ctx);

    return (
        <Container className="p-4">
            {posts ?
                <>
                    <Row>
                        {posts.setDataPerPage().map((el) =>
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
        </Container>
    )
}

export default Line;