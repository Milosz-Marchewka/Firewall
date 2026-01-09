import QuickPlayJoin from '../join/QuickPlayJoin.jsx';
import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';

const LobbyScreen = () => {
    return(
        <div className="screen bg-neutral-700">
            <AbilitiesMenu type="attacker"/>
            <QuickPlayJoin/>
        </div>
    );
}

export default LobbyScreen;