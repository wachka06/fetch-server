const { gql } = require('apollo-server');
const user = require('./user');
const pet = require('./pet');
const likedPet = require('./likedPet');
const shelter = require('./shelter');

const root = gql`
    enum Age {
        young
        adult 
        senior
    }

    enum Size {
        small
        medium
        large
    }

    enum Sex {
        male
        female
    }

    enum Status {
        adopted
        not adopted
    }

    enum Type {
        dog
        cat
        no preference
    }

    enum Experience {
        an expart
        experienced
        a novice
    }

    enum Dependency {
        sometimes
        often
        constantly
    }

    enum Activity {
        a couch potato
        active
        an athlete
    }

    enum Social {
        a wall flower
        social
        life of the party
    }

    enum Trainability {
        class clown
        attentive student
        teachers pet
    }
`;

const typeDefs = [root, user, pet, shelter];

module.exports = typeDefs;
