import {Link} from "react-router-dom"

const Header = () => {
    const navStyle = {
        display: "flex",
        gap: "16px",
    };
    return (
        <>
        <h2>EcoTrack</h2>
        <nav className="nav" style={navStyle}>
        <Link to="/">Dashboard</Link>
        <Link to="/logs">Logs</Link>
        <Link to="/login">Login</Link>
      </nav>
        </>
    )
}

export default Header;