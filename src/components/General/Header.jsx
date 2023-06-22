import { useContext } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container, Button, Image, Stack } from "react-bootstrap";
import { BoxArrowInRight, PlusCircle, PostcardHeart } from "react-bootstrap-icons";
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
        <div className="w-100 bg-light sticky-md-top">
            <Container>
                <Stack direction="horizontal" gap={3}>
                    <div className="p-2"><Logo /></div>
                    <div className="p-2 ">
                        <Link to="/" className="text-dark">Лента</Link>
                    </div>
                    {user &&
                        <>
                            <div className="p-2 ms-auto">
                                <Link to="/addpost" title="Создать пост">
                                    <PlusCircle className="h-100 w-100 text-dark fs-1" />
                                </Link>
                            </div>
                            <div className="p-2">
                                <Link to="/favorites" title="Любимые посты">
                                    <PostcardHeart className="h-100 w-100 text-dark fs-1" />
                                </Link>
                            </div>
                        </>
                    }

                    {!user ?
                        <div className="p-2  ms-auto">
                            <Button variant="light"
                                onClick={logIn} title="Войти"
                            >
                                <BoxArrowInRight />
                            </Button>
                        </div>
                        :
                        <div className="p-2 ">
                            <Link to="/profile" title="Профиль">
                                <Image src={profile.avatar} height="50" rounded />
                            </Link>
                        </div>
                    }

                </Stack>
            </Container>
        </div>
    )
}

export default Header;