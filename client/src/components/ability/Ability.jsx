import useState from "react";
import "./Ability.css";
import {useDraggable} from '@dnd-kit/core';
import { useDroppable } from "@dnd-kit/core";

import damageIcon from './../../assets/damageIcon.png';
import cooldownIcon from './../../assets/cooldownIcon.png';
import account_lockout_after_failures from "./../../assets/account_lockout_after_failures.png";
import basic_firewall_rules from "./../../assets/basic_firewall_rules.png";
import captcha_implementation from "./../../assets/captcha_implementation.png";
import change_default_passwords from "./../../assets/change_default_passwords.png";
import client_side_and_server_side_validation from "./../../assets/client-side_and_server-side_validation.png";
import cooldownicon from "./../../assets/cooldownicon.png";
import cybersecurity_training from "./../../assets/cybersecurity_training.png";
import disabling_directory_listing from "./../../assets/disabling_directory_listing.png";
import email_spam_filtering from "./../../assets/email_spam_filtering.png";
import https_enforcement from "./../../assets/https_enforcement.png";
import input_length_validation from "./../../assets/input_length_validation.png";
import least_privilege_principle from "./../../assets/least-privilege_principle.png";
import multi_factor_authentication from "./../../assets/multi-factor_authentication_(mfa).png";
import password_hashing_with_salt from "./../../assets/passwording_hashing_with_salt.png";
import role_based_access_control from "./../../assets/role-based_access_control.png";
import secure_session_cookies from "./../../assets/secure_session_cookies.png";
import software_updates_and_patching from "./../../assets/software_updates_and_patching.png";
import strong_password_policy_enforcement from "./../../assets/strong_password_policy_enforcement.png";
import user_privilege_separation from "./../../assets/user_privilege_separation.png";
import transport_layer_security_handling from "./../../assets/transport_layer_security_handling.png";
import secure_password_reset_flows from "./../../assets/secure_password_reset_flows.png";
import secure_deserialization_patterns from "./../../assets/secure_deserialization_patterns.png";
import secrets_management from "./../../assets/secrets_management.png";

const abilityImages = {
    "account lockout after failures": account_lockout_after_failures,
    "basic firewall rules": basic_firewall_rules,
    "captcha implementation": captcha_implementation,
    "change default passwords": change_default_passwords,
    "client-side and server-side validation": client_side_and_server_side_validation,
    "cybersecurity training": cybersecurity_training,
    "disabling directory listing": disabling_directory_listing,
    "email spam filtering": email_spam_filtering,
    "https enforcement": https_enforcement,
    "input length validation": input_length_validation,
    "least-privilege principle": least_privilege_principle,
    "multi-factor authentication (mfa)": multi_factor_authentication,
    "password hashing with salt": password_hashing_with_salt,
    "role-based access control": role_based_access_control,
    "secure session cookies": secure_session_cookies,
    "software updates and patching": software_updates_and_patching,
    "strong password policy enforcement": strong_password_policy_enforcement,
    "user privilege separation": user_privilege_separation,
    "transport layer security handling": transport_layer_security_handling,
    "secure password reset flows": secure_password_reset_flows,
    "secure deserialization patterns": secure_deserialization_patterns,
    "secrets management": secrets_management,
};
const Ability = ({data = null, unlocked = true, id = 0, ...props}) => {
    const {attributes, listeners, setNodeRef} = useDraggable({
        id: data.code,
    });


    return(
        <>
            {
                data !== null ?
                <div className={`ability flex h-32 w-full text-white font-jersey pr-1 pl-2 rounded-sm shadow-[3px_3px_0px_rgb(0_0_0_/_0.4)] rarity-${data?.rarity?.toFixed(0)} hover:z-300`} {...props}
                ref={setNodeRef} {...listeners} {...attributes}>
                    <div className="flex-1 flex items-center justify-center">
                        <img src={abilityImages[data?.name?.toLowerCase()]} alt="photo" className="w-32 pixelart"/>
                    </div>
                    <div className="flex-2 py-2">
                        <h2 className="text-[24px] leading-5 text-shadow-lg">{data?.name}</h2>
                        <div className="grid grid-cols-2 grid-row-2 text-lg gap-x-5 my-2">
                            <div>
                                <img src={damageIcon} alt="damage" className="ml-auto pixelart"/>
                            </div>
                            <div className="text-left text-2xl">
                                {data?.effect?.value}
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
                :
                <div className="flex w-full text-white font-jersey pr-1 pl-2 rounded-sm shadow-[3px_3px_0px_rgb(0_0_0_/_0.4)] bg-black/20 border-5 border-white/40 border-dashed">
                    <div className="w-full min-w-32 h-32 flex items-center justify-center">
                        <h2 className="text-2xl text-white/40">Empty</h2>
                    </div>
                </div>


            }
        </>

    );
}

export default Ability;
