import { useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Spinner, Image } from "react-bootstrap";
import CardPostAuthor from "../components/CardPostAuthor";

import Ctx from "../context";

const PostsAuthor = () => {
    const { posts, postsAuthor, authorPost } = useContext(Ctx);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    return (
        <Container className="p-4">
            <Row>
                <Col md={4}>
                    <Row className="card__header mb-3">
                        <Col md={1}>
                            <Image src={authorPost.avatar} height="75" rounded />
                        </Col>
                        <Col md={11}>
                            <p className="mb-1 fw-bold">{authorPost.name}</p>
                            <p className="text-black-50 mb-0">{authorPost.about}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <h2 className="text-muted mb-3">
                    Публикации автора
                </h2>
            </Row>
            {posts ?
                <>
                    <Row>
                        {postsAuthor.map((el) =>
                            <Col md={4} className="mb-4" key={el._id}>
                                <CardPostAuthor
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

export default PostsAuthor;