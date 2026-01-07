import useState from "react";
import damageIcon from './../../assets/damageIcon.png';
import cooldownIcon from './../../assets/cooldownIcon.png';
import change_default_passwords from "./../../assets/change_default_passwords.png";
import cybersecurity_training from "./../../assets/cybersecurity_training.png";
import strong_password_policy_enforcement from "./../../assets/strong_password_policy_enforcement.png";
import account_lockout_after_failures from "./../../assets/account_lockout_after_failures.png";
import basic_firewall_rules from "./../../assets/basic_firewall_rules.png";
import disabling_directory_listing from "./../../assets/disabling_directory_listing.png";
import https_enforcement from "./../../assets/https_enforcement.png";
import input_length_validation from "./../../assets/input_length_validation.png";
import email_spam_filtering from "./../../assets/email_spam_filtering.png";
import software_updates_and_patching from "./../../assets/software_updates_and_patching.png";

const abilityImages = {
    "change default passwords": change_default_passwords,
    "cybersecurity training": cybersecurity_training,
    "strong password policy enforcement": strong_password_policy_enforcement,
    "account lockout after failures": account_lockout_after_failures,
    "basic firewall rules": basic_firewall_rules,
    "disabling directory listing": disabling_directory_listing,
    "https enforcement": https_enforcement,
    "input length validation": input_length_validation,
    "email spam filtering": email_spam_filtering,
    "software updates and patching": software_updates_and_patching,
};

const Ability = ({data, unlocked = true}) => {

    return(
        <div className="flex bg-black/20 w-full text-white font-jersey pr-1 pl-2">
            <div className="flex-1 flex items-center justify-center">
                <img src={abilityImages[data?.name.toLowerCase()]} alt="photo" className="w-32 pixelart"/>
            </div>
            <div className="flex-2 py-2">
                <h2 className="text-[24px] leading-5 text-shadow-lg">{data?.name}</h2>
                <div className="grid grid-cols-2 grid-row-2 text-lg gap-x-5 my-2">
                    <div>
                        <img src={damageIcon} alt="damage" className="ml-auto pixelart"/>
                    </div>
                    <div className="text-left text-2xl">
                        {data?.effect.value}
                    </div>
                    <div>
                        <img src={cooldownIcon} alt="cooldown" className="ml-auto pixelart"/>
                    </div>
                    <div className="text-left text-2xl">
                        {data?.cooldown}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ability;
