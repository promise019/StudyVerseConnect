export default function FormComponent({onSubmit, className, children}){
    return (
        <form onSubmit={onSubmit} className={className}>
            {children}
        </form>
    )
}