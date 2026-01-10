import useState from "react";
import "./Ability.css";
import { useDroppable } from "@dnd-kit/core";

const AbilitySocket = ({id = 0}) => {
  const {isOver, setNodeRef} = useDroppable({
    id: id,
  });

    return(
        <>
            <div className="flex w-full text-white font-jersey pr-1 pl-2 rounded-sm shadow-[3px_3px_0px_rgb(0_0_0_/_0.4)] bg-black/20 border-5 border-white/40 border-dashed"
            ref={setNodeRef}>
                <div className="w-full min-w-32 h-32 flex items-center justify-center">
                    <h2 className="text-2xl text-white/40">Empty</h2>
                </div>
            </div>
        </>

    );
}

export default AbilitySocket;
