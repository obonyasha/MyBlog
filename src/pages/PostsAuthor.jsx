import { useContext } from "react";
import { Col, Container, Row, Spinner, Image } from "react-bootstrap";
import Cardpost from "../components/Cardpost";

import Ctx from "../context";

const PostsAuthor = () => {
    const { posts, postsAuthor, authorPost } = useContext(Ctx);

    return (
        <Container className="p-4">
            <Row>
                <Col md={4}>
                    <Row>
                        <h2 className="text-muted">
                            Публикации {authorPost.name}
                        </h2>
                    </Row>
                    <Row className="card__header">
                        <Col md={1}>
                            <Image src={authorPost.avatar} height="75" rounded />
                        </Col>
                        <Col md={11}>
                            {/* <p className="mb-1 fw-bold">{authorPost.name}</p> */}
                            <p className="text-black-50 mb-0">{authorPost.about}</p>
                        </Col>
                    </Row>
                </Col>
            </Row>

            {posts ?
                <>
                    <Row>
                        {postsAuthor.map((el) =>
                            <Col md={4} className="mb-4" key={el._id}>
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

export default PostsAuthor;