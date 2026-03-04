import type { FunctionComponent } from 'preact'
import { useState } from 'preact/hooks'
import CarouselCeleb from "./CarouselCeleb.tsx";


const MainContent: FunctionComponent = () => {
    const [birthDateString, setBirthDateString] = useState<string>('');
    const [daysOld, setDaysOld] = useState<number | null>(null);

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const dd = params.get("dd");
    const mm = params.get("mm");
    const yy = params.get("yy");
    if (!birthDateString && dd && mm && yy) {
      setBirthDateString(`${yy}-${mm}-${dd}`);
    }

    const handleDateChange = (event: Event) => {
        setBirthDateString((event.target as HTMLInputElement).value);
    }

    const handleDone = () => {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        const daysOldNew = Math.ceil((today.getTime() - birthDate.getTime()) / 1000 / 3600 / 24);
        setDaysOld(daysOldNew);
    }
    return (
        <main>
            {(daysOld !== null && !isNaN(daysOld)) ?

                <div>
                    <CarouselCeleb daysOld={daysOld!} birthDateString={birthDateString}/>
                    <p>
                      See you again tomorrow,
                      <br/>
                      when you'll be {daysOld!+1} days old,
                      <br/>
                      and hopefully have outlived someone else.
                    </p>
                    <button onClick={() => setDaysOld(null)}>Try a different date</button>
                </div>

                :

                <div>
                    <p>You're <em>not dead yet</em> - good start!</p>
                    <p>Enter your date of birth below to see who you're older than today</p>
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
                    <br/>
                    <button
                        className="large-input"
                        onClick={handleDone}
                    >Check please!</button>
                </div>
            }
        </main>
    );
};

export default MainContent;

