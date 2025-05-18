import { useContext } from "react"
import { DropDownContext } from "../app/Context/DropDownContext"

export default function DropDown({options}){
    return (
        <ul className="border border-gray-100 p-3 space-y-2 shadow rounded-xl">
            <Options value={options}/>
        </ul>
    )
}

export function Options({value}) {
    const {setPreferredStyle, showDropDown, setShowDropDown} = useContext(DropDownContext)
    return (
        value.map((options, index)=>
            <>
             <input key={index} value={options} type="button"
             onClick={(e)=> {setPreferredStyle(e.currentTarget.value)
                setShowDropDown(!showDropDown)
             }}
             className="w-full shadow"
             readOnly/>
             <br />
            </>
            
            //     {options}
            // </input>
        )
    )
}