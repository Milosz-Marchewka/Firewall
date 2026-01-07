import useState from "react";

const Ability = ({data, unlocked = true}) => {

    return(
        <div className="flex bg-black/20 w-full text-white font-jersey">
            <div className="flex-1 bg-gray-500">
                <img src="photo1.png" alt="photo"/>
            </div>
            <div className="flex-2 py-2">
                <h2 className="text-xl text-shadow-lg">{data?.name}</h2>
                <div className="grid grid-cols-2 grid-row-2 text-lg">
                    <div>
                        💥
                    </div>
                    <div>
                        {data?.effect.value}
                    </div>
                    <div>
                        ⌚
                    </div>
                    <div>
                        {data?.cooldown}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ability;
