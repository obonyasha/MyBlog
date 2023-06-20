import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, NavLink, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";

import { Heart, SendCheck } from "react-bootstrap-icons";
import Ctx from "../context";
import ModalEditPost from "../components/ModalEditPost";



const Post = () => {
    const { groupId, token, userId, setServerPost, setModalEditPost } = useContext(Ctx);
    const [post, setPost] = useState(null);
    const [text, setText] = useState("");
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
                console.log(data);
                setPost(data);
                return data
            })
    }, [groupId, id, token]);

    const clearForm = () => {
        setText("");
    }

    const updPost = () => {
        setModalEditPost(true)
    }

    // const addComment = (e) => {
    //     e.preventDefault();
    //     let body = {
    //         text: text
    //     }
    //     fetch(`https://api.react-learning.ru/v2/${groupId}/posts/comment/${id}`, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization": `Bearer ${token}`
    //         },
    //         body: JSON.stringify(body)
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // setServerPost(old => {
    //             //     const arr = old.map(el => {
    //             //         if (el._id === id) {
    //             //             return data;
    //             //         } else {
    //             //             return el
    //             //         }
    //             //     });
    //             //     return arr;
    //             // });
    //             setPost(data);
    //         })
    //     clearForm();
    // }

    return (
        <Container className="p-4">
            <Row className="mb-3">
                <NavLink onClick={() => navigate(-1)} className="text-black-50">
                    &nbsp;Назад
                </NavLink>
            </Row>
            {post ?
                <>
                    <Row>
                        <Col md={7}>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Image src={post.image} alt="Картинка" className="mw-100" rounded />
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            <Row className="mb-3 p-0 card__header">
                                <Col md={2}>
                                    {/* <Link to="/profile" title="Посты автора"> */}
                                    <Image src={post.author.avatar} height="50" rounded />
                                    {/* </Link> */}
                                </Col>
                                <Col md={10}>
                                    <h5 className="mb-1">{post.author.name}</h5>
                                    <p className="text-black-50 mb-0">{post.created_at.slice(0, 10)}</p>
                                </Col>
                            </Row>
                            <Row className="mb-3">
                                <Col md={2}>
                                    <Heart />
                                </Col>
                            </Row>
                            {post.author._id === userId &&
                                <>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Row><Button variant="outline-secondary"
                                                onClick={updPost}
                                            >Изменить пост</Button></Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Row><Button variant="outline-danger">Удалить пост</Button></Row>
                                        </Col>
                                    </Row>
                                </>
                            }
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <h3>
                            {post.title}
                        </h3>
                    </Row>
                    <Row className="mb-3" >
                        <div className="mw-100 mh-100 bloge__text_img" dangerouslySetInnerHTML={{ __html: post.text }}></div>
                        {/* <p className="lh-base">{post.text}</p> */}
                    </Row>
                    <Row className="mb-3">
                        <Row className="mb-3">
                            <h3>Коментарии</h3>
                        </Row>
                        <Row className="mb-3">
                            <Col md={8}>
                                <Form>
                                    <InputGroup className="mb-3">
                                        <Form.Control type="texarea"
                                            placeholder="Комментировать"
                                            value={text}
                                            onChange={(e) => setText(e.target.value)} />
                                        <Button variant="outline-secondary"
                                            title="Отправить"
                                        // onClick={addComment}
                                        >
                                            <SendCheck />
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                        {(post.comments.length > 0) ?
                            post.comments.map(el =>
                                <Row key={el._id} className="mb-3">
                                    <Row className="mb-3 w-50 card__header">
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
                </>
                : <Spinner animation="border" />}
            <ModalEditPost />
        </Container>
    )
}




export default Post;