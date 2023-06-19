import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Image, NavLink, Col, Button, Form, InputGroup } from "react-bootstrap";

import Ctx from "../context";
import { SendCheck } from "react-bootstrap-icons";



const Post = () => {
    const { groupId, token } = useContext(Ctx);
    const [post, setPost] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data.err);
                setPost(data);
                console.log(post);
            })
    }, []);

    return (
        <Container className="p-4">
            <Row className="mb-3">
                <NavLink onClick={() => navigate(-1)} className="text-black-50">
                    &nbsp;Назад
                </NavLink>
            </Row>
            <Row className="mb-3">
                <Col md={1}>
                    <Image src={post.author.avatar} height="50" />
                </Col>
                <Col md={11}>
                    <h5 className="mb-1">{post.author.name}</h5>
                    <p className="text-black-50 mb-0">{post.created_at.slice(0, 10)}</p>
                </Col>
            </Row>
            <Row className="mb-3">
                <h1>
                    {post.title}
                </h1>
            </Row>
            <Row className="mb-3">
                <Col md={8}>
                    <Image src={post.image} rounded />
                </Col>
            </Row>
            <Row className="mb-3">
                <p className="lh-base">{post.text}</p>
            </Row>
            <Row className="mb-3">
                <Row className="mb-3">
                    <h3>Коментарии</h3>
                </Row>
                <Row className="mb-3">
                    <Col md={8}>
                        <Form>
                            <InputGroup className="mb-3">
                                    <Form.Control type="texarea" placeholder="Комментировать" />
                                    <Button variant="outline-secondary" title="Отправить">
                                        <SendCheck />
                                    </Button>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
                {(post.comments.length > 0) ?
                    post.comments.map(el =>
                        <Row key={el._id} className="mb-3">
                            <Row className="mb-3">
                                <Col md={1} className="position-relative">
                                    <Image src={el.author.avatar} height="50" rounded />
                                </Col>
                                <Col md={11}>
                                    <h5 className="mb-1">{el.author.name}</h5>
                                    <p className="text-black-50 mb-0">{el.created_at.slice(0, 10)}</p>
                                </Col>
                            </Row>
                            <p>{el.text}</p>
                        </Row>
                    )
                    :
                    <Row>
                        <p>Пока здесь нет коментариев</p>
                    </Row>
                }
            </Row>
        </Container>
    )
}

export default Post;