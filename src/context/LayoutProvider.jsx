import { useState, createContext } from "react";

export const LayoutContext = createContext()

export const LayoutProvider = props => {
    const [sidebar, setSidebar] = useState(false)
    const [header, setHeader] = useState(false)


    return (
        <LayoutContext.Provider value={{
            sidebar, setSidebar,
            header, setHeader
        }}>
            {props.children}
        </LayoutContext.Provider>
    )
}