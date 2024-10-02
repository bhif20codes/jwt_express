import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface HomepageProps {
    refreshToken:string;
    accessToken:string;
}

const HomePage:React.FC<HomepageProps> = ({ refreshToken, accessToken }) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/home', {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                    },
                });
                console.log('Response:', response);

                if (response.status === 401) {
                    navigate("/login");
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        if (!accessToken) {
            return;
        }
        fetchData();

        const decodedJson = JSON.stringify(jwtDecode(accessToken));

        const json = JSON.parse(decodedJson);

        setName(json.name);

    }, [accessToken, refreshToken]);

    return (
        <div>
            {name && (
                <div>
                    <h1>Welcome, {name}!</h1>
                </div>
            )}
        </div>
    );
};

export default HomePage;
