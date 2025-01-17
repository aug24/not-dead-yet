import React, {useState} from 'react';
import Celeb from "./Celeb.tsx";

const MainContent: React.FC = () => {
    const [birthDateString, setBirthDateString] = useState<string>('');
    const [daysOld, setDaysOld] = useState<number | null>(null);
  const queryString = window.location.search;

  // Parse the query string
  const params = new URLSearchParams(queryString);
  const dd = params.get("dd");
  const mm = params.get("mm");
  const yy = params.get("yy");

console.log("dd", dd)
console.log("mm", mm)
console.log("yy", yy)
console.log(birthDateString)
if (!birthDateString && dd && mm && yy) {
  setBirthDateString(`${yy}-${mm}-${dd}`);
}
    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDateString(event.target.value);
        console.log(birthDateString)
    }

    const handleDone = () => {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        const daysOldNew = Math.ceil((today.getTime() - birthDate.getTime()) / 1000 / 3600 / 24);
        setDaysOld(daysOldNew);
        console.log("birth date s " + birthDate)
        console.log("today is " + today)
        console.log("Set days old to " + daysOldNew)
        console.log("done")
    }
    return (
        <main>
            {(daysOld !== null && !isNaN(daysOld)) ?

                <div>
                    <Celeb daysOld={daysOld!}/>
                    <button onClick={() => setDaysOld(null)}>Try again</button>
                </div>

                :

                <div>
                    <p>You're not dead yet - good start!</p>
                    <p>Enter your date of birth below to see who you're older than today:</p>
                    <label htmlFor="date-input">Birthdate: </label>
                    <input
                        type="date"
                        id="date-input"
                        value={birthDateString}
                        onChange={handleDateChange}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleDone()
                        }}
                        className="large-input"
                    />
                    <br/>
                    <button onClick={handleDone}>Submit</button>
                </div>
            }
        </main>
    );
};

export default MainContent;

