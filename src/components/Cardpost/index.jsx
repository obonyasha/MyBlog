import { Link } from "react-router-dom";
import { Button, Card, Row, Col, Image } from "react-bootstrap";
import "./style.css";
import { Heart, ChatLeftText } from "react-bootstrap-icons";

const Cardpost = ({ img, title, text, _id, created_at, author, comments, likes,tags
}) => {
  const datePublic = created_at.slice(0, 10);

  return (
    <Link to={`/post/${_id}`}>
      <Card style={{ width: '18rem' }} className="shadow-sm h-100">
          <Row className="card__header">
            <Col md={1}>
              <Image src={author.avatar} height="50" />
            </Col>
            <Col md={11}>
              <p className="mb-1 fw-bold">{author.name}</p>
              <p className="text-black-50 mb-0">{datePublic}</p>
            </Col>
          </Row>
        <Image variant="top" src={img} height={"200"} alt="Картинка" />
        <Card.Body>
          <p className="mb-1 fw-bolder">{title}</p>
          <Card.Text className="text-truncate">
            <em>{text}</em>
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
            <Col md={6}>
              <Row>
                <Col md={2}>
                  <Heart />
                </Col>
                <Col md={2}>
                  {likes.length}
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <Row>
                <Col md={2}><ChatLeftText /></Col>
                <Col md={2}><p>{comments.length}</p></Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Link>

  )
}

export default Cardpost;