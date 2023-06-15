import { Link } from "react-router-dom";

import { Button, Card } from "react-bootstrap";
import "./style.css";

const Cardpost = ({ img, title, text, _id }) => {
  return (
<Link to={`/post/${_id}`}>
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Img variant="top" src={img} alt="Картинка" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text className="text-truncate">
          {text}
        </Card.Text>
        <Button variant="light">Посмотреть</Button>
      </Card.Body>
    </Card>
</Link>

  )
}

export default Cardpost;