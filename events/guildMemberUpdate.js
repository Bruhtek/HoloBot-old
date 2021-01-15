const db = require('quick.db');

module.exports = async (client, oldState, newState) => {
    if(oldState.roles.cache.size >= newState.roles.cache.size) {
        return;
    }

    var restricted = db.get('restricted.' + oldState.id);
    console.log(restricted);
    for(let r in restricted) {
        if (newState.roles.cache.some(role => role.id === r)) {
            newState.roles.remove(newState.guild.roles.cache.get(r));
        }
    };
}