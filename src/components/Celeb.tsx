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
            byDays==1
              ? 'you have outlived'
              : byDays<5
                ? 'you have now outlived'
                : 'you have easily outlived'

        const message2 =
            byDays==1
              ? `by exactly one day.`
              : `by ${byDays} days!`

        return <>
                <p>
                   At <em> {daysOld} </em> days old today, {message1}
                    <br/>
                    <a className="celeb" href={link} target="_blank">{celeb!.l}
                      <svg className="external-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16">
                        <path d="M14 3h7v7h-2V6.41l-9.29 9.3-1.42-1.42 9.3-9.29H14V3zm-2 14H5V7h7V5H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2v-7h-2v7z"/>
                      </svg>
                    </a>
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


