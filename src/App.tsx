import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import {useAuth0} from "@auth0/auth0-react";
import RequestPanel from "./components/RequestPanel";
import { Admin, Resource, ListGuesser } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';

const backendUrl: string = process.env.REACT_APP_BACKEND_URL!!

function App() {
    const {isLoading, getAccessTokenSilently} = useAuth0();

    if (isLoading)
        return <div>Loading....</div>
    if (false)
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
            <RequestPanel
                label="Get Visitor Resource"
                accessToken={async () => await getAccessTokenSilently({
                    audience: "heroku-api-oauth",
                })}
                url={`${backendUrl}/api/visitor-private`}/>
            <RequestPanel
                label="Get Admin Resource"
                accessToken={async () => await getAccessTokenSilently({
                    audience: "heroku-api-oauth",
                })}
                url={`${backendUrl}/api/admin-private`}/>
            <RequestPanel
                label="Get Backend User Principal"
                accessToken={async () => await getAccessTokenSilently({
                    audience: "heroku-api-oauth",
                })}
                url={`${backendUrl}/api/user`}/>
        </div>
    );
    const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');
    return <Admin dataProvider={dataProvider}>
        <Resource name="users" list={ListGuesser} />
    </Admin>;
}

export default App;
