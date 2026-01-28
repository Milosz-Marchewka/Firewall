const Input = ({className, type="text", placeholder="", value, onChange})=>{
    return(
        <div className="w-1/2 h-12 p-0.5 bg-gradient-to-r from-sky-700 to-red-700 rounded-lg flex items-center justify-center mt-6">
            <input className={`w-full h-full bg-gray-700 rounded-lg px-3 py-1 ${className}`} type={type} placeholder={placeholder} value={value} onChange={onChange} />
        </div>
    )
}

export default Input;