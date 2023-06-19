import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./context";
import Api from "./api";

import { Header } from "./components/General";
import ModalAuth from "./components/Modal";

import Main from "./pages/Main";
import Line from "./pages/Line";
import Post from "./pages/Post";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("blogUser"));
    const [token, setToken] = useState(localStorage.getItem("blogToken"));
    const [userId, setUserId] = useState(localStorage.getItem("userBlogID"));
    const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [serverPost, setServerPost] = useState([]);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setApi(new Api(token))
    }, [token])

    useEffect(() => {
        if (user) {
            setToken(localStorage.getItem("blogToken"));
            setUserId(localStorage.getItem("userBlogID"))
        } else {
            setToken("");
            setUserId("")
        }
    }, [user])

    useEffect(() => {
        if (token) {
            fetch(`https://api.react-learning.ru/v2/${groupId}/posts`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setServerPost(data)
                })
        }
    }, [token, groupId])

    useEffect(() => {
        setPosts(serverPost)
    }, [serverPost])

    return (
        <Ctx.Provider value={{
            user,
            setUser,
            token,
            userId,
            modalActive,
            setModalActive,
            api,
            groupId,
            setGroupId,
            posts           
        }}>
            <Header />
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/line" element={<Line />} />
                <Route path="/post/:id" element={<Post />} />
            </Routes>
            <ModalAuth />
        </Ctx.Provider>
    )
}

export default App;