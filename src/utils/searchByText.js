const searchByText = (e, setText, arr, text, upd, setQuantity, navigate) => {
    let val = e.target.value;
    setText(val);
    let result = arr.filter(el => new RegExp(val, "i").test(el.title));
    upd(result);
    setQuantity(result.length);
    console.log(result, text);
    navigate("/")
}
export default searchByText;