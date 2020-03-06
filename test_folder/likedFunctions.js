const models = require('./../models')
const Pet = models.Pets
const User = models.Users
const LikedPet = models.Liked_Pet

const createLikedPet = function(userId, petId, likedThisPet) {
    likedThisPet ? likedThisPet = Date() : likedThisPet = null
    console.log('liking a pet')
    LikedPet.create({
        userId: userId,
        petId: petId,
        likedAt: likedThisPet
    })
    .then(function(res) {       
        console.log(`The pet has been liked`)
    })
    .catch(err => console.log(`Awe snap! You got an error my guy: ${err}`))
}

const getAllLikedPets = function () {
    likes = LikedPet.findAll()
    console.log(`Here are all of liked pets: `)
    likes.map(liked => {
        console.log(`The Liked object is: ${liked}`)
    })
}

const getPetByAttribute = function (attribute) {
    Pet.findAll(
        { where: attribute, include: [{ model: Shelter}] })
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
    createLikedPet,
    getAllLikedPets
}