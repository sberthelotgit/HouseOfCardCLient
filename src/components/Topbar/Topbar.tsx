import type React from "react";
import { useNavigate } from "react-router";
import './Topbar.scss';

export const Topbar: React.FC = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        sessionStorage.removeItem("accessToken");
        navigate("/");
    }
    return <div className="topbar">
        <span className="title">House of Card</span>
        <div className="user-action">
            <a href="/">Login</a>
            <a href="/register">Register</a>
            <a onClick={handleLogout}>Logout</a>
        </div>
    </div>

}