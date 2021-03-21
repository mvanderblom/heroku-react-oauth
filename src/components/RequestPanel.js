import React, {useState} from 'react'
import JSONPretty from "react-json-pretty";

const defaultFetchProperties = {
    credentials: 'include',
    mode: 'cors',
}

const RequestPanel = (props) => {
    const [ data, setData ] = useState(null)

    const doRequest = async () => {
        setData('loading...')
        try{
            const headers = {}
            if(props.accessToken){
              headers['Authorization'] = `Bearer ${await props.accessToken()}`
            }

            const response = await fetch(props.url, {
                ...defaultFetchProperties,
                headers: headers,
            });
            if (response.status === 200)
                setData(await response.json())
            else
                setData(response.status)
        } catch (e) {
            setData(e.message)
        }
    }

    const clear = () => {
        setData(null)
    }

    return (
        <div>
            <hr />
            <button onClick={() => doRequest()}>{props.label}</button>
            <button onClick={() => clear()}>Clear</button>
            {data && <JSONPretty data={data} /> }
        </div>
    )
}

export default RequestPanel