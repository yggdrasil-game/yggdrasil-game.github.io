const demoDisk = {
  equippedMask: null,
  roomId: 'yggdrasilCenter', // the ID of the room the player starts in
  rooms: [
    // yggdrasil
    yggdrasilCenter,
    yggdrasilNorth,
    yggdrasilSouth,
    // midgard
    midgardCenter,
    midgardNorth,
    // muspelheim
    muspelheimCenter,
    muspelheimNorthwest,
  ],
  characters: [
    sageWizard,
  ],
}

// custom functions used by this disk
// change the CSS stylesheet to the one with the passed name
const selectStylesheet = filename =>
  document.getElementById('styles').setAttribute('href', filename)

// override commands to include custom UNLOCK command
// create the unlock function
const unlock = roomId => {
  disk.rooms.forEach(room => {
    if (room.id === roomId) {
      room.exits.forEach(exit => delete exit.block)
    }
  })

  // update the description of the gate
  // getItemInRoom('gate', 'reception').desc = `The guilded gate leads to the staircase.`;
}

// attach it to the zero-argument commands object on the disk
commands[0] = Object.assign(commands[0], { unlock })
