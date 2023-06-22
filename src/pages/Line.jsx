import { useContext, useEffect } from "react";
import usePagination from "../hooks/usePagination";

import { Col, Container, Row, Spinner } from "react-bootstrap";
import Cardpost from "../components/Cardpost";
import Pagination from "../components/Pagination";

import Ctx from "../context";


const Line = () => {
    const { posts, user } = useContext(Ctx);
    const paginate = usePagination(posts, 20);


    useEffect(() => {
        paginate.step(1);
    }, [posts])

    return (
        <Container className="p-4 h-100">

            <Row>
                <h3>
                    Добро пожаловать!
                </h3>
                <p>
                    Читай посты других и публикуй свои.
                </p>
            </Row>
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