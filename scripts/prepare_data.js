import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';

async function loadAndLabel(filename, profession) {
  const data = JSON.parse(
    await readFile(new URL(`../data/${filename}.json`, import.meta.url))
  );
  return data.map(person => {
    person.profession = profession;
    return person;
  });
}


const actors = await loadAndLabel('actors', 'actor');
const writers = await loadAndLabel('writers', 'writer');
const athletes = await loadAndLabel('athletes', 'athlete');
const painters = await loadAndLabel('painters', 'painter');
const musicians = await loadAndLabel('musicians', 'musician');
const directore = await loadAndLabel('directors', 'director');
const engineers = await loadAndLabel('engineers', 'engineer');
const astronauts = await loadAndLabel('astronauts', 'astronaut');
const scientists = await loadAndLabel('scientists', 'scientist');
const politicians = await loadAndLabel('politicians', 'politician');
const tv_presenters = await loadAndLabel('tv_presenters', 'tv presenter');
const chess_players = await loadAndLabel('chess_players', 'chess player');
const military_leaders = await loadAndLabel('military_leaders', 'military leader');
const circus_performers = await loadAndLabel('circus_performers', 'circus performer');

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


everyone.forEach(person => {

  // Check if the Wikipedia article is a Wikipedia link
  if (!person.wikipedia_article || !person.wikipedia_article.startsWith('https://en.wikipedia.org/wiki/')) {
    return; // Skip this record
  }

  // Remove the `wikipedia_article` field if it matches the Wikipedia name/link pattern
  const nameWithUnderscores = person.personLabel?.replace(/ /g, '_');
  if (person.wikipedia_article === `https://en.wikipedia.org/wiki/${nameWithUnderscores}`) {
    delete person.wikipedia_article;
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
      person.l = person.personLabel; delete person.personLabel;
      person.b = person.birth_date; delete person.birth_date;
      //person.d = person.death_date;
      delete person.death_date;
      person.p = person.profession; delete person.profession;
      person.w = person.wikipedia_article; delete person.wikipedia_article;

      // Add the record to the array associated with the key
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

