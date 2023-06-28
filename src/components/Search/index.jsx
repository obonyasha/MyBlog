import { useContext } from "react";
import { Form, Row, Button, InputGroup } from "react-bootstrap";
import { Binoculars, X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

import Ctx from "../../context";
import searchByText from "../../utils/searchByText";


const Search = ({ arr, upd }) => {
    const { text, setText, setQuantity, setPosts, serverPost } = useContext(Ctx);
    const navigate = useNavigate();

    return (
        <Row>
            <InputGroup>
                <Form.Control className="focus-ring focus-ring-secondary"
                    type="text"
                    id="text"
                    value={text}
                    onChange={e => searchByText(e, setText, arr, text, upd, setQuantity, navigate)}
                    placeholder="Хочу почитать про..."
                    aria-describedby="basic-addon2">
                </Form.Control>
                {text &&
                    <Button variant="outline-light text-dark border-top border-bottom bg-white border-start-0"
                        onClick={() => { setText(""); setPosts(serverPost); setQuantity(0) }}
                    >
                        <X />
                    </Button>
                }
                <Button variant="outline-secondary border-left"
                    id="button-addon2"
                    title="Искать"
                    onClick={() => navigate("/")}
                >
                    <Binoculars />
                </Button>
            </InputGroup>
        </Row>
    )
}

export default Search;