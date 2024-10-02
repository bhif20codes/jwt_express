import React from 'react';
import HeaderComponent from "./layout/Header.component";
import FooterComponent from "./layout/Footer.component";
import {Outlet} from "react-router-dom";

const LayoutComponent = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
            <FooterComponent/>
        </div>
    );
};

export default LayoutComponent;