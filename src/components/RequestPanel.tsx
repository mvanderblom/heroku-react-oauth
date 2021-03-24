import {useState} from 'react'
import JSONPretty from "react-json-pretty";

interface RequestPanelProps {
    accessToken?: Function
    label: string
    url: string
}

const RequestPanel = (props: RequestPanelProps): JSX.Element => {
    const [ data, setData ] = useState<String>()

    const doRequest = async () => {
        setData('loading...')
        try{
            let headers: HeadersInit = {}
            if(props.accessToken){
              headers['Authorization'] = `Bearer ${await props.accessToken()}`
            }

            const response = await fetch(props.url, {
                credentials: 'include',
                mode: 'cors',
                headers: headers,
            });
            if (response.status === 200)
                setData(await response.json())
            else
                setData(`ResponseStatus: ${response.status}`)
        } catch (e) {
            setData(e.message)
        }
    }

    const clear = () => {
        setData(undefined)
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