const Link = ({children, className, onClick})=>{
    return(
        <a className={` ${className}`} onClick={onClick}>{children}</a>
    )
}

export default Link;