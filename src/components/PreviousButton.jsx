export default function PreviousButton({className, onClick, src}){
    return (
            <img src={src} className={className} onClick={onClick} />
    )
}