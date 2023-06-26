import { useContext, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import Ctx from "../context";
import ModalEditProfile from "../components/ModalEditProfile";
import CardPostAuthor from "../components/CardPostAuthor";

const Profile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);
    const {
        serverPost,
        setUser,
        user,
        setModalEditProfile,
        profile } = useContext(Ctx);

    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("blogUser");
        localStorage.removeItem("blogToken");
        localStorage.removeItem("userBlogID");
        localStorage.removeItem("groupId");
        navigate("/")
    }

    const updProfile = () => {
        setModalEditProfile(true);
    }
    const postsUser = serverPost.filter(el => el.author._id === profile._id)

    return (
        <Container className="p-3 h-100">
            <Row>
                <Col md={8} xs={12}>
                    <Row className="mb-3">
                        <Col md={2} xs={1} className="me-2">
                            <Image src={profile.avatar} height="100" rounded />
                        </Col>
                        <Col md={7} xs={10} className="me-2">
                            <p className="mb-1 fw-bold">{profile.name}</p>
                            <p className="text-black-50 mb-0">{profile.about}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={4} sm>
                    <Row className="mb-3">
                        <Col md={6} sm={8}>
                            <Row>
                                <Button variant="light" className="py-2"
                                    onClick={updProfile}>
                                    Изменть профиль
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={6} sm={8}>
                            <Link to="/addpost" className="p-0">
                                <Row> <Button variant="light">
                                    Создать пост
                                </Button></Row>
                            </Link>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2} sm={2}>
                            {user && <Row>
                                <Button variant="light"
                                    onClick={logOut} title="Выйти"
                                >
                                    <BoxArrowInLeft />
                                </Button>
                            </Row>}
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row className="mb-3 px-0">
                <h5 className="text-muted">Мои посты</h5>
            </Row>
            {postsUser &&
                <>
                    <Row>
                        {postsUser.map((el) =>
                            <Col md={4} className="mb-4" key={el._id}>
                                <CardPostAuthor
                                    {...el}
                                    img={el.image}
                                />
                            </Col>)}
                    </Row>
                </>
            }
            <ModalEditProfile />
        </Container>
    )
}

export default Profile;