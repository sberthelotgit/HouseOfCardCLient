import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FormCard } from "../../../components/FormCard/FormCard";
import { login } from "../../../shared/api/user-api";
import { LoginLayout } from "../Component/LoginLayout";

export const LoginPage: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = () => {
        if (!!email && !!password) {
            login({ email, password }).then(({ accessToken }) => {
                sessionStorage.setItem("accessToken", accessToken);
                navigate("/cards")
            });
        }
    }
    return <LoginLayout>
        <FormCard>
            <label htmlFor="login">Email:</label>
            <input type="email" id="login" name="login" value={email} onChange={e => setEmail(e.target.value)} />
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit" onClick={handleLogin}>Login</button>
            <a href="/register">No Account? Register!</a>
        </FormCard>
    </LoginLayout>
}