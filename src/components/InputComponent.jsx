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