const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';


// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    return Recipe.create({
      title: "Pizza",
      level: "Easy Peasy",
      ingredients: ["Cheese","Tomato","Pizza dough","Ham"],
      cuisine: "Italian",
      duration: 60,
    })
  })
  .then((newRecipe) => {
    console.log(newRecipe.title)
  })
  .then(() => Recipe.insertMany(data))
  .then((newList) => {
    newList.forEach((newList) => {
      console.log(newList.title)
      })
    })
  .then(() => {
     return Recipe.findOneAndUpdate(
      {title: "Rigatoni alla Genovese"},
      {duration: 100},
      {new: true},
    )
  })
  .then((newDuration) => {
    console.log("New Duration:", newDuration.duration);
  })
  .then(() => {
    return Recipe.deleteOne(
      {title: "Carrot Cake"}
    )
  })
  .then((deleted) => {
    console.log("Recipe Deleted:", deleted)
  })
  .then(() => {
    mongoose.connection.close()
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
