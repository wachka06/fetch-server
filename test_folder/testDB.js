const Sequelize = require('sequelize')
const config = require(`${__dirname}/../config/config.json`)
const userFns = require('./userfunctions.js')
const shelterFns = require('./shelterfunctions.js')
const petFns = require('./petFunctions.js')
const likedFns = require('./likedFunctions.js')
const models = require('../models')
const db = require('../models/index.js')

const sequelize = new Sequelize(config.database, config.username, config.password, {
        host: config.host,
        dialect: 'postgres'
})

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection is established')
    })
    .catch(err => {
        console.error('Unable to connect: ', err)
    })

console.log(`Models are: `, models.sequelize.importCache)
// console.log(`Current environment is `, process.env)
// console.log(`Use env variables is: `, config)
// console.log(`The DB is: `, db)

// userFns.createUser("James", "Hankins", "J @H", "Cleveland", "OH", "44720")
// userFns.createUser("Gabe", "Toledo", "G@T", "Seattle", "WA", "98115")
// userFns.createUser("Natsuki", "Wada", "N @W", "Boston", "MA", "02144")
// userFns.createUser("Meagan", "Bernatchez", "M @B", "Southborough", "MA", "02144")
// userFns.getAllUsers()
// userFns.getUserByAttribute({ email: 'J@H'})
// userFns.updateUser({first_name: 'Meagan'}, {last_name: 'Hankins'})
// userFns.deleteAllUsers()     

// shelterFns.createShelter("Pet shop", "Cleveland", "OH", "44720", "a;ldghudsifsduf")
// shelterFns.createShelter("Pet shop 2", "Seattle", "WA", "98115", "dlkjfa")
// shelterFns.createShelter("Pet shop 3", "Boston", "MA", "02144", "jgidus")
// shelterFns.createShelter("Pet shop 4", "Westborough", "MA", "02161", "ghdsk")
// shelterFns.getAllShelters()
// shelterFns.getShelterByAttribute({ name: 'Pet shop'})
// shelterFns.updateShelter({name: 'Pet shop 3'}, {name: 'Pet shop'})
// shelterFns.deleteAllShelters()

// petFns.createPet("mittens", "cat", "young", "photoURL", true, "orange", 1, 3, 2, 4, "male", "small", "available", "d510413f-80af-44e1-8153-7583122c8b6c")
// petFns.createPet("boots", "cat", "old", "photoURL", false, "black", 2, 4, 3, 1, "female", "medium", "adopted", "4a4ed16b-8b5a-412b-8c1c-71a8fae9f81c")
// petFns.createPet("buck", "dog", "young", "photoURL", true, "brown", 3, 3, 2, 3, "male", "large", "available", "703420ba-9382-472c-a07e-4775b806be44")
// petFns.createPet("sparticus", "dog", "old", "photoURL", true, "white", 1, 3, 2, 4, "male", "small", "available", "fdb42bdb-0518-47ef-97bd-195500057130")
// petFns.getAllPets()
// petFns.getPetByAttribute({ name: "Smelly Cat" })
// petFns.updatePet({name: 'buck'}, {name: 'Buck-A-Roo, 232'})
// petFns.deleteAllPets()

// likedFns.createLikedPet('538a9178-8a3f-441a-9156-ccae3303572d', 'f7e62562-6ca0-433e-8208-b6fe1965f5d6', true)
// likedFns.createLikedPet('5ffff28e-39cf-4e08-ad42-c59271d6d5dc', '9b9028e0-43db-4e23-91de-01135929150d', true)
// likedFns.createLikedPet('5ffff28e-39cf-4e08-ad42-c59271d6d5dc', '2af83a0c-97bd-4722-b9aa-d58436d33c24', true)
// likedFns.createLikedPet('5ffff28e-39cf-4e08-ad42-c59271d6d5dc', '413f0da8-66bd-4164-b460-be8e76cae6de', true)
// likedFns.getAllLikedPets()
// likedFns.getLikedPetByAttribute({ name: "Smelly Cat" })
// likedFns.updateLikedPet({name: 'buck'}, {name: 'Buck-A-Roo, 232'})
// likedFns.deleteAllLikedPets()

