import { useContext, useEffect } from "react";
import { useLocation } from "react-router";
import { Col, Container, Row, Spinner } from "react-bootstrap";

import Cardpost from "../components/Cardpost";
import Pagination from "../components/Pagination";
import Banner from "../components/Banner/Banner";

import usePagination from "../hooks/usePagination";
import Ctx from "../context";


const Line = () => {
    const { posts, user, searchPosts, quantity, text } = useContext(Ctx);
    const paginate = usePagination(searchPosts.length > 0 ? searchPosts : posts, 20);
    const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location]);

    useEffect(() => {
        paginate.step(1);
    }, [posts])

    return (
        <Container className="p-4 h-100">
            {quantity > 0 ?
                <Row>
                    <h5>По Вашему запросу найдено {quantity} постов</h5>
                </Row>
                :
                quantity === 0 && text ?
                    <Row>
                        <h5>По Вашему запросу найдено 0 постов</h5>
                    </Row>
                    :
                    <Banner />
            }
            {/* <Banner /> */}
            {!user &&
                <Row>
                    <h5>Для просмотра и добавления постов необходима авторизация</h5>
                </Row>
            }
            {user &&
                posts &&
                <>
                    <Row className="mb-4">
                        <Pagination hk={paginate} />
                    </Row>
                    <Row>
                        {paginate.setDataPerPage().map((el) =>
                            <Col md={4} className="mb-4" key={el._id}>
                                <Cardpost
                                    {...el}
                                    img={el.image}
                                />
                            </Col>)}
                    </Row>
                    <Row className="mb-4">
                        <Pagination hk={paginate} />
                    </Row>
                </>
            }
        </Container>
    )
}

export default Line;