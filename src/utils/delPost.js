const delPost = (groupId, id, token, setServerPost, navigate) => {
    fetch(`https://api.react-learning.ru/v2/${groupId}/posts/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            setServerPost(prev => prev.filter(el => el._id !== id));
            navigate("/profile")
        })
}

export default delPost;