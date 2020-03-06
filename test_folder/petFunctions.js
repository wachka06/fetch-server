const models = require('./../models')
const Pet = models.Pets
const Shelter = models.Shelters

const createPet = function(name, speciesName, age, photo, known, color, pref1, pref2, pref3, pref4, sex, size, status, shelterID) {
    console.log('creating pet')
    Pet.create({
        name: name,
        species_name: speciesName,
        age: age,
        is_unknown_breed: known,
        primary_color: color,
        photos: photo,
        preference_one_value: pref1,
        preference_two_value: pref2,
        preference_three_value: pref3,
        preference_four_value: pref4,
        sex: sex,
        size: size,
        status: status,
        shelterId: shelterID
    })
    .then(function(res) {       
        console.log(`Pet ${res.name} (id: ${res.id}) the ${res.species_name} has been created!`)
    })
    .catch(err => console.log(`Awe snap! You got an error my guy: ${err}`))
}

const getAllPets = function () {
    pets = Pet.findAll({
        include: [{
            model: Shelter,
        }]
    })
    console.log(`Here are all of our pets: `)
    pets.map(pet => {
        const location = JSON.parse(pet.Shelter.location)
        console.log(`${pet.name} (id: ${pet.id}) is a ${pet.species_name}! They are currently ${pet.status} at ${pet.Shelter.name} in ${location.city}`)
    })
}

const getPetByAttribute = function (attribute) {
    Pet.findAll({ where: attribute, include: [{ model: Shelter}] })
    .then(pets => {
        if (pets.length === 1) {
            pet = pets[0]
            const location = JSON.parse(pet.Shelter.location)
            console.log(`You found ${pet.name} from ${location.city}`)
        } else if (pets.length > 1) {
            console.log(`You found ${pets.length} pets, including: ${pets.map(pet => {
                const location = JSON.parse(pet.Shelter.location)
                return `${pet.name} from ${location.city}`
            })
            }`)
        } else {
            console.log(`No pets to be found by this search!`)
        }
    })
}

const updatePet = function (toFind, toUpdate) {
    Pet.update(
        toUpdate,
        {returning: true, where: toFind}
    )
    .then(function(res) {
        const updatedCount = res[0]
        const updatedRecords = res[1]
        console.log(`Huzzah! This change impacted ${updatedCount} record(s)`)
        updatedRecords.map(pet => console.log(`${pet.name} (id: ${pet.id}) has been updated!`))
    })
    .catch(err => console.log(`Whomp :( => you've experienced an error: ${err}`))
}

const deleteAllPets = function() {
    pets = Pet.findAll()
    pets.map(pet => {
        Pet.destroy({
            where: {
                id: `${pet.id}`
            }
        })
    console.log(`${pet.name} has been deleted`)
    })
}

module.exports = {
    createPet,
    getAllPets,
    getPetByAttribute,
    updatePet,
    deleteAllPets
}