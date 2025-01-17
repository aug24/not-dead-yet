import chooseCeleb from '../functions/ChooseCeleb.tsx';
//import ShareButton from './ShareButton2.tsx'

type CelebProps = {
  daysOld: number
};

const Celeb: React.FC<CelebProps> = ({ daysOld }) => {
    let celeb = chooseCeleb(daysOld)
    if (celeb !== null) {
        let byDays = daysOld - celeb!.days_old_at_death
        return <>
                <p>
                   You are {daysOld} days old today!
                </p>
                <p>
                    You have outlived:
                    <br/>
                    <a href={celeb!.wikipedia_article} target="_blank">{celeb!.personLabel}</a>
                    <br/>
                    by {byDays} days!
                </p>
                <p>
                    They were born on {celeb!.birth_date} and died on {celeb!.death_date}.
                </p>
            </>
        ;
    }
    return <>
            <p>You are {daysOld} days old today!</p>
            <p>
                That's too young!  We don't have any celebrities who died aged less than {daysOld} days.
            </p>
        </>

};

export default Celeb;


