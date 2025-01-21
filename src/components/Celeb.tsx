import chooseCeleb from '../functions/ChooseCeleb.tsx';
import Share from './Share.tsx'

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
        const bookmarkUrl = `${window.location.origin}${window.location.pathname}?yy=${yy}&mm=${mm}&dd=${dd}`;
        window.history.pushState({}, "", bookmarkUrl.toString());
        document.title = `Not Dead Yet: ${birthDateString}`;

        const formattedBirthDate = new Date(celeb!.birth_date!).toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});
        const formattedDeathDate = new Date(celeb!.death_date!).toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});
        const nameWithUnderscores = celeb!.personLabel?.replace(/ /g, '_')
        const autoLink = `https://en.wikipedia.org/wiki/${nameWithUnderscores}`
        const link = celeb!.wikipedia_article || autoLink

        const message1 =
          byDays==0
            ? 'If you make it to midnight, you will have outlived'
            : byDays==1
              ? 'Today, you have outlived'
              : 'You have easily outlived'

        const message2 =
          byDays==0
            ? ``
            : byDays==1
              ? `by exactly one day`
              : `by ${byDays} days!`

        return <>
                <p>
                   You are <em> {daysOld} </em> days old today!
                </p>
                <p>
                    {message1}
                    <br/>
                    <a href={link} target="_blank">{celeb!.personLabel}</a>
                    <br/>
                    {message2}
                </p>
                <p>
                    {celeb!.personLabel}, noted {celeb!.profession}, was born on {formattedBirthDate}, and died on {formattedDeathDate} at {celeb!.days_old_at_death} days old.
                </p>
                <Share name={celeb!.personLabel}/>
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


