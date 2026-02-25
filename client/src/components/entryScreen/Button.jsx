const Button = ({className, onClick, children, disabled})=>{
    const disabledClass = disabled ? "opacity-50 pointer-events-none" : "hover:-translate-y-[3px] hover:shadow-[0px_3px_1px_rgb(0_0_0_/_0.4)]";
    return(
        <button disabled={disabled} className={`min-w-1/3 w-1/3 px-5 py-2 text-white text-2xl font-jersey border-3 border-black/80
            text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.4)] ${disabledClass} transition-all ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;