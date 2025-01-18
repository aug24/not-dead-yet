import { readFile } from 'fs/promises';
import { writeFile } from 'fs/promises';


const actors = JSON.parse(
  await readFile(
    new URL('../data/actors.json', import.meta.url)
  )
).map(person => {
   person.profession = 'actor'
   return person
});


const athletes = JSON.parse(
  await readFile(
    new URL('../data/athletes.json', import.meta.url)
  )
).map(person => {
   person.profession = 'athlete'
   return person
});


const musicians = JSON.parse(
  await readFile(
    new URL('../data/musicians.json', import.meta.url)
  )
).map(person => {
   person.profession = 'musician'
   return person
});


const scientists = JSON.parse(
  await readFile(
    new URL('../data/scientists.json', import.meta.url)
  )
).map(person => {
   person.profession = 'scientist'
   return person
});


const politicians = JSON.parse(
  await readFile(
    new URL('../data/politicians.json', import.meta.url)
  )
).map(person => {
   person.profession = 'politician'
   return person
});

const everyone = actors.concat(athletes).concat(musicians).concat(scientists).concat(politicians)
const everyoneByDay = {}

everyone.forEach(person => {
  const birthDate = new Date(person.birth_date);
  const deathDate = new Date(person.death_date);
  const daysOld = Math.floor((deathDate - birthDate) / (1000 * 60 * 60 * 24)); // Difference in days
  person.days_old_at_death = daysOld;
  if (!everyoneByDay[daysOld]) {
    everyoneByDay[daysOld] = [];
  }
  // Add the record to the array associated with the key
  everyoneByDay[daysOld].push(person);
});

if (NaN in everyoneByDay) {
  delete everyoneByDay[NaN];
}

const everyoneByDayOutput = JSON.stringify(everyoneByDay, null, 2);

await writeFile('./src/data/peopleByDay.json', everyoneByDayOutput, 'utf8');

