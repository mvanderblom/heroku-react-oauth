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

            setData(await response.json())
        } catch (e) {
            setData(e.message)
        }
    }
    return (
        <div>
            <hr />
            <button onClick={() => doRequest()}>{props.label}</button>
            {data && <JSONPretty data={data} /> }
        </div>
    )
}

export default RequestPanel