import { useContext } from "react";
import { Col, Row, Navbar, Container, Nav, Button } from "react-bootstrap";
import { BoxArrowInLeft, BoxArrowInRight } from "react-bootstrap-icons";
import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Ctx from "../../context";

const Header = () => {
    const { user, userId, setModalActive, setUser } = useContext(Ctx);
    const navigate = useNavigate();

    const logIn = (e) => {
        e.preventDefault();
        localStorage.setItem("blogUser", "lk-blog");
        setModalActive(true);
    }

    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("blogUser");
        localStorage.removeItem("blogToken");
        localStorage.removeItem("userBlogID");
        localStorage.removeItem("groupId");
    }

    return (
        <>
            <Navbar bg="light" variant="light">
                <Container>
                    <Row>
                        <Col md={2}>
                            <Logo />
                        </Col>
                        <Col md={6}>
                            <Nav className="me-auto">
                                <Nav.Link href="/line">Лента</Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={2}>
                            {!user && <Button variant="light"
                                onClick={logIn} title="Войти"
                            >
                                <BoxArrowInRight />
                            </Button>}
                        </Col>
                        <Col md={2}>
                            {user && <Button variant="light"
                                onClick={logOut} title="Выйти"
                            >
                                <BoxArrowInLeft />
                            </Button>}
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;