import { useContext } from "react";
import { Col, Container, Row, Spinner, Button } from "react-bootstrap";
import Cardpost from "../components/Cardpost";

import Ctx from "../context";

const PostsAuthor = () => {
    const { posts, author } = useContext(Ctx);
    const postsAuthor = posts.filter(el => el.author._id === author._id)
    return (
        <Container className="p-4">
            {posts ?
                <>
                    <Row>
                        {postsAuthor.map((el) =>
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

export default PostsAuthor;