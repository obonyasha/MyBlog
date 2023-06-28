const delPost = (e, groupId, id, token, setServerPost, navigate) => {
    e.stopPropagation();
    e.preventDefault();
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