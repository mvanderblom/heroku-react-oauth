import React from 'react'
import { useAuth0} from "@auth0/auth0-react";

const afterLogoutRedirectUrl = process.env.REACT_APP_AFTER_LOGOUT_REDIRECT_URL;

const LogoutButton = () => {
    const  { logout, isAuthenticated } = useAuth0();

    return (
        isAuthenticated &&
        <button onClick={() => logout({returnTo: afterLogoutRedirectUrl})}>
            Logout
        </button>
    )
}

export default LogoutButton