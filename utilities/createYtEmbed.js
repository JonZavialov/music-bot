const { MessageEmbed } = require('discord.js')

function createYtEmbed(ytInfo){
    const embed = new MessageEmbed()
	.setColor('#B94916')
	.setTitle(`Now Playing: ${ytInfo.channel} - ${ytInfo.title}`)
	.setURL(ytInfo.url)
	.addFields(
		{ name: 'Views', value: ytInfo.stats.viewCount, inline: true },
        { name: 'Likes', value: ytInfo.stats.likeCount, inline: true }
	)
	.setImage(ytInfo.thumb)
	.setTimestamp()

    return embed
}

module.exports = createYtEmbed