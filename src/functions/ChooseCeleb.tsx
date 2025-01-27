import { Person } from '../types/Person.tsx';
import { PersonList } from '../types/PersonList.tsx';
import { PeopleByDay } from '../types/PeopleByDay.tsx';
import untypedPeopleByDay from '../data/peopleByDay.json';

function chooseCeleb(daysOld: number | null) {
    const peopleByDay: PeopleByDay = untypedPeopleByDay;
    if (!daysOld) return null

    daysOld -= 1 // Always start with someone who died at least one day younger
    while (daysOld > 0 && !(daysOld.toString() in peopleByDay)) {
      //console.log(daysOld)
      daysOld -= 1
    }
    if (daysOld==0) return null

    console.log("here!")

    let possibleCelebs: PersonList = peopleByDay[''+daysOld]
    console.log(possibleCelebs)

    let randomIndex: number = Math.floor(Math.random() * possibleCelebs.length);
    let chosenCeleb: Person = possibleCelebs[randomIndex];

    chosenCeleb.o = daysOld

    console.log(chosenCeleb)
    return chosenCeleb;

}

export default chooseCeleb;


