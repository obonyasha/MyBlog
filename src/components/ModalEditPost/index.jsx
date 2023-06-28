import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { X } from "react-bootstrap-icons";
import { Container, Form, Row, Col, Button, Modal } from "react-bootstrap";

import Ctx from "../../context";

const ModalEditPost = ({ titlePost, imagePost, textPost, tagsPost, id, setPost }) => {
    const { groupId, token, setServerPost, modalEditPost, setModalEditPost } = useContext(Ctx);
    const navigate = useNavigate();
    const [title, setTitle] = useState(titlePost);
    const [image, setImage] = useState(imagePost);
    const [text, setText] = useState(textPost);
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState(tagsPost);


    const updTag = (val) => {
        const text = val.toLocaleLowerCase();
        let cut = text.slice(0, text.length - 1);
        if (/[\s.,;!?]$/.test(text)) {
            setTags(prev => prev.includes(cut) ? prev : [...prev, cut]);
            setTag("");
        } else {
            setTag(text);
        }
    }

    const delTag = (tag) => {
        setTags(prev => prev.filter(tg => tg !== tag))
    }

    const editPost = (e) => {
        e.preventDefault();
        const body = {
            title,
            image,
            text,
            tags
        }
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts/${id}`, {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                // setServerPost(prev => [data, ...prev]);
                setPost(data);
                setModalEditPost(false)
                navigate(`/post/${data._id}`)
            })
    }
    return (
        <div className="modal-wrapper"
            style={{ display: modalEditPost ? "flex" : "none" }}>
            <Modal.Dialog
                className="bg-light text-dark rounded-1 p-4 w-100 vh-50"
                centered
                size="lg"
            >
                <Modal.Header className="mx-3 mb-3">
                    <Modal.Title >Изменить пост</Modal.Title>
                    <Button variant="outline-secondary" size="sm"
                        onClick={() => setModalEditPost(false)}>
                        <X />
                    </Button>
                </Modal.Header>
                <Container>
                    <Row>
                        <Col md={12}>
                            <Form onSubmit={editPost}>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group className="my-3">
                                            <Form.Label htmlFor={"title"}>
                                                <h5 className="text-muted">Заголовок поста</h5>
                                            </Form.Label>
                                            <Form.Control type={text}
                                                id="title"
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="text">
                                                <h5 className="text-muted">Текст поста</h5>
                                            </Form.Label>
                                            <Form.Control as="textarea"
                                                id="text"
                                                value={text}
                                                rows={5}
                                                onChange={(e) => setText(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="tags">
                                                <h5 className="text-muted">Теги</h5>
                                            </Form.Label>
                                            <Form.Control
                                                placeholder="Введите имя тега и нажмите пробел"
                                                type="text"
                                                id="tags"
                                                value={tag}
                                                onChange={(e) => updTag(e.target.value)}
                                            />
                                            {tags.length > 0 && <Form.Text>
                                                {tags.map(t => <span
                                                    className={`d-inline-block lh-1 bg-success text-light p-2 mt-2 me-2 rounded-1 `}
                                                    key={t}
                                                    onClick={() => delTag(t)}
                                                    style={{
                                                        pointerEvents: "auto"
                                                    }}
                                                >{t}</span>)}
                                                <p>Нажмите на тег, чтобы его удалить</p>
                                            </Form.Text>}
                                        </Form.Group>
                                        <Row>
                                            <Col md={6}>
                                                <Button variant="outline-secondary" type="submit">
                                                    Изменить
                                                </Button>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col md={6}>
                                        <div className="mb-3 rounded-1 w-100" style={{
                                            backgroundImage: `url(${image})`,
                                            backgroundSize: "contain",
                                            height: "17.70rem",
                                            backgroundPosition: "center",
                                            backgroundRepeat: "no-repeat",
                                            border: "solid 0.5px #adb5bd"
                                        }}></div>
                                        <Form.Group className="mb-3">
                                            <Form.Label htmlFor="image">
                                                <h5 className="text-muted">Изображение поста</h5>
                                            </Form.Label>
                                            <Form.Control
                                                type="url"
                                                id="image"
                                                value={image}
                                                onChange={(e) => setImage(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Modal.Dialog>
        </div>
    )
}

export default ModalEditPost;