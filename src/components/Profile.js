import React, {useState} from 'react'
import {useAuth0} from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";

const backendUrl = process.env.REACT_APP_BACKEND_URL
const defaultFetchProperties = {
    credentials: 'include',
    mode: 'cors',
}

const Profile = () => {
    const  { user, isAuthenticated, getAccessTokenSilently } = useAuth0();

    return (
        isAuthenticated &&
        <div>
            <h1>Profile</h1>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <hr />
            <JSONPretty data={user} />
        </div>
    )
}


export default Profile