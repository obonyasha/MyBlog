import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Ctx from "./context";
import Api from "./api";

import { Header } from "./components/General";
import ModalAuth from "./components/Modal";

import Main from "./pages/Main";
import Line from "./pages/Line";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import AddPost from "./pages/AddPost";
import Favorites from "./pages/Favorites";
import PostsAuthor from "./pages/PostsAuthor";

const App = () => {
    const [user, setUser] = useState(localStorage.getItem("blogUser"));
    const [token, setToken] = useState(localStorage.getItem("blogToken"));
    const [userId, setUserId] = useState(localStorage.getItem("userBlogID"));
    const [groupId, setGroupId] = useState(localStorage.getItem("groupId"));
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [serverPost, setServerPost] = useState([]);
    const [posts, setPosts] = useState([]);
    const [modalEditProfile, setModalEditProfile] = useState(false);
    const [profile, setProfile] = useState({});
    const [modalEditPost, setModalEditPost] = useState(false);
    const [authorPost, setAuthorPost] = useState();
    const [postsAuthor, setPostsAuthor] = useState([]);


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
        api.getProfile(userId)
            .then(data => {
                setProfile(data)
            })
    }, [token])

    useEffect(() => {
        if (token) {
            fetch(`https://api.react-learning.ru/v2/${groupId}/posts`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data);
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
            posts,
            setServerPost,
            modalEditProfile,
            setModalEditProfile,
            profile,
            setProfile,
            modalEditPost,
            setModalEditPost,
            authorPost, 
            setAuthorPost,
            postsAuthor,
            setPostsAuthor
        }}>
            <Header />
            <Routes>
                <Route path="/" element={<Line />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/addpost" element={<AddPost />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/posts/:name" element={<PostsAuthor />} />
            </Routes>
            <ModalAuth />
        </Ctx.Provider>
    )
}

export default App;