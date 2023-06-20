import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Form, Row, Col, Button } from "react-bootstrap";

import Ctx from "../context";

const AddPost = () => {
    const { groupId, token, setServerPost } = useContext(Ctx);
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [text, setText] = useState("");
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState([]);


    const clearForm = () => {
        setTitle("");
        setImage("");
        setText("");
        setTags([])
    }

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

    const addPost = (e) => {
        e.preventDefault();
        const body = {
            title,
            image,
            text,
            tags
        }
        fetch(`https://api.react-learning.ru/v2/${groupId}/posts`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            setServerPost(prev => [data, ...prev]);
            clearForm();
            navigate(`/post/${data._id}`)
        })
    }

    return (
        <Container className="vh-100" centred>
            <Row>
                <Col md={6}>
                <Form onSubmit={addPost}>
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
                <div className="mb-3 rounded-1 w-50" style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: "contain",
                    height: "16.05rem",
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
                    </Form.Text>}
                </Form.Group>
                <Row>
                    <Col md={4}>
                        <Button variant="light" type="submit">
                            Создать пост
                        </Button>
                    </Col>
                </Row>
            </Form>    
                </Col>
            </Row>
        </Container>
    )
}

export default AddPost;