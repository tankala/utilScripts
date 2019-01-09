const readline = require('readline');
const redisClient = require('redis').createClient();

const userInteractor = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var initiateUserInteraction = async function() {
  while(true) {
    let mainQuery = `      Please press 1 to add new Animal Sound
      Please press 2 to add new Bird Sound
      Please press 3 to display speicific Animal Sound
      Please press 4 to display speicific Bird Sound
      Please press 5 to display All Animal Sounds
      Please press 6 to display All Bird Sounds
      Please press anything else to exit: `;
      let userChoice = await askAQuestion(mainQuery);
      await userChoiceExecution(userChoice);
  }
}

var askAQuestion = function(questionText) {
  return new Promise((resolve) => {
    userInteractor.question(questionText, (input) => resolve(input));
  });
}

var userChoiceExecution = async function(answer) {
    switch (answer) {
      case '1':
        await takeSpeciesDetailsAndAdd('Animal');
        break;
      case '2':
        await takeSpeciesDetailsAndAdd('Bird');
        break;
      case '3':
        await printSingleSpeciesSound('Animal');
        break;
      case '4':
        await printSingleSpeciesSound('Bird');
        break;
      case '5':
        await printAllSpeciesSound('Animal');
        break;
      case '6':
        await printAllSpeciesSound('Bird');
        break;
      default:
        userInteractor.close();
        process.exit();
        break;
    }
}

var takeSpeciesDetailsAndAdd = async function(category) {
  let animalName = await askAQuestion(`Please enter ${category} name: `);
  let animalSound = await askAQuestion(`what ${animalName} says: `);
  try {
    let response = await addSpeciesAndItsSound(category, animalName, animalSound);
    console.log(response);
  } catch(err) {
    console.error(err);
  }
}

var addSpeciesAndItsSound = function(category, speciesName, speciesSound) {
  return new Promise((resolve, reject) => {
    redisClient.hmset(category, {[speciesName] : speciesSound}, (err, reply) => {
      if(err) {
        reject(err);
      } else {
        resolve(reply);
      }
    });
  });
}

var printSingleSpeciesSound = async function(category) {
  let speciesName = await askAQuestion(`Please enter ${category} name: `);
  try {
    let speciesSound = await getSingleSpeciesSound(category, speciesName);
    if(speciesSound[0] !== null) {
      console.log(`${speciesName} says ${speciesSound}`);
    } else {
      console.log(`Don't know what ${speciesName} says`);
    }
  } catch(err) {
    console.error(err);
  }
}

var getSingleSpeciesSound = function(category, speciesName) {
  return new Promise((resolve, reject) => {
    redisClient.hmget(category, speciesName, (err, object) => {
      if(err) {
        reject(err);
      } else {
        resolve(object);
      }
    });
  });
}

var printAllSpeciesSound = async function(category) {
  try {
    let speciesSounds = await getAllSpeciesSound(category);
    for (const speciesName in speciesSounds) {
      console.log(`${speciesName} says ${speciesSounds[speciesName]}`);
    }
  } catch(err) {
    console.error(err);
  }
}

var getAllSpeciesSound = function(category) {
  return new Promise((resolve, reject) => {
    redisClient.hgetall(category, (err, object) => {
      if(err) {
        reject(err);
      } else {
        resolve(object);
      }
    });
  });
}

initiateUserInteraction();