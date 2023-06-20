import { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Image, Col, Button } from "react-bootstrap";
import { BoxArrowInLeft } from "react-bootstrap-icons";
import Ctx from "../context";
import ModalEditProfile from "../components/ModalEditProfile";
import Cardpost from "../components/Cardpost";

const Profile = () => {
    const { api,
        posts,
        token,
        setUser,
        user,
        userId,
        setModalEditProfile,
        profile,
        setProfile } = useContext(Ctx);

    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("blogUser");
        localStorage.removeItem("blogToken");
        localStorage.removeItem("userBlogID");
        localStorage.removeItem("groupId");
    }

    const postsUser = posts.filter(el => el.author._id === profile._id)

    useEffect(() => {
        api.getProfile(userId)
            .then(data => {
                console.log(data);
                setProfile(data)
            })
    }, [token])

    const updProfile = () => {
        setModalEditProfile(true);
    }

    return (
        <Container className="p-3 vh-100">
            <Row>
                <Col md={8}>
                    <Row className="mb-3">
                        <Col md={1}>
                            <Image src={profile.avatar} height="50" rounded />
                        </Col>
                        <Col md={11}>
                            <p className="mb-1 fw-bold">{profile.name}</p>
                            <p className="text-black-50 mb-0">{profile.about}</p>
                        </Col>
                    </Row>
                </Col>
                <Col md={4}>
                    <Row className=" mb-3">
                        <Col md={8}>
                            <Row>
                                <Button variant="light" className="py-2"
                                    onClick={updProfile}>
                                    Изменть профиль
                                </Button>
                            </Row>
                        </Col>
                    </Row>
                    <Row className=" mb-3">
                        <Col md={8}>
                            <Row>
                                <Link to="/addpost" className="p-0">
                                    <Button variant="light">
                                        Создать пост
                                    </Button>
                                </Link>
                            </Row>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={2}>
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
            <Row>
                <Row className="mb-3">
                    <h5 className="text-muted">Мои посты</h5>
                </Row>
                {postsUser &&
                        <Container>
                            <Row>
                                {postsUser.map((el) =>
                                    <Col md={4} className="mb-4" key={el._id}>
                                        <Cardpost
                                            {...el}
                                            img={el.image}
                                        />
                                    </Col>)}
                            </Row>
                        </Container>
                }
            </Row>
            <ModalEditProfile />
        </Container>
    )
}

export default Profile;