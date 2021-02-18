import {Link } from "react-router-dom";
import {Routes} from "./Routes";

function NavLinks() {
    return (
        <>
            <li className="nav-item"  role="presentation">
                <Link className="nav-link active" to={Routes.home.path}>
                    {Routes.home.name}
                </Link>
            </li>
            {/* <li className="nav-item" role="presentation">
                <Link className="nav-link" to={Routes.stores.path}>
                    {Routes.stores.name}
                </Link>
            </li> */}
        </>
    )
}

export default NavLinks
