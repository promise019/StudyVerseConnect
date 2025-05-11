export const SpiningLoader = () =>{
    return (
            <div className="absolute rounded-full border-4 border-green-700 bg-transparent 
            border-t-transparent w-10 h-10 animate-spin"
            >

            </div>
    )
}

export const SpiningLoader_outer_bg = ()=>{
    return (
        <div>

        </div>
    )
}

export const StopInteractionComponent = ({children}) =>{
    return (
        <div className="w-full h-full fixed bg-transparent flex justify-center pt-40">
            {children}
        </div>
    )
}