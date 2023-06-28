import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Col, Container, Row, Dropdown, ButtonGroup, Button } from "react-bootstrap";
import { FilterCircle } from "react-bootstrap-icons";

import Cardpost from "../components/Cardpost";
import Pagination from "../components/Pagination";
import Banner from "../components/Banner/Banner";

import usePagination from "../hooks/usePagination";
import Ctx from "../context";


const Line = () => {
    const { posts, user, searchPosts, quantity, text } = useContext(Ctx);
    const paginate = usePagination(searchPosts.length > 0 ? searchPosts : posts, 20);
    const [sort, setSort] = useState(null)

    // const location = useLocation();
    // useEffect(() => {
    //     window.scrollTo(0, 0);
    // }, [location]);

    useEffect(() => {
        // window.scrollTo(0, 0);
        paginate.step(1);
    }, [posts])

    const clearSort = () => {
        setSort(null);
        posts.sort((b, a) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

    const sortHandler = (vector) => {
        if (vector === sort) {
            setSort(null)
            posts.sort((b, a) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
        } else
            if (vector === "up") {
                setSort(vector);
                posts.sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime())
            } else
                if (vector === "down") {
                    setSort(vector);
                    posts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                } else
                    if (vector === "like") {
                        setSort(vector);
                        posts.sort((a, b) => b.likes.length - a.likes.length)
                    }
    }

    const textCnt = (cnt) => {
        if (cnt % 100 >= 5 && cnt % 100 <= 20) {
            return cnt + ' постов';
        }
        if (cnt % 100 == 1 || cnt % 10 == 1) {
            return cnt + ' пост';
        } else if (cnt % 100 >= 22 && cnt % 100 <= 24 || cnt % 10 >= 2 && cnt % 10 <= 4) {
            return cnt + ' поста';
        } else {
            return cnt + ' постов';
        }
    }

    return (
        <Container className="p-4 h-100">
            {quantity > 0 ?
                <Row>
                    <h5>По Вашему запросу найдено {textCnt(quantity)}</h5>
                </Row>
                :
                quantity === 0 && text ?
                    <Row>
                        <h5>По Вашему запросу найдено 0 постов</h5>
                    </Row>
                    :
                    <Banner />
            }
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
                    <Dropdown as={ButtonGroup} data-bs-theme="Secondary" size="sm" title="Сортировать" className="mb-3">
                        <Dropdown.Toggle variant="secondary" id="">
                            <FilterCircle />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>

                            <Dropdown.Item as="button"
                                variant="link"
                                className={`text-dark fs-6 w-100 text-start ${sort === "down" ? "bg-secondary-subtle" : "bg-white"}`}
                                onClick={() => sortHandler("down")}
                            >
                                Сначала новые
                            </Dropdown.Item>

                            <Dropdown.Item as="button"
                                variant="link"
                                className={`text-dark fs-6 w-100 text-start ${sort === "up" ? "bg-secondary-subtle" : "bg-white"}`}
                                onClick={() => sortHandler("up")}
                            >
                                Сначала старые
                            </Dropdown.Item>

                            <Dropdown.Item as="button"
                                variant="link"
                                className={`text-dark fs-6 w-100 text-start ${sort === "like" ? "bg-secondary-subtle" : "bg-white"}`}
                                onClick={() => sortHandler("like")}>
                                По популярности
                            </Dropdown.Item>

                        </Dropdown.Menu>
                        {sort && <Button variant="secondary"
                            onClick={clearSort}
                            title="Сбросить сортировку"
                        >
                            x
                        </Button>}

                    </Dropdown>
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
                    <Button className="sticky-md-bottom" variant="secondary"onClick={() => window.scrollTo(0, 0)}>
                        В начало
                    </Button>
                </>
            }
        </Container>
    )
}
export default Line;