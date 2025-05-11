import { useContext } from "react"
import { AuthContext } from "../app/Context/AuthContext"
import { useNavigate } from "react-router"
import { Navigate } from "react-router"

export default function AuthRoute({children}) {
    const {isLoggedIn} = useContext(AuthContext)
    const navigate = useNavigate()
    
   return (
    !isLoggedIn ? <Navigate to='/landingpage' /> : <Navigate to='/homepage'/>
   )
    
}