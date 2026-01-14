import { BeatLoader } from "react-spinners";

const Spinner = ({color = "#FFFFFF"})=>{
    return (
        <BeatLoader size={75} color={color} speedMultiplier={0.75} cssOverride={{marginBottom: "auto", marginTop: "auto", marginRight: "auto", marginLeft: "auto"}} />
    )
}
export default Spinner;