export const typeInfo = {
    attacker: <div className="font-jersey text-2xl">
        The role you have currently selected is the 

        <br/>

        <p className="font-medium text-3xl text-center text-red-950/90">Attacker!</p>

        <br/>

        You are a hacker - your main goal is to break the defender's system.
        You can achieve that using your abilities, which can deal damage lowering
        the defender's system integrity, or apply effects - healing yourself or pausing
        the defender's turns. 

        <br/><br/>

        The attacker has one special ability - if you use <strong> a healing ability </strong>
        that causes you to overheal (persistance goes over 20) - the excess healing will be halved
        and converted into a damage boost for the next damaging ability you use. 

        <br/><br/>

        <p className="text-center">Happy hacking!</p>
    </div>,
    defender: <div className="font-jersey text-2xl">
        The role you have currently selected is the 

        <br/>

        <p className="font-medium text-3xl text-center text-blue-950">Defender!</p>

        <br/>

        You are a cybersecurity specialist - your goal is to prevent the hacker
        from breaking your system. You can achieve that using your abilities,
        which can deal damage lowering the attacker's persistance, or apply 
        effects - repleneshing your integrity or pausing the attacker's turns.

        <br/><br/>

        The defender has one special ability - if you use <strong> a healing ability </strong> 
        that causes you to overheal (integrity goes over 20) - the excess healing will be halved
        and added to your base health - unlike the attacker, you can have more than 20 health.

        <br/><br/>
        <p className="text-center">Stay safe!</p>
    </div>
}