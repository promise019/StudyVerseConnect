import { createContext, useState } from "react"

export const DropDownContext = createContext()
export default function DropDownProvider({children}){
    const [preferredStyle, setPreferredStyle] = useState('select preferred learning style')
    const [showDropDown, setShowDropDown] = useState(false)
    
    return (
        <DropDownContext.Provider value={{preferredStyle, setPreferredStyle, showDropDown, setShowDropDown}}>
            {children}
        </DropDownContext.Provider>
    )
}