import './App.css';
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import {useAuth0} from "@auth0/auth0-react";
import RequestPanel from "./components/RequestPanel";
import React from "react";


const backendUrl = process.env.REACT_APP_BACKEND_URL

function App() {
    const {isLoading, getAccessTokenSilently} = useAuth0();

    if (isLoading)
        return <div>Loading....</div>

    return (
        <div className="App">
            <LoginButton />
            <LogoutButton />
            <Profile />

            <RequestPanel
                label="Get Public Resource"
                url={`${backendUrl}/api/public`}/>

            <RequestPanel
                label="Get Private Resource"
                accessToken={async () => await getAccessTokenSilently({
                        audience: "heroku-api-oauth",
                    })}
                url={`${backendUrl}/api/private`}/>

            <RequestPanel
                label="Get Private Scoped Resource"
                accessToken={async () => await getAccessTokenSilently({
                        audience: "heroku-api-oauth",
                    scope:'read:private_resource'
                    })}
                url={`${backendUrl}/api/private-scoped`}/>


        </div>
    );
}

export default App;
