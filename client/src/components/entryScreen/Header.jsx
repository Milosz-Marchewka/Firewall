const Header = ({className, children})=>{
    return(
        <h3 className={`font-jersey text-white text-5xl mt-5 text-shadow-[3px_3px_0px_rgb(0_0_0)] ${className}`}>{children}</h3>
    )
}

export default Header;