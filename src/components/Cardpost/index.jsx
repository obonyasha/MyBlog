import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Image, ButtonGroup } from "react-bootstrap";
import "./style.css";
import { Heart, HeartFill, ChatLeftText, Postcard, TextIndentLeft } from "react-bootstrap-icons";

import updLike from "../../utils/updLike";
import Ctx from "../../context"

const Cardpost = ({ img,
  title,
  text,
  _id,
  created_at,
  author,
  comments,
  likes,
  tags
}) => {
  const { userId,
    setServerPost,
    token,
    groupId,
    posts,
    setPostsAuthor,
    setAuthorPost,
    setQuantity,
    serverPost,
    setSearchPosts } = useContext(Ctx);

  const [isLike, setIsLike] = useState(likes.includes(userId));
  const datePublic = new Date(created_at).toLocaleDateString();
  const navigate = useNavigate();

  const allPostsAuthor = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAuthorPost(author);
    setPostsAuthor(posts.filter(el => el.author._id === author._id));
    navigate(`/posts/${author.name}`)
  }

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
        <Button className="text-dark text-start transition rounded-0"
          title="Все посты автора"
          variant="link"
          onClick={(e) => allPostsAuthor(e)}>
          <Row className="">
            <Col md={1} className="me-3">
              <Image src={author.avatar} height="25" rounded />
            </Col>
            <Col md={5} className="fw-bold fs-6">
              {author.name}
            </Col>
            <Col md={5} className="text-black-50 mb-0 fs-6 text-end">
              {datePublic}
            </Col>
          </Row>
        </Button>
        <Image variant="top" src={img} alt="Картинка" className="mw-100" />
        <Card.Body>
          <p className="mb-1 fw-bolder ms-1">{title}</p>
          <Card.Text>
            <Row className="mw-100">
              <em className="ms-3 p-0 text-truncate">{text}</em>
            </Row>
          </Card.Text>
        </Card.Body>
        <Card.Body className="card__footer">
          <Row className="card__footer_tags">
            <ButtonGroup aria-label="Basic example" size="sm" className="card__block_button">
              {tags.map((el, i) =>
                <Button key={i} variant="light" className="border-0 text-left" size="sm"
                  onClick={(e) => serchByTeg(e, el)}
                >
                  <span className="fs-6 text-dark rounded-1 p-1">{el}</span>
                </Button>
              )}
            </ButtonGroup>
          </Row>
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
            <Col md={4} className="text-center">
              <Button variant="outline-light" className="text-dark border-0 transition"
                onClick={allPostsAuthor}
                title="Все посты автора"
              >
                <Postcard />
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>

  )
}

export default Cardpost;