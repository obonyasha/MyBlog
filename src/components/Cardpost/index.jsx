import { Link } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row, Col, Image } from "react-bootstrap";
import "./style.css";
import { Heart, HeartFill, ChatLeftText, Postcard } from "react-bootstrap-icons";

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
  const { userId, setServerPost, token, groupId, posts, setPostsAuthor, setAuthorPost } = useContext(Ctx);
  const [isLike, setIsLike] = useState(likes.includes(userId));
  const datePublic = new Date(created_at).toLocaleDateString();
  const navigate = useNavigate();
  // let authorId = "";

  const allPostsAuthor = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setAuthorPost(author);
    setPostsAuthor(posts.filter(el => el.author._id === author._id));
    navigate(`/posts/${author.name}`)
  }

  return (
    <Link to={`/post/${_id}`}>
      <Card style={{ width: '100%' }} className="shadow-sm h-100 card__post">
        <Button className="text-dark text-start transition"
        title="Все посты автора"
          variant="link"
          onClick={(e) => allPostsAuthor(e)}>
          <Row className="card__header">
            <Col md={1}>
              <Image src={author.avatar} height="75" rounded />
            </Col>
            <Col md={11}>
              <p className="mb-1 fw-bold">{author.name}</p>
              <p className="text-black-50 mb-0">{datePublic}</p>
            </Col>
          </Row>
        </Button>

        <Image variant="top" src={img} alt="Картинка" className="mw-100" />
        <Card.Body>
          <p className="mb-1 fw-bolder ps-1">{title}</p>
          <Card.Text className="text-truncate">
            <em className="ps-1">{text}</em>
          </Card.Text>
          {/* <Row>
            {tags.map((el, i) => 
              <Col md>
              <Button key={i} variant="outline-secondary" className="fs-6" size="sm">{el}</Button>
              </Col>
            )}
          </Row> */}
        </Card.Body>
        <Card.Body>
          <Row>
            <Col md={4} sm>
              <Row>
                <Col md={4} sm={2}>
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
                <Col md={2} sm>
                  {likes.length}
                </Col>
              </Row>
            </Col>
            <Col md={4} sm>
              <Row>
                <Col md={2} sm={2}><ChatLeftText /></Col>
                <Col md={2} sm><p>{comments.length}</p></Col>
              </Row>
            </Col>
            {/* <Col md={4} sm>
              <Button variant="light"
                onClick={allPostsAuthor}
              >
                <Postcard />
              </Button>
            </Col> */}
          </Row>
        </Card.Body>
      </Card>
    </Link>

  )
}

export default Cardpost;