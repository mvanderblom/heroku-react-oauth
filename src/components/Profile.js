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
    const [ publicResourceData, setPublicResourceData ] = useState(null)
    const [ privateResourceData, setPrivateResourceData ] = useState(null)
    const [ scopedResourceData, setScopedResourceData ] = useState(null)

    const getPublicResource = async () => {
        const data = await doRequest(`${backendUrl}/api/public`);
        setPublicResourceData(data);
    }

    const getPrivateResource = async () => {
        const accessToken = await getAccessTokenSilently({
            audience: "heroku-api-oauth",
        });

        const data = await doRequest(`${backendUrl}/api/private`, {
            Authorization: `Bearer ${accessToken}`,
        });

        setPrivateResourceData(data);
    }

    const getPrivateScopedResource = async () => {
        const accessToken = await getAccessTokenSilently({
            audience: "heroku-api-oauth",
            scope:'read:private_resource'
        });

        const data = await doRequest(`${backendUrl}/api/private-scoped`, {
            Authorization: `Bearer ${accessToken}`,
        });

        setScopedResourceData(data);
    }

    const doRequest = async (url, headers) => {
        const response = await fetch(url, {
            ...defaultFetchProperties,
            headers: headers,
        });

        const data = await response.json();
        return data;
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
            <button onClick={() => getPublicResource()}>Get Public Resource</button>
            {publicResourceData && <JSONPretty data={publicResourceData} /> }
            <hr />
            <button onClick={() => getPrivateResource()}>Get Private Resource</button>
            {privateResourceData && <JSONPretty data={privateResourceData} /> }
            <hr />
            <button onClick={() => getPrivateScopedResource()}>Get Private Scoped Resource</button>
            {scopedResourceData && <JSONPretty data={scopedResourceData} /> }
        </div>
    )
}


export default Profile