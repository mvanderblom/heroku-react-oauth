import { useAuth0} from "@auth0/auth0-react";
import {Button} from "primereact/button";

const afterLogoutRedirectUrl = process.env.REACT_APP_AFTER_LOGOUT_REDIRECT_URL;

const LogoutButton = (): JSX.Element => {
    const  { logout, isAuthenticated } = useAuth0();

    return <>
        {
            isAuthenticated &&
            <Button label="Logout" onClick={() => logout({returnTo: afterLogoutRedirectUrl})} />
        }
    </>
}

export default LogoutButton