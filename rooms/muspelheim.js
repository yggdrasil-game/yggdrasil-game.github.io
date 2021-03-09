const muspelheimCenter = {
    id: 'muspelheimCenter',
    name: 'Firestorm',
    desc: `You go through the doorway and a fiery storm hits your face as you enter into a land of fire and smoke.`,
    onLook: () => {
        const room = getRoom('muspelheimCenter')
        room.desc = 'Flames circle around you leaving scorch marks all over your clothes. You can\'t stay here for long. There\'s a small cave to the northwest.'
    },
    exits: [
        { dir: 'north', id: 'yggdrasilSouth' },
        { dir: 'northwest', id: 'muspelheimNorthwest' },
    ],
}

const muspelheimNorthwest = {
    id: 'muspelheimNorthwest',
    name: 'Small Cave',
    desc: `You enter the cave. There is not much room but the flames don\'t reach here.`,
    onLook: () => {
        const room = getRoom('muspelheimNorthwest')
        room.desc = 'The cave is dimly lit. The air is hot but not scorching. There\'s a **red cloak** on the ground.'
    },
    items: [
        {
            isTakeable: true,
            name: 'red cloak',
            desc: 'The **red cloak** is made of soft and malleable stone. It is incredibly lightweight but seems to give formidable protection to its wearer.',
            onTake: () => {
                println(`You pick up the **red cloak**.`)
                println(`<i>You can view your inventory with the **inv** command.</i>`)
            },
            onUse: () => {
                unlock('yggdrasilNorth')
                println(`You put on the red cloak. Warmth fills your entire body. You feel well protected.`)
            },
            onLook: () => {
                println(`<i>You can take items with the **take** command.</i>`)
            }
        }
    ],
    exits: [
        { dir: 'southeast', id: 'muspelheimCenter' }
    ],
}