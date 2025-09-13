const Button = ({ caption, onClick, isActive = true }) => {
    return <button onClick={onClick} disabled={!isActive}>{caption}</button>
}

export default Button;
