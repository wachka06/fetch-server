const models = require('./../models')
const User = models.user

const createUser = function(first, last, emailAddress, city, state, zip) {
    User.create({
        first_name: first,
        last_name: last,
        email: emailAddress,
        location: `{
            "city": "${city}",
            "state": "${state}",
             "zip": "${zip}"
        }`,
        pet_preference_one: 1,
        pet_preference_two: 2,
        pet_preference_three: 3,
        pet_preference_four: 4
    })
    .then(res => console.log(`User ${res.first_name} ${res.last_name} (id: ${res.id}) has been created!`))
    .catch(err => console.log(`Awe snap! You got an error my guy: ${err}`))
}

const getAllUsers = function () {
    users = User.findAll()
    users.map(person => {
        console.log(`Hi, I'm ${person.first_name} (id: ${person.id}) from ${JSON.parse(person.location).city}`)
    })
}

const getUserByAttribute = function (attribute) {
    User.findAll({ where: attribute })
    .then(user => {
        if (user.length > 1) {
            console.log(`You found ${user.length} users, including: ${user.map(name => `${name.first_name} ${name.last_name}
            `)}`)
        } else if (user.length === 1) {
            user = user[0]
            console.log(`Looks like you found ${user.first_name} ${user.last_name}`)
        } else {console.log('No users based on this criteria.')}
    })
    .catch(err => console.log(`Woops! We couldn't find the droid you were looking for! ${err}`))
}

const updateUser = function (toFind, toUpdate) {
    User.update(
        toUpdate,
        { returning: true, where: toFind }
    )
    .then(function(res) {
        const updatedCount = res[0]
        const updatedRecords = res[1]
        console.log(`Success! This change impacted ${updatedCount} record(s)`)
        updatedRecords.map(user => console.log(`${user.first_name} ${user.last_name} (id: ${user.id}) was updated!`))
    })
    .catch(err => console.log(`Bummer friend, here is your error -> ${err}`))
}

const deleteAllUsers = function () {
    users = User.findAll()
    users.map(person => {
        User.destroy({
            where: {
                id: `${person.id}`
            }
        })
        console.log(`${person.first_name} deleted.`)
    })
}

module.exports = {
    createUser,
    getAllUsers,
    deleteAllUsers,
    getUserByAttribute,
    updateUser
}