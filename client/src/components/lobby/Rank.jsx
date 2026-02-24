const Rank = ({username, rank})=>{

    return(
        <div className="w-full">
            <p className="font-jersey text-5xl text-center bg-gradient-to-br from-amber-500 to-yellow-700 mx-[8%] shadow-[2px_2px_0px_2px_rgba(0,0,0,0.3)] text-amber-200 text-shadow-[3px_3px_0px_rgb(0_0_0_/_1)] mb-3.5">{rank}</p>
            <p className="font-jersey text-3xl text-center w-full text-white">{username}</p>
        </div>
    )
}

export default Rank;