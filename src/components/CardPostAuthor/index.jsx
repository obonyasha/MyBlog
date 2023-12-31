
import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, ButtonGroup } from "react-bootstrap";
import { Heart, HeartFill, ChatLeftText, TextIndentLeft, PencilSquare, Trash3 } from "react-bootstrap-icons";

import updLike from "../../utils/updLike";
import delPost from "../../utils/delPost";
import updPost from "../../utils/updPost";
import Ctx from "../../context"

const CardPostAuthor = ({ img,
    title,
    text,
    _id,
    created_at,
    comments,
    likes,
    author,
    tags
}) => {
    const { userId,
        setServerPost,
        token,
        groupId,
        setModalEditPost,
        serverPost,
        setSearchPosts,
        setQuantity
    } = useContext(Ctx);
    const [isLike, setIsLike] = useState(likes.includes(userId));
    const datePublic = new Date(created_at).toLocaleDateString();
    const navigate = useNavigate();

    const serchByTeg = (e, tag) => {
        e.stopPropagation();
        e.preventDefault();
        let result = serverPost.filter(el => el.tags.join().toLowerCase().includes(tag.toLowerCase()));
        setSearchPosts(result);
        setQuantity(result.length);
        navigate("/")
    }

    return (
        <Link to={`/post/${_id}`}>
            <Card style={{ width: '100%' }} className="shadow-sm h-100 card__post">
                <Card.Img variant="top" src={img} alt="Картинка" className="mw-100" />
                <Card.Body>
                    <p className="text-black-50 mb-0 ps-1">{datePublic}</p>
                    <p className="mb-1 fw-bolder ps-1">{title}</p>
                    <Card.Text>
                        <Row className="mw-100">
                            <em className="ms-3 p-0 text-truncate">{text}</em>
                        </Row>
                    </Card.Text>
                    <Card.Body className="card__footer">
                        <Row className="card__footer_tags">
                            <ButtonGroup aria-label="Basic example" size="sm" className="card__block_button">
                                {tags.map((el, i) =>
                                    // <Col md={4}>
                                    <Button key={i} variant="light" className="border-0 text-left" size="sm"
                                        onClick={(e) => serchByTeg(e, el)}
                                    >
                                        <span className="fs-6 text-dark rounded-1 p-1">{el}</span>
                                    </Button>
                                    // </Col>
                                )}
                            </ButtonGroup>
                        </Row>
                    </Card.Body>
                </Card.Body>
                <Card.Body className="card__footer">
                    <Row className="card__footer_row">
                        <Col md={1}>
                            <Row>
                                <Button variant="link" className="text-danger p-0 m-0"
                                    onClick={(e) => updLike(e, !isLike, setIsLike, setServerPost, token, _id, groupId)}>
                                    {isLike ?
                                        <HeartFill />
                                        :
                                        <Heart />
                                    }
                                </Button>
                            </Row>
                        </Col>
                        <Col md={3}>
                            {likes.length}
                        </Col>
                        <Col md={1}>
                            <ChatLeftText />
                        </Col>
                        <Col md={3}>
                            {comments.length}
                        </Col>
                        <Col md={2}>
                            {author._id === userId &&
                                <Button
                                    variant="outline-light" className="text-dark border-0 transition"
                                    onClick={(e) => updPost(e, setModalEditPost)}
                                    title="Редактировать пост">
                                    <PencilSquare />
                                </Button>
                            }
                        </Col>
                        <Col md={2}>
                            {author._id === userId &&
                                <Button
                                    variant="outline-light" className="text-dark border-0 transition_red"
                                    onClick={(e) => delPost(e, groupId, _id, token, setServerPost, navigate)}
                                    title="Удалить пост">
                                    <Trash3 />
                                </Button>
                            }
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Link>

    )
}

export default CardPostAuthor;