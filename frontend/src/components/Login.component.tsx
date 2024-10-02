import React, {FormEventHandler, useState} from 'react';
import "./Login.component.css";
import axios from "axios";
import {useNavigate} from "react-router-dom";

interface LoginProps {
    handleAccessToken: (token:string) => void;
    handleRefreshToken: (token:string) => void;
}

const LoginComponent:React.FC<LoginProps> = ({ handleAccessToken, handleRefreshToken }) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate()


    const handleLogin:FormEventHandler = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:4001/login', {
                username: username
            });

            console.log(response.data.accessToken)

            handleAccessToken(response.data.accessToken)
            handleRefreshToken(response.data.refreshToken)

            navigate("/home")

        } catch (error) {
            console.error('Error:' + error);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div className="input-group">
                    <input
                        type="username"
                        placeholder="Username"
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-btn">Login</button>
            </form>
        </div>
    );
};

export default LoginComponent;