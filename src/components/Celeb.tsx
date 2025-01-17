import chooseCeleb from '../functions/ChooseCeleb.tsx';
type CelebProps = {
  daysOld: number
  birthDateString: String
};

const Celeb: React.FC<CelebProps> = ({ daysOld, birthDateString }) => {
    let celeb = chooseCeleb(daysOld)

    if (celeb !== null) {
        let byDays = daysOld - celeb!.days_old_at_death
          const [yy, mm, dd] = birthDateString.split("-");

          // Construct the URL with parameters
          const bookmarkUrl = `${window.location.origin}?yy=${yy}&mm=${mm}&dd=${dd}`;

        window.history.pushState({}, "", bookmarkUrl.toString());
        document.title = `Not Dead Yet: ${birthDateString}`;

        return <>
                <p>
                   You are <em> {daysOld} </em> days old today!
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


