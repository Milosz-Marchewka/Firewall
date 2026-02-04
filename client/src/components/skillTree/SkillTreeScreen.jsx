import { useEffect, useState } from "react";
import SkillTreeAbility from "./SkillTreeAbility";
import back from '../../assets/back.png';
import "./SkillTreeScreen.css";
import Button from "../entryScreen/Button"

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
import server_side_request_forgery from "./../../assets/server-side_request_forgery.png";
import sandbox_escape from "./../../assets/sandbox_escape.png";
import privilege_escalation_via_misconfiguration from "./../../assets/privilege_escalation_via_misconfiguration.png";
import man_in_the_browser_attack from "./../../assets/man-in-the-browser_attack.png";
import man_in_the_middle_attack from "./../../assets/man-in-the-middle_attack.png";
import kernel_privilege_escalation from "./../../assets/kernel_privilege_escalation.png";
import advanced_phishing_with_mfa_bypass from "./../../assets/advanced_phishing_with_mfa_bypass.png";
import apt_style_long_term_intrusion from "./../../assets/apt-style_long-term_intrusion.png";
import basic_brute_force_attack from "./../../assets/basic_brute-force_attack.png";
import basic_sql_injection from "./../../assets/basic_sql_injection.png";
import browse_open_directories from "./../../assets/browse_open_directories.png";
import command_injection from "./../../assets/command_injection.png";
import connect_via_unsecured_wifi from "./../../assets/connect_via_unsecured_wi-fi.png";
import credential_stuffing from "./../../assets/credential_stuffing.png";
import email_spoofing from "./../../assets/email_spoofing.png";
import file_extension_bypass from "./../../assets/file_extension_bypass.png";
import firmware_attack from "./../../assets/firmware_attack.png";
import memory_corruption_exploit from "./../../assets/memory_corruption_exploit.png";
import password_guess from "./../../assets/password_guess.png";
import session_fixation from "./../../assets/session_fixation.png";
import stored_xss_attack from "./../../assets/stored_xss_attack.png";
import supply_chain_compromise from "./../../assets/supply-chain_compromise.png";
import typosquat_their_domain from "./../../assets/typosquat_their_domain.png";
import url_parameter_tampering from "./../../assets/url_parameter_tampering.png";
import content_security_policy from "./../../assets/content_security_policy.png";
import cross_site_request_forgery_tokens from "./../../assets/cross-site_request_forgery_tokens.png";
import file_upload_validation from "./../../assets/file_upload_validation.png";
import jwt_signing_and_validation from "./../../assets/jwt_signing_and_validation.png";
import parametrized_queries from "./../../assets/parametrized_queries.png";
import basic_logging_and_auditing from "./../../assets/basic_logging_and_auditing.png";
import behavioral_anomaly_detection from "./../../assets/behavioral_anomaly_detection.png";
import intrusion_detection_system from "./../../assets/intrusion_detection_system.png";
import security_headers from "./../../assets/security_headers.png";
import server_side_request_forgery_protections from "./../../assets/server-side_request_forgery_protections.png";
import formal_verification_of_critical_components from "./../../assets/formal_verification_of_critical_components.png";
import inccodeent_response_playbooks from "./../../assets/inccodeent_response_playbooks.png";
import kernel_hardening from "./../../assets/kernel_hardening.png";
import sandboxing_untrusted_code from "./../../assets/sandboxing_untrusted_code.png";
import secure_boot_chains from "./../../assets/secure_boot_chains.png";
import supply_chain_security_valcodeation from "./../../assets/supply-chain_security_valcodeation.png";
import threat_intelligence_integration from "./../../assets/threat_intelligence_integration.png";


