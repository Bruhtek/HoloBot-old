const mongoose = require('mongoose');
const restrictSchema = require.main.require('./schemes/restrictSchema.js');
const Restrict = mongoose.model('restrict', restrictSchema, 'restrict');

async function findRestrict(userid, restrictType) {
    return await Restrict.find({ userId: userid, restrictType: restrictType});
}

module.exports = async (client, oldState, newState) => {
    if(oldState.roles.cache.size >= newState.roles.cache.size) {
        return;
    }

    connector = mongoose.connect( client.uri, {useNewUrlParser: true, useUnifiedTopology: true});

    let restrict = await connector.then(async () => {
      return findRestrict(oldState.id, 0);
    })

    //console.log(restrict);

    if(!restrict) {
        return;
    }

    restrict.forEach(r => {
        id = r.restrictId;
        if (newState.roles.cache.some(role => role.id === id)) {
            newState.roles.remove(newState.guild.roles.cache.get(id));
        }
    });
}