import { useState } from "react"
import { createContext } from "react"

export const ThemeContext = createContext()

export default function ThemeProvider({children}) {
    const [theme, setTheme] = useState('lightmode')

    const toggleTheme = ()=>{
        setTheme(theme === 'lightmode' ? 'darkmode' : 'lightmode')
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}