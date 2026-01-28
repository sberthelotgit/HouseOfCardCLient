import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FormCard } from "../../../components/FormCard/FormCard";
import { register } from "../../../shared/api/user-api";
import { LoginLayout } from "../Component/LoginLayout";
import "./RegisterPage.scss";



export const RegisterPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!!email && !!password && password === confirmPassword) {
            register({ email, password }).then(() => {
                navigate("/");
            });
        }
    }

    return <LoginLayout>
        <FormCard>
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <label htmlFor="confirm-password">Confirm Password:</label>
            <input type="password" id="confirm-password" name="confirm-password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
            <button className="register-button" type="submit" onClick={handleRegister}>Register</button>
            <a className="register-login-link" href="/" >Already have an account? Login!</a>
        </FormCard>
    </LoginLayout>

}