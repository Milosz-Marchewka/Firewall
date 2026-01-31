const Rank = ({username, rank = "Rank"})=>{

    return(
        <p className="font-jersey text-3xl mx-auto text-white">{username} [{rank}]</p>
    )
}

export default Rank;