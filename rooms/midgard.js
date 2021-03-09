const midgardCenter = {
    id: 'midgardCenter',
    name: 'Clearing',
    desc: `You hold your breath and jump down the well. You emerge from another stone well in the middle of a clearing. The scent of sweet Spring air fills your lungs. It seems you are home.
    
    <i>You can investigate your surroundings with the **look** command.</i>`,
    onLook: () => {
        const room = getRoom('midgardCenter')
        room.desc = 'There\'s a stone **well** in the middle of the clearing.'
    },
    items: [
        {       
            name: 'well',
            desc: 'The stone well is of moderate quality. The water in the well is glimmering with faint purple light.',
        }
    ],
    exits: [
        { dir: 'down', id: 'yggdrasilCenter' },
        { dir: 'north', id: 'midgardNorth' },
    ],
}

const midgardNorth = {
    id: 'midgardNorth',
    name: 'Small house',
    desc: `You arrive at a small house.`,
    onLook: () => {
        const room = getRoom('midgardNorth')
        room.desc = 'You are standing in front of a small house. There is a **sign** next the front door.'
    },
    items: [
        {       
            name: 'sign',
            desc: 'The sign reads \'Home\'. You have no memory of this place.',
        }
    ],
    exits: [
        { dir: 'south', id: 'midgardCenter' },
    ],
}
