import chooseCeleb from '../functions/ChooseCeleb.tsx';
import Share from './Share.tsx'

type CelebProps = {
  daysOld: number
  birthDateString: String
};

const Celeb: React.FC<CelebProps> = ({ daysOld, birthDateString }) => {
    let celeb = chooseCeleb(daysOld)

    if (celeb !== null) {
        let byDays = daysOld - celeb!.o!
        const [yy, mm, dd] = birthDateString.split("-");

        // Construct the URL with parameters
        const bookmarkUrl = `${window.location.origin}${window.location.pathname}?yy=${yy}&mm=${mm}&dd=${dd}`;
        window.history.pushState({}, "", bookmarkUrl.toString());
        document.title = `Not Dead Yet: ${birthDateString}`;

        const formattedBirthDate = new Date(celeb!.b!).toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});
        const formattedDeathDate = new Date(celeb!.d!).toLocaleDateString('en-UK', {  year: 'numeric',  month: 'long',  day: 'numeric'});
        const nameWithUnderscores = celeb!.l?.replace(/ /g, '_')
        const autoLink = `https://en.wikipedia.org/wiki/${nameWithUnderscores}`
        const link = celeb!.w || autoLink

        const message1 =
          byDays==0
            ? 'If you make it to midnight, you will have outlived'
            : byDays==1
              ? 'Today, you have outlived'
              : byDays<5
                ? 'You have now outlived'
                : 'You have <em>easily</em> outlived'

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
                    <a className="celeb" href={link} target="_blank">{celeb!.l}</a>
                    <br/>
                    {message2}
                </p>
                <p>
                    {celeb!.l}, noted {celeb!.p}, was born on {formattedBirthDate}, and died on {formattedDeathDate} at {celeb!.o} days old.
                </p>
                <Share name={celeb!.l}/>
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


