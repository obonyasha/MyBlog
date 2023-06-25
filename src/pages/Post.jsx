import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, NavLink, Row, Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

import { Heart, HeartFill, SendCheck } from "react-bootstrap-icons";
import Ctx from "../context";
import ModalEditPost from "../components/ModalEditPost";
import updLike from "../utils/updLike";
import updPost from "../utils/updPost";
import delPost from "../utils/delPost";



const Post = () => {
    const { groupId,
        token,
        userId,
        setServerPost,
        setModalEditPost,
        setAuthorPost,
        setPostsAuthor,
        posts } = useContext(Ctx);
    const [post, setPost] = useState(null);
    const [text, setText] = useState("");
    const [comments, setComments] = useState([]);
    const [isLike, setIsLike] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    // const datePublic = new Date(post.created_at).toLocaleDateString();


    useEffect(() => {
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data, data.err);
                setPost(data);
                setIsLike(data.likes.includes(userId));
                // setAuthor(data.author._id);
                return data
            })
    }, [token]);

    const clearForm = () => {
        setText("");
    }

    useEffect(() => {
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/comments/${id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setComments(data);
            })
    }, [post])

    const addComment = (e) => {
        e.preventDefault();
        let body = {
            text: text
        }
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/comments/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
        clearForm();
    }

    const delComment = (idCom) => {
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/comments/${id}/${idCom}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
            .then(res => res.json())
            .then(data => {
                setPost(data);
            })
    }

    const allPostsAuthor = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setAuthorPost(post.author);
        setPostsAuthor(posts.filter(el => el.author._id === post.author._id));
        navigate(`/posts/${post.author.name}`)
    }

    return (
        <Container className="p-4">
            <Row className="mb-3">
                <NavLink onClick={() => navigate(-1)} className="text-black-50">
                    &nbsp;Назад
                </NavLink>
            </Row>
            {post ?
                <>
                    <Button className="text-dark text-start transition rounded-2 mb-3"
                        title="Все посты автора"
                        variant="link"
                        onClick={(e) => allPostsAuthor(e)}>
                        <Row className="">
                            <Col md={3} className="me-3">
                                <Image src={post.author.avatar} height="25" rounded />
                            </Col>
                            <Col md={5} className="fw-bold fs-6">
                                {post.author.name}
                            </Col>
                        </Row>
                    </Button>
                    <Row>
                        <Col md={7}>
                            <Row className="mb-3">
                                <Col md={8}>
                                    <Image src={post.image} alt="Картинка" className="mw-100 shadow-sm" rounded />
                                </Col>
                            </Row>
                            <Row className="text-black-50 fs-6">
                                <Col md={6}>
                                    {new Date(post.created_at).toLocaleDateString()}
                                </Col>
                                <Col md={6}>
                                    <Button variant="link" className="text-danger"
                                        onClick={(e) => updLike(e, !isLike, setIsLike, setServerPost, token, id, groupId)}>
                                        {isLike ?
                                            <HeartFill />
                                            :
                                            <Heart />
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                        <Col md={5}>
                            {post.author._id === userId &&
                                <>
                                    <Row className="mb-3">
                                        <Col md={6}>
                                            <Row><Button variant="outline-secondary"
                                                onClick={() => updPost(setModalEditPost)}
                                            >Изменить пост</Button></Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md={6}>
                                            <Row><Button variant="outline-danger"
                                                onClick={() => delPost(groupId, id, token, setServerPost, navigate)}
                                            >Удалить пост</Button></Row>
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
                    <Row className="mb-3 bg-light rounded-2">
                        <Row className="mb-3">
                            <h3 className="mt-3">Коментарии</h3>
                        </Row>
                        <Row className="mb-3">
                            <Col md={8}>
                                <Form>
                                    <InputGroup className="mb-3">
                                        <Form.Control as="textarea"
                                            placeholder="Комментировать"
                                            value={text}
                                            rows={1}
                                            onChange={(e) => setText(e.target.value)} />
                                        <Button variant="outline-secondary"
                                            title="Отправить"
                                            onClick={addComment}
                                        >
                                            <SendCheck />
                                        </Button>
                                    </InputGroup>
                                </Form>
                            </Col>
                        </Row>
                        {comments &&
                            (comments.length > 0) ?
                            comments.map(el =>
                                <Row key={el._id} className="mb-3">
                                    <Row className="mb-3 w-50">
                                        <Col md={2}>
                                            <Image src={el.author.avatar} height="50" rounded />
                                        </Col>
                                        <Col md={10}>
                                            <h5 className="mb-1">{el.author.name}</h5>
                                            <p className="text-black-50 mb-0">{el.created_at.slice(0, 10)}</p>
                                        </Col>
                                    </Row>
                                    <p>{el.text}</p>
                                    {el.author._id === userId &&
                                        <Row className="ms-1 mb-3 ">
                                            <Col md={2}>
                                                <Row>
                                                    <Button variant="secondary"
                                                        size="sm"
                                                        className="fs-6"
                                                        onClick={() => delComment(el._id)}
                                                    >Удалить комментарий</Button></Row>
                                            </Col>
                                        </Row>
                                    }
                                    <hr className="ms-3" />
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
            {post &&
                <ModalEditPost
                    titlePost={post.title}
                    imagePost={post.image}
                    textPost={post.text}
                    tagsPost={post.tags}
                    id={id} />
            }

        </Container>
    )
}




export default Post;