import type React from "react";
import "./FormCard.scss";

export const FormCard: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <div className="login-form">
        {children}
    </div>

}