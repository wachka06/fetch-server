const models = require('./../models')
const Shelter = models.Shelters

const createShelter = function(name, city, state, zip, orgID) {
    Shelter.create({
        name: name,
        location: `{
            "city": "${city}",
            "state": "${state}",
            "zip": "${zip}"
        }`,
        organization_id: orgID,
    })
    .then(function(res) {        
        console.log(`Shelter ${res.name} (id: ${res.id}) has been created in ${JSON.parse(res.location).city}!`)
    })
    .catch(err => console.log(`Awe snap! You got an error my guy: ${err}`))
}

const getAllShelters = function () {
    shelters = Shelter.findAll()
        console.log('Here are all shelters: ')
        shelters.map(sh => console.log(`Pups and Kitties available at ${sh.name} (id: ${sh.id})`))
}

const getShelterByAttribute = function (attribute) {
    Shelter.findAll({ where: attribute })
    .then(shelters => {
        if (shelters.length === 1) {
            shelter = shelters[0]
            console.log(`You found: ${shelter.name} in ${JSON.parse(shelter.location).city}`)
        } else if (shelters.length > 1) {
            console.log(`You found ${shelters.length} shelters, including: ${shelters.map(shelter => `${shelter.name} at ${JSON.parse(shelter.location).city}
            `)}`)
        } else {
            console.log(`Bummah - No records with these stats, buhd`)
        }
    })
    .catch(err => console.log(`Woops! We couldn't find the droid you were looking for! ${err}`))
}

const updateShelter = function (toFind, toUpdate) {
    Shelter.update(
        toUpdate,
        { returning: true, where: toFind }
    )
    .then(function(res) {
        const updatedCount = res[0]
        const updatedRecords = res[1]
        console.log(`Success! This change impacted ${updatedCount} record(s)`)
        updatedRecords.map(org => console.log(`${org.name} (id: ${org.id}) in ${JSON.parse(org.location).city} was updated!`))
    })
    .catch(err => console.log(`Bummer friend, here is your error -> ${err}`))
}

const deleteAllShelters = function () {
    shelters = Shelter.findAll()
    shelters.map(sh => {
        Shelter.destroy({
            where: {
                id: `${sh.id}`
            }
        })
        console.log(`${sh.name} deleted.`)
    })
}

module.exports = {
    createShelter,
    deleteAllShelters,
    getAllShelters,
    getShelterByAttribute,
    updateShelter
}