import image from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="logo">
            <img src={image} alt="MyBlog" />
            <p className="p-o text-dark text-uppercase">My Blog</p>
        </Link>
    )
}

export default Logo;