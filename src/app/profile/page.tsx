'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import axios from 'axios';

function Profile() {
    const navigate = useRouter();
    const [user, setUser] = useState("");

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("/api/users/me");
                setUser(response.data.user);
                console.log(response.data);
            } catch (error) {
                console.log("something went wrong", error);
            }
        };
        fetchUser();
    }, []);

    return (
        <div>
            <h1>Profile</h1>
            <h2>userid:{user? user._id:""}</h2>
            <button onClick={() => navigate.push(`/profile/${user._id}`)}>get my details</button>
        </div>
    );
}

export default Profile;
