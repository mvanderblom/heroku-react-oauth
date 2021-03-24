import { useAuth0} from "@auth0/auth0-react";
import {Button} from "primereact/button";

const LoginButton: () => JSX.Element = () => {
    const  { loginWithRedirect, isAuthenticated } = useAuth0();

    return <>
        {
            !isAuthenticated &&
            <Button type="submit" label="Login" icon="pi pi-check" className="p-ml-2" onClick={() => loginWithRedirect()} />
        }
    </>
}

export default LoginButton