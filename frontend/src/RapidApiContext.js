import React, {useState, createContext} from "react";

export const RapidApiProvider = (props) => {
    const [rapidContent, setRapidContent] = useState()
    return (
        <RapidApiContext.Provider value={[rapidContent, setRapidContent]}>
            {props.children}
        </RapidApiContext.Provider>
    )
}

export const RapidApiContext = createContext(null)