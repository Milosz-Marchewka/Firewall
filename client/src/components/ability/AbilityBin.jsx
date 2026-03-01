import { useDroppable } from "@dnd-kit/core";

const AbilityBin = ({role, active = false}) => {
    const {isOver, setNodeRef} = useDroppable({
        id: 5,
    });
    return(
        <div className="h-full fixed w-[37%] left-3">
            <div className={`flex h-180 text-white font-jersey pr-1 pl-2 rounded-sm shadow-[3px_3px_0px_rgb(0_0_0_/_0.4)] ${role == "attacker" ? 'bg-red-400/90' : 'bg-sky-400/90'} border-5 border-white/40 border-dashed`}
            ref={setNodeRef} >
                <div className="w-full h-full flex items-center justify-center">
                    <h2 className="text-8xl text-white/40">Return</h2>
                </div>
            </div>
        </div>
    );
}

export default AbilityBin;
