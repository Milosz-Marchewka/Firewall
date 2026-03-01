const Input = ({className, type="text", placeholder="", value, onChange, ...other})=>{

    return(
        <div className="w-1/2 h-12 border-2 border-zinc-900 flex items-center justify-center mt-6 relative">
            <input className={`font-jersey text-xl w-full h-full bg-zinc-800/80 px-3 py-1 ${className}`} type={type} placeholder={placeholder} value={value} onChange={onChange} {...other}/>
        </div>
    )
}

export default Input;