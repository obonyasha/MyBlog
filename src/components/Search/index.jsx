import { useContext, useEffect } from "react";
import { Form, Row, Button, InputGroup } from "react-bootstrap";
import { Binoculars } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";

import Ctx from "../../context";
import searchByText from "../../utils/searchByText";


const Search = ({ arr, upd }) => {
    const { text, setText, setQuantity } = useContext(Ctx);
    const navigate = useNavigate();

    return (
        <Row>
            <InputGroup>
                <Form.Control
                    type="text"
                    id="text"
                    value={text}
                    onChange={e => searchByText(e, setText, arr, text, upd, setQuantity, navigate)}
                    placeholder="Хочу почитать про..."
                    aria-describedby="basic-addon2">
                </Form.Control>

                <Button variant="outline-secondary"
                    id="button-addon2"
                    title="Искать"
                    onClick={e => searchByText(e, setText, arr, text, upd, setQuantity, navigate)}
                >
                    <Binoculars />
                </Button>

            </InputGroup>
        </Row>
    )
}

export default Search;