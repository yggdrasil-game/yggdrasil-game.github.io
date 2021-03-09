const sageWizard = {
    name: ['Sage Wizard', 'Sage', 'Wizard'],
    roomId: 'dirtRoad',
    desc:
        'The wizard has beige robes and a wide hat. His gaze is as sharp as his fingernails. He looks strangely familiar...',
    onTalk: () =>
        println(
            `"Good day to you, sir!" he says grandiously. "How may I be of service?"`
        ),
    // things the player can discuss with the character
    topics: [
        {
            option: '**WHO** are you?',
            line: `"I'm the oldest. I was here before and will be after. You'll find no end after the beginning. The Tower lies ahead."`,
            removeOnRead: true,
        },
        {
            option: '**WHAT** is this place?',
            line: `Ah, you must be disoriented being new to this strange world. It is only natural. I, **Sage Wizard**, have in fact summoned you here in order to complete a quest of some importance. You must go to **The Tower**. All will be revealed in time.`,
            removeOnRead: true,
        },
        {
            option: 'Can you tell me something about the **TOWER**?',
            line: `"Adventure lies ahead. One with enough courage to seek its heights must take this."`,
            removeOnRead: true,
            // optional callback, run when the player selects this option
            onSelected() {
                println(`**SAGE WIZARD** pulls a strange-looking **Mask of Beginning** from his robes.
          "Here, take this." he says. "Try to **USE** it. Try not to lose it."`)

                // add a special item to the player's inventory
                disk.inventory.push({
                    name: 'Mask of Beginning',
                    desc: `This is a magical item. It glows slightly red.`,
                    onUse: () => {
                        const currentStylesheet = document
                            .getElementById('styles')
                            .getAttribute('href')
                        demoDisk.equippedMask = 'Mask of Beginning'
                        unlock('towerFront')
                        println(`The **Mask of Beginning** warped your senses. Everything feels strange.
              
              A drawbridge opens on the **Tower Front**!`)
                        selectStylesheet(`styles/maskOfBeginning.css`)
                    },
                })
            },
        },
    ],
}