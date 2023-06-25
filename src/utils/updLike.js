const func = (e, state, setIsLike, setServerPost, token, _id, groupId) => {
    e.stopPropagation();
    e.preventDefault();
    setIsLike(state);
    fetch(`https://api.react-learning.ru/v2/${groupId}/posts/likes/${_id}`, {
        method: !state ? "DELETE" : "PUT",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            setServerPost(function (old) {
                const arr = old.map(el => {
                    if (el._id === _id) {
                        return data;
                    } else {
                        return el
                    }
                });
                return arr;
            })
        })
}
export default func;