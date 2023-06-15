import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Image } from "react-bootstrap";

import Ctx from "../context";



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
            console.log(data);
            setPost(data);
        })
    }, [])

    return (
        <Container>
            <Row>
                <h1>
                    {post.title}
                </h1>
            </Row>
            <Row>
                <Image src={post.image}/>
            </Row>
            <Row>
                <p>{post.text}</p>
            </Row>
        </Container>
    )
}

export default Post;