import { useContext } from "react";

import { Col, Container, Row } from "react-bootstrap";
import Cardpost from "../components/Cardpost";

import Ctx from "../context";

const Line = () => {
    const { posts } = useContext(Ctx);
    return (
        <Container className="p-4">
            <Row>
                {posts.map((el) =>
                    <Col md={4} className="mb-4" key={el._id}>
                        <Cardpost                            
                            {...el}
                            img={el.image}
                        />
                    </Col>)}
            </Row>
        </Container>
    )
}

export default Line;