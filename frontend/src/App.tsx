import React, {useState} from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import LayoutComponent from "./components/Layout.component";
import LoginComponent from "./components/Login.component";
import HomepageComponent from "./components/Homepage.component";

function App() {

    const [accessToken, setAccessToken] = useState("");
    const [refreshToken, setRefreshToken] = useState("");

    const handleAccessToken = (token:string) => {
        setAccessToken(token);
        console.log(token)
    }

    const handleRefreshToken = (token:string) => {
        setRefreshToken(token);
        console.log(token)
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LayoutComponent />}>
                        <Route path="login" element={
                            <LoginComponent handleAccessToken={handleAccessToken}
                                            handleRefreshToken={handleRefreshToken}/>}
                        />
                        <Route path="home" element={<HomepageComponent accessToken={accessToken} refreshToken={refreshToken}/>} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
