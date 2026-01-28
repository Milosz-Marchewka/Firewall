const Button = ({className, onClick, children})=>{
    return(
        <button className={`min-w-1/3 w-1/3 px-5 py-2 bg-gradient-to-r from-sky-700 to-red-700 text-white text-xl font-jersey rounded-lg hover:brightness-110 shadow-[3px_3px_0px_rgb(0_0_0)] hover:shadow-[5px_5px_0px_rgb(0_0_0)] mt-8 ${className}`} onClick={onClick}>
            {children}
        </button>
    )
}

export default Button;