const abilityImages = {
    "account_lockout_after_failures": account_lockout_after_failures,
    "basic_firewall_rules": basic_firewall_rules,
    "captcha_implementation": captcha_implementation,
    "change_default_passwords": change_default_passwords,
    "client-side_and_server-side_validation": client_side_and_server_side_validation,
    "cybersecurity_training": cybersecurity_training,
    "disabling_directory_listing": disabling_directory_listing,
    "email_spam_filtering": email_spam_filtering,
    "https_enforcement": https_enforcement,
    "input_length_validation": input_length_validation,
    "least-privilege_principle": least_privilege_principle,
    "multi-factor_authentication_mfa": multi_factor_authentication,
    "password_hashing_with_salt": password_hashing_with_salt,
    "role-based_access_control": role_based_access_control,
    "secure_session_cookies": secure_session_cookies,
    "software_updates_and_patching": software_updates_and_patching,
    "strong_password_policy_enforcement": strong_password_policy_enforcement,
    "user_privilege_separation": user_privilege_separation,
    "transport_layer_security_handling": transport_layer_security_handling,
    "secure_password_reset_flows": secure_password_reset_flows,
    "secure_deserialization_patterns": secure_deserialization_patterns,
    "secrets_management": secrets_management,
    "server-side_request_forgery": server_side_request_forgery,
    "sandbox_escape": sandbox_escape,
    "privilege_escalation_via_misconfiguration": privilege_escalation_via_misconfiguration,
    "man-in-the-browser_attack": man_in_the_browser_attack,
    "man-in-the-middle_attack": man_in_the_middle_attack,
    "kernel_privilege_escalation": kernel_privilege_escalation,
    "advanced_phishing_with_mfa_bypass": advanced_phishing_with_mfa_bypass,
    "apt-style_long-term_intrusion": apt_style_long_term_intrusion,
    "basic_brute-force_attack": basic_brute_force_attack,
    "basic_sql_injection": basic_sql_injection,
    "browse_open_directories": browse_open_directories,
    "command_injection": command_injection,
    "connect_via_unsecured_wi-fi": connect_via_unsecured_wifi,
    "credential_stuffing": credential_stuffing,
    "email_spoofing": email_spoofing,
    "file_extension_bypass": file_extension_bypass,
    "firmware_attack": firmware_attack,
    "memory_corruption_exploit": memory_corruption_exploit,
    "password_guess": password_guess,
    "session_fixation": session_fixation,
    "stored_xss_attack": stored_xss_attack,
    "supply-chain_compromise": supply_chain_compromise,
    "typosquat_their_domain": typosquat_their_domain,
    "url_parameter_tampering": url_parameter_tampering,
    "content_security_policy": content_security_policy,
    "cross-site_request_forgery_tokens": cross_site_request_forgery_tokens,
    "file_upload_validation": file_upload_validation,
    "jwt_signing_and_validation": jwt_signing_and_validation,
    "parametrized_queries": parametrized_queries,
    "basic_logging_and_auditing": basic_logging_and_auditing,
    "behavioral_anomaly_detection": behavioral_anomaly_detection,
    "intrusion_detection_system": intrusion_detection_system,
    "security_headers": security_headers,
    "server-side_request_forgery_protections": server_side_request_forgery_protections,
    "formal_verification_of_critical_components": formal_verification_of_critical_components,
    "inccodeent_response_playbooks": inccodeent_response_playbooks,
    "kernel_hardening": kernel_hardening,
    "sandboxing_untrusted_code": sandboxing_untrusted_code,
    "secure_boot_chains": secure_boot_chains,
    "supply-chain_security_valcodeation": supply_chain_security_valcodeation,
    "threat_intelligence_integration": threat_intelligence_integration,
}

const categories = {
    defender: ["Identity & Access", "Application security", "Infrastructure", "SOC & Monitoring"],
    attacker: ["Credentials & Identity", "Exploits & Persistence", "Network & System", "Recon & Supply chain"]
}

const SkillTreeScreen = ({role, switchRole, abilities, ownedAbilities, isShowed, setIsShowed, setOwned, numOfSkillPoints}) => {
    const [styles, setStyles] = useState({
        outer: {
            defender: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-sky-700 to-gray-900 z-1000 transition-[left] duration-500 `,
            attacker: `screen overflow-x-auto fixed pt-1 top-0 bg-linear-to-l from-red-700 to-stone-900 z-1000 transition-[left] duration-500`
        },
        th: {
            defender: "bg-sky-600",
            attacker: "bg-red-600"
        }
    })

    const [buyingProgress, setBuyingProgress] = useState({stage: "", ability: {}});

    const handleClick = () => {
        setIsShowed(prev => false);
    }


    return(
        <div className={styles.outer[role]} style={{left: isShowed ? "0" : "-100%"}}>
            <div className="absolute top-0 right-0 m-5 font-jersey text-4xl text-black flex gap-2">
                <div className="py-2 px-5 border-4 border-black bg-amber-300">
                    {numOfSkillPoints} skill points available
                </div>
                <div className={`${styles.th[role]} w-16 h-16 border-4 border-black flex justify-center items-center pointer hover:-translate-0.5 hover:shadow-[2px_2px_0px_rgba(0_0_0_/_0.1)]`} onClick={() => {switchRole(role == 'attacker' ? 'defender' : 'attacker'); console.log(role)}}>
                    <img src={back} alt="💫" className=""/>
                </div>
            </div>
            <div className="absolute text-4xl left-5 top-5 pointer" onClick={() => {handleClick()}}><img src={back} alt="Back" className={`${styles.th[role]} h-20 w-20 p-3 pixelart hover:shadow-[4px_4px_0px_rgb(20,20,20)] hover:-translate-y-[4px] hover:-translate-x-[4px] transition-all hoverable`}/></div>
            <h1 className="font-jersey text-7xl text-center text-white text-shadow-[5px_5px_0px_rgb(0_0_0_/_0.6)] py-3">{role.toUpperCase()}'S SKILL TREE</h1>
            <div className="h-full overflow-auto pb-30">
                <div className="bg-neutral-900 w-4/5 mx-auto p-1 border border-gray-600">
                    <table className="font-jersey text-white mx-auto border-separate border-spacing-1 w-full">
                        <thead>
                            <tr className="text-2xl">
                                <th></th>
                                <>
                                    {
                                        categories[role].map((category)=>
                                            <th className={`${styles.th[role]} font-normal px-10 py-3`}>{category}</th>
                                        )
                                    }
                                </>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                [...Array(6)].map((_, index)=>{
                                    return(
                                        <tr className={`${"skilltree-rarity-"+(index+1)} h-30 min-h-fit`}>
                                            <td>Tier {index+1}</td>
                                            { categories[role].map((category)=>
                                                <td>
                                                    {
                                                        abilities?.map((item, i)=>{
                                                            if(item.category == category && item.rarity == index+1){
                                                                return(
                                                                    <>
                                                                        <SkillTreeAbility data={item} owned={ownedAbilities.filter((value, _) => (item.code == value.code)).length > 0} onClick={() => setBuyingProgress(()=>({stage: "confirm", ability: item}))}/>
                                                                    </>
                                                                );
                                                            }
                                                        })
                                                    }
                                                </td>
                                            )}
                                        </tr>
                                    );
                                })
                            }
                        </tbody>
                    </table>
                    {
                        buyingProgress.stage === "confirm" ?
                        <div className="screen absolute backdrop-blur-xs -top-2 left-0 flex items-center justify-center font-jersey text-white text-center">
                            <div className="bg-gray-200 min-w-100 bg-neutral-800 border-4 border-black p-2 popUp">
                                <h2 className="text-2xl">Are you sure you want to buy <h1 className="text-3xl">{buyingProgress.ability?.name}?</h1></h2>
                                <div className="flex gap-5 w-full justify-center py-2">
                                    <Button children={"Yes"} className="mt-0 bg-lime-500" onClick={()=>{setBuyingProgress((prev)=>({...prev, stage: "final"})); setOwned((prev)=>[...prev, buyingProgress.ability])}}/>
                                    <Button children={"No"} className="mt-0 bg-red-500" onClick={()=>setBuyingProgress({stage: "", ability: {}})}/>
                                </div>
                            </div>
                        </div>
                        :
                        buyingProgress.stage === "final" ?
                        <div className="screen absolute backdrop-blur-xs -top-2 left-0 flex items-center justify-center font-jersey text-white text-center">
                            <div className="bg-gray-200 min-w-100 bg-neutral-800 border-4 border-black p-2">
                                <h2 className="text-4xl">New ability unlocked!</h2>
                                <img src={abilityImages[buyingProgress.ability?.code]} className="w-full max-w-70 pixelart px-10 mx-auto"/>
                                <h3 className="text-2xl">{buyingProgress.ability?.name}</h3>
                                <div className="flex gap-5 w-full justify-center py-2">
                                    <Button children={"NUTS!"} className="mt-0 bg-yellow-500" onClick={()=>setBuyingProgress({stage: "", ability: {}})}/>
                                </div>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div>
        </div>
    );
}

export default SkillTreeScreen;