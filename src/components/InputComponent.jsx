export default function InputComponent({type, placeholder, className, value, onChange, name}){
    return (
        <input type={type}
         placeholder={placeholder}
         className={className}
         value={value}
         onChange={onChange}
         name={name}
        />
    )
}

export function TextAreaComponent({type, placeholder, className, value, onChange, name}) {
    return (
        <textarea
         className={className}
         onChange={onChange}
         value={value}
         placeholder={placeholder}
        />
    )
}