require('dotenv').config();
/** 1) Install & Set up mongoose */

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});

  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
    {name: "John Smith", age: 30, favoriteFoods: ['ham', 'bread']}, 
    {name: 'Pam Beasley', age: 35, favoriteFoods: ['steak', 'crisps']}
    ];

const createManyPeople = function(arrayOfPeople, done){
  Person.create(arrayOfPeople, function(err, people){
    if (err) console.log(err);
    done(null, people);
  })
  
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, personFound){
    if (err) console.error(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, foodFound){
    if (err) console.error(err);
    done(null, foodFound);
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, idFound){
    if(err) console.error(err);
    done(null, idFound);
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if(err) console.error(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, update) => {
      if(err) console.error(err);
      done(null, update);
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, person) => {
    if(err) console.log(err);
    done(null, person);

  })
};

const removeById = (personId, done) => {

  Person.findByIdAndRemove(personId, (err, personRemoved) => {
    if(err) console.error(err);
    done(null, personRemoved);
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({name: nameToRemove}, (err, peopleRemoved) => {
    if(err) console.log(err);
    done(null, peopleRemoved);
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods:foodToSearch})
    .sort({name: 1})
    .limit(2)
    .select({age: 0})
    .exec((err, data) => {
      if(err) console.log(err);
      console.log(data);
      done(null, data);
    })
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
