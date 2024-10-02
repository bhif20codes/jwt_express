import React from 'react';
import {Link} from "react-router-dom";

const HeaderComponent = () => {
    return (
        <header>
            <h1>Student Management</h1>
            <Link to={"/"}> Home </Link>
            <br/>
            <Link to={"/login"}> Login </Link>
            <br/>
            <Link to={"/home"}> Show Home </Link>
        </header>
    );
};

export default HeaderComponent;