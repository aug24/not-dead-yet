import { PeopleByDay } from '../types/PeopleByDay.tsx';
import untypedPeopleByDay from '../data/peopleByDay.json';

function getAllCelebs(daysOld: number | null) {

    const peopleByDay: PeopleByDay = untypedPeopleByDay;
    if (!daysOld) return null

    daysOld -= 1 // Always start with someone who died at least one day younger
    while (daysOld > 0 && !(daysOld.toString() in peopleByDay)) {
      //console.log(daysOld)
      daysOld -= 1
    }
    if (daysOld==0) return null

    return peopleByDay[''+daysOld].map((celeb) => {
    celeb.o = daysOld
    return celeb
    })

}

export default getAllCelebs;


