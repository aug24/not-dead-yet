import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';

async function loadAndLabel(filename, shortProfession) {
  const data = JSON.parse(
    await readFile(new URL(`../data/${filename}.json`, import.meta.url))
  );
  return data.map(person => {
    person.shortProfession = shortProfession;
    return person;
  });
}


const actors = await loadAndLabel('actors', '1');
const writers = await loadAndLabel('writers', '2');
const athletes = await loadAndLabel('athletes', '3');
const painters = await loadAndLabel('painters', '4');
const musicians = await loadAndLabel('musicians', '5');
const directore = await loadAndLabel('directors', '6');
const engineers = await loadAndLabel('engineers', '7');
const astronauts = await loadAndLabel('astronauts', '8');
const scientists = await loadAndLabel('scientists', '9');
const politicians = await loadAndLabel('politicians', 'A');
const tv_presenters = await loadAndLabel('tv_presenters', 'B');
const chess_players = await loadAndLabel('chess_players', 'C');
const military_leaders = await loadAndLabel('military_leaders', 'D');
const circus_performers = await loadAndLabel('circus_performers', 'E');

const everyone = [
   ...actors,
   ...writers,
   ...athletes,
   ...painters,
   ...musicians,
   ...scientists,
   ...directore,
   ...engineers,
   ...politicians,
   ...astronauts,
   ...tv_presenters,
   ...chess_players,
   ...military_leaders,
   ...circus_performers
];

const everyoneByDay = {}

let currentId = 1;
const nameToIdMap = {}
const idToNameMap = {}

everyone.forEach(person => {

  // Check if the Wikipedia article is a Wikipedia link
  if (!person.wikipedia_article || !person.wikipedia_article.startsWith('https://en.wikipedia.org/wiki/')) {
    return; // Skip this record
  }

  // Remove the `wikipedia_article` field if it matches the Wikipedia name/link pattern
  const nameWithUnderscores = person.personLabel?.replace(/ /g, '_');
  if (person.wikipedia_article === `https://en.wikipedia.org/wiki/${nameWithUnderscores}`) {
    delete person.wikipedia_article;
  } else {
    person.wikipedia_article = person.wikipedia_article.substring(30);
  }

  // Remove the timestamp from `birth_date` and `death_date`
  if (person.birth_date) {
    person.birth_date = person.birth_date.split('T')[0]; // Retain only the date portion
  }
  if (person.death_date) {
    person.death_date = person.death_date.split('T')[0]; // Retain only the date portion
  }

  // Remove `person` field
  delete person.person;

  const birthDate = new Date(person.birth_date);
  const deathDate = new Date(person.death_date);
  const daysOld = Math.floor((deathDate - birthDate) / (1000 * 60 * 60 * 24)); // Difference in days
  if (daysOld > 6570 && daysOld < 40000) {
      if (!everyoneByDay[daysOld]) {
        everyoneByDay[daysOld] = [];
      }

      // densify
      person.b = person.birth_date; delete person.birth_date;
      //person.d = person.death_date;
      delete person.death_date;
      // person.p = person.profession;
      delete person.profession;
      person.s = person.shortProfession; delete person.shortProfession;
      person.w = person.wikipedia_article; delete person.wikipedia_article;

      const words = person.personLabel.split(" "); // Split name into words
      person.i = [];

      words.forEach(word => {
          if (!(word in nameToIdMap)) { // Check if word is already in the map
              const id = currentId++;
              nameToIdMap[word] = id;
              idToNameMap[id] = word;
          }
          person.i.push(nameToIdMap[word])
      });
      delete person.personLabel

      // Add the record to the array associated with the key
      for (var i = 0; i < everyoneByDay[daysOld].length; i++) {
        const thisPerson = everyoneByDay[daysOld][i]
        if (thisPerson.l == person.l && (thisPerson.w == person.w || !thisPerson.w && !person.w)) {
          // console.log("Adding profession", person.p, "to", thisPerson.l, "who already has", thisPerson.p)
          console.log("Adding profession", person.s, "to", thisPerson.l, "who already has", thisPerson.s)
          //thisPerson.p = thisPerson.p + ", " + person.p
          thisPerson.s = thisPerson.s + person.s
          return
        }
      }
      everyoneByDay[daysOld].push(person);
  } else {
      console.log("Removing ", person.personLabel, " as they appear to be ", daysOld, " days old")
  }
});

if (NaN in everyoneByDay) {
  delete everyoneByDay[NaN];
}

const everyoneByDayOutput = JSON.stringify(everyoneByDay);
await writeFile('./src/data/peopleByDay.json', everyoneByDayOutput, 'utf8');

const idToNameMapOutput = JSON.stringify(idToNameMap);
await writeFile('./src/data/idToNameMap.json', idToNameMapOutput, 'utf8');

