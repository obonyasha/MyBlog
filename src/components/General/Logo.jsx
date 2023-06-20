import image from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/line" className="logo">
            <img src={image} alt="MyBlog" />
        </Link>
    )
}

export default Logo;