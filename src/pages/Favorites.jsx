import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Cardpost from "../components/Cardpost";
import Ctx from "../context";

const Favorites = () => {
    const { serverPost, userId } = useContext(Ctx);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Container className="vh-100">
            <Row>
                <h2 className="p-3 text-muted">Любимые посты</h2>
            </Row>
            <Row>
                {serverPost.filter(el => el.likes.includes(userId)).map((el) =>
                    <Col md={4} sm={4} className="mb-4" key={el._id}>
                        <Cardpost
                            {...el}
                            img={el.image}
                        />
                    </Col>)}
            </Row>
        </Container>
    )
}

export default Favorites;