const yggdrasilCenter = {
    id: 'yggdrasilCenter',
    name: 'Enormous Tree',
    desc: `You are standing on an enormous tree branch high in the sky. The wide branches strech out in every direction.
    
    <i>You can investigate your surroundings with the **look** command.</i>
    <i>You can see the available directions with the **go** command.</i>`,
    onLook: () => {
        const room = getRoom('yggdrasilCenter')
        room.desc = 'There\'s a stone **well** etched into the tree branch. It feels peculiarly nostalgic. The water in the **well** is glimmering with faint light.'
    },
    items: [
        {
            name: 'well',
            desc: 'The stone well is of moderate quality. There\'s a ᛗ symbol carved into the stone.'
        }
    ],
    exits: [
        { dir: 'down', id: 'midgardCenter' },
        { dir: 'north', id: 'yggdrasilNorth' },
        { dir: 'south', id: 'yggdrasilSouth' },
    ],
}

const yggdrasilNorth = {
    id: 'yggdrasilNorth',
    name: 'North Branch',
    desc: `As you walk north the heavy branch under your feet slopes downwards. The branch starts to vibrate with cold energy.
    
    <i>You can investigate your surroundings with the **look** command.</i>`,
    onLook: () => {
        const room = getRoom('yggdrasilNorth')
        room.desc = 'There\'s a deep **well** in front of you. It seems to lead underground.'
    },
    items: [
        {
            name: 'well',
            desc: 'The well is filled with icy white fog. It is quite rebarbative.'
        }
    ],
    exits: [
        { dir: 'south', id: 'yggdrasilCenter' },
        { dir: 'down', id: 'helCenter', block: 'The icy fog in the well is unforgivingly cold. It seems impenetrable.' },
    ],
}

const yggdrasilSouth = {
    id: 'yggdrasilSouth',
    name: 'South Branch',
    desc: `As you walk south the branch starts to heat up gradually under your feet. The tree bark radiates with heat.
    
    <i>You can investigate your surroundings with the **look** command.</i>`,
    onLook: () => {
        const room = getRoom('yggdrasilSouth')
        room.desc = 'The bark radiates with heat under your feet. A large **doorway** stands before you to the south.'
    },
    items: [
        {
            name: 'doorway',
            desc: 'The doorway seems ancient. Its hinges are made of molten rock and it glows intimidatingly red.'
        }
    ],
    exits: [
        { dir: 'north', id: 'yggdrasilCenter' },
        { dir: 'south', id: 'muspelheimCenter' },
    ],
}

const clearing = {
    id: 'clearing',
    name: 'Clearing',
    desc: `You arrive at a small flat clearing. 
    
    <i>You can look around with **LOOK** command ("look"). If you want to look at a specific thing, type **LOOK AT** ("look at the bench").`,
    onLook: () => {
        const room = getRoom('clearing')
        room.desc = 'There is a small **bench** beside you. At the center of the clearing a rusted **lamp post** flickers on and off.'
    },
    items: [
        {
            name: 'bench',
            desc:
                "The stone bench is covered with vines. It is pleasant to look at but one wouldn't sit on it.",
        },
        {
            name: ['lamp', 'lamp post'],
            desc: 'The lamp is old, rusty and barely working.',
        },
    ],
    exits: [
        { dir: 'west', id: 'forestPath' },
        { dir: 'south', id: 'smallPath' },
    ],
}

const forestPath = {
    id: 'forestPath',
    name: 'Forest Path',
    desc: `You have left the clearing. The path takes you into a small forest.
      
      <i>Try to **LOOK** around.</i>`,
    onLook: () => {
        const room = getRoom('forestPath')
        room.desc = `There are fallen leaves under your feet. Small twigs snap under your weight. The scent of moist grass fills your nostrils. There is a **Leather Knapsack** lying on the path.
        
        You can take items with the **TAKE** command ("take leather knapsack")`
    },
    items: [
        {
            isTakeable: true,
            name: 'Leather Knapsack',
            desc:
                'The **Leather Knapsack** has a small label on its side. It reads "100% vegan".',
            onTake: () => {
                unlock('forestPath')
                println(
                    `You pick up the **Leather Knapsack** and put it on your back.`
                )
                println(
                    `<i>The **Knapsack** is now your inventory. You can access the items in your inventory with the **INV** command. You can use items with the **USE** command ("use broken compass")</i>`
                )
                disk.inventory.push({
                    name: 'Carrot',
                    desc: `There is nothing special about the carrot.`,
                    onUse: () => {
                        // Remove item from inventory
                        disk.inventory = disk.inventory.filter(i => i.name !== 'Carrot')
                        println(
                            `You eat the carrot. It is surprisingly crunchy and fresh.`
                        )
                    },
                })
                disk.inventory.push({
                    name: 'Broken Compass',
                    desc: 'The compass looks old and worn. It is broken.',
                    onUse: () => {
                        println(`This is not the time or place.`)
                    },
                })
            },
        },
    ],
    exits: [
        {
            dir: 'southwest',
            id: 'insideTheForest',
            block: 'Take the **Leather Knapsack** with you. You are going to need it.',
        },
        { dir: 'east', id: 'clearing' },
    ],
}

const insideTheForest = {
    id: 'insideTheForest',
    name: 'Inside The Forest',
    desc: `Wandering inside the forest, you suddenly hear twigs snapping. Scary footsteps are approaching you rapidly.
    
    <i>You can save the game at a certain point with **SAVE** ("save") and load the game with **LOAD** ("load"). This could be useful before combat, if you happen to die. Then you can just load the game again from the save point.</i>`,
    onLook: () => println(`The Forest is dense and dark. It\'s hard to see.`),
    exits: [
        { dir: 'west', id: 'dirtRoad' },
        { dir: 'northeast', id: 'forestPath' },
    ],
}

const dirtRoad = {
    id: 'dirtRoad',
    name: 'Dirt Road',
    desc: `You manage to escape from the forest unharmed. The footsteps grow more distant. An old looking tower emerges from the northern horizon.
    
    <i>Type **LOOK** to have a look around. Type **HELP** for a list of commands.</i>`,
    // optional callback when player issues the LOOK command
    // here, we use it to change the dirtRoad's description
    onLook: () => {
        const room = getRoom('dirtRoad')
        room.desc = `You are standing on a dirt road. There's a large stone tower to the **NORTH**. You see a character amongst a mist. **Sage Wizard** is looking at you with a firm gaze.
      
      <i>You can talk to characters using **TALK TO** command ("talk to sage wizard").</i>`
    },
    // places the player can go from this room
    exits: [
        // GO NORTH command leads to the Reception Desk
        { dir: 'north', id: 'towerFront' },
        { dir: 'east', id: 'insideTheForest' },
    ],
}

const towerFront = {
    id: 'towerFront',
    name: 'Tower front',
    desc:
        'You walk along the Dirt Road, arriving at the foot of a small mountain. **The Tower** stands out from the top.',
    onLook: () => {
        const room = getRoom('towerFront')
        room.desc = `You are standing in front of large stone stairs leading up to **The Tower**. It seems to be carved from the mountain itself. You see a wooden **SIGN** next to you.`
    },
    items: [
        {
            name: 'tower', // the item's name
            desc: `A large stone tower rises high toward the sky. There's a red flag waving at the top.`, // description shown when player looks at the item
        },
        {
            name: ['sign', 'wooden sign', 'wooden roadsign'], // the item's name
            desc: `It's an old wooden sign which reads "M̶͏҉͜͞à͟͏̕g̵̛i̴̕͡c͢ ̸̵́̀͝ų̷̵̴̛s̡҉͝͡è̴r͞s̶̀́͠ ̡҉̧b̶҉͏ę͢w̸̛͘͢a̸̵̶̡͟r̴̵̴̛͜è̴́". The sign is covered with mold and dust.`, // description shown when player looks at the item
        },
    ],
    exits: [
        {
            dir: 'north',
            id: 'entranceHall',
            block:
                "You walk up the stairs but the tower entrance is blocked by a huge drawbridge. There's a deep moat between you and **The Tower**. It is filled with murky water. You walk back down the stairs.",
        },
        { dir: 'south', id: 'dirtRoad' },
    ],
}
