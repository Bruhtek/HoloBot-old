module.exports = async (client, oldState, newState) => {
    if(oldState.channel == null && newState.channel != null) { // member joined the voice channel
        let chance = client.config.neeeChance;
        let rand = Math.floor(Math.random() * Math.floor(100));
        if(rand <= chance) {
            const connection = await newState.channel.join();

            const dispatcher = connection.play('resources/audio/rushia.mp3');

            dispatcher.on('finish', () => {
                connection.disconnect();
            });

            dispatcher.on('error', console.error);
        }
    }
}