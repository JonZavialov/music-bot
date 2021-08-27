const pauseMusic = require("../utilities/music/pauseMusic");

function pause(msg){
    pauseMusic(msg)
    msg.react('👍')
}

module.exports = pause