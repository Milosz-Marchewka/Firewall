const Button = ({className, onClick, children})=>{
    return(
        <button className={`min-w-1/3 w-1/3 px-5 py-2 bg-yellow-500 text-white text-2xl font-jersey border-3 border-black/80
            text-shadow-[2px_2px_0px_rgb(0_0_0_/_0.4)]
            hover:-translate-y-[3px] hover:shadow-[0px_3px_1px_rgb(0_0_0_/_0.4)] hover:bg-yellow-400 transition-all mt-8 ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;