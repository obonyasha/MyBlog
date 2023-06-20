import { useContext } from "react";
import { Col, Row, Navbar, Container, Nav, Button, Image } from "react-bootstrap";
import { BoxArrowInRight, PlusCircle } from "react-bootstrap-icons";
// import { Link, useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Ctx from "../../context";

const Header = () => {
    const { user, setModalActive, profile } = useContext(Ctx);

    const logIn = (e) => {
        e.preventDefault();
        localStorage.setItem("blogUser", "lk-blog");
        setModalActive(true);
    }


    return (
        <>
            <Navbar bg="light" variant="light" className="sticky-md-top">
                <Container className="header">
                    <Row>
                        <Col md={2}>
                            <Logo />
                        </Col>
                        <Col md={4}>
                            <Nav className="me-auto">
                                <Nav.Link href="/line">Лента</Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={2} >
                            <Nav className="me-auto h-100 w-100">
                                <Nav.Link href="/addpost" title="Создать пост">
                                    <PlusCircle className="h-100 w-100" />
                                </Nav.Link>
                            </Nav>
                        </Col>
                        <Col md={4}>
                            {!user ?
                                <Nav>
                                    <Nav.Link href="/profile" title="Профиль">
                                        <Button variant="light"
                                            onClick={logIn} title="Войти"
                                        >
                                            <BoxArrowInRight />
                                        </Button>                             </Nav.Link>
                                </Nav>
                                :
                                <Nav>
                                    <Nav.Link to="/profile" title="Профиль">
                                        <Image src={profile.avatar} height="50" rounded />
                                    </Nav.Link>
                                </Nav>
                            }
                        </Col>
                    </Row>
                </Container>
            </Navbar>
        </>
    )
}

export default Header;