import type React from "react";
import "./LoginLayout.scss";

export const LoginLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="login-page">
        {children}
    </div>
}