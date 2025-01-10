import React, {useState} from 'react';
import Celeb from "./Celeb.tsx";

const MainContent: React.FC = () => {
    const [birthDateString, setBirthDateString] = useState<string>('');
    const [daysOld, setDaysOld] = useState<number | null>(null);

    const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setBirthDateString(event.target.value);
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
                    <Celeb daysOld={daysOld}/>
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
                    />
                    <button onClick={handleDone}>?</button>
                </div>
            }
        </main>
    );
};

export default MainContent;

