import AbilitiesMenu from './../ability/AbilitiesMenu.jsx';

const LobbyScreen = () => {
    return(
        <div className="screen bg-neutral-700">
            <AbilitiesMenu type="attacker"/>
        </div>
    );
}

export default LobbyScreen;