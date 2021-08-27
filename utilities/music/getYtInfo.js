var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
const fs = require('fs')

async function getYtInfo(url){
    var xmlHttp = new XMLHttpRequest()
    
    const path = __dirname.substring(0, __dirname.length-15) + "config.json"
    let rawdata = await fs.readFileSync(path)
    let config = JSON.parse(rawdata)
    const videoId = url.substring(url.indexOf("watch?v=")+8, url.indexOf("watch?v=")+19)

    await xmlHttp.open( "GET", `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${config["youtube-api-key"]}`, false ); // false for synchronous request
    xmlHttp.setRequestHeader('Content-Type', 'application/json')

    xmlHttp.send( null )
    const res = await JSON.parse(xmlHttp.responseText)

    return {
        "title": res.items[0].snippet.title,
        "channel": res.items[0].snippet.channelTitle,
        "url": url,
        "thumb": res.items[0].snippet.thumbnails.standard.url,
        "stats": res.items[0].statistics
    }
}

module.exports = getYtInfo