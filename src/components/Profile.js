import React, { useState } from 'react'
import { useAuth0} from "@auth0/auth0-react";
import JSONPretty from "react-json-pretty";

const Profile = () => {
    const  { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
    const [ userData, setUserData ] = useState(null)


    const getUserData = async () => {

            const accessToken = await getAccessTokenSilently({
                audience: `tentplanner-api`,
                scope: "read:messages",
            });
            console.log('accessToken', accessToken)
            const url = `/api/private`;
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });
            console.log('pre-backend-call')
            const { data } = await response.json();
            console.log('Friet', data)
            setUserData(data);
    }


    return (
        isAuthenticated &&
        <div>
            <img src={user.picture} alt={user.name} />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <hr />
            <JSONPretty data={user} />
            <hr />
            <button onClick={() => getUserData()}>Get Userdata</button>
            {userData && <JSONPretty data={userData} /> }
        </div>
    )
}


export default Profile