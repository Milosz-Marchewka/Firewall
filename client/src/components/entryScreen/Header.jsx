const Header = ({className, children})=>{
    return(
        <h3 className={`font-jersey text-white text-3xl mt-5  ${className}`}>{children}</h3>
    )
}

export default Header;