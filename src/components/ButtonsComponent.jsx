export default function Button_Component({children, onclick, className }) {
    return (
        <button onClick={onclick} className={className}>
            {children}
        </button>
    )
}