import type { FunctionComponent } from 'preact'

type AboutProps = {
  onBack: () => void
}

const About: FunctionComponent<AboutProps> = ({ onBack }) => {
  return (
    <div className="about">
      <h2>About Not Dead Yet</h2>

      <p>
        <em>Not Dead Yet</em> is a lighthearted memento mori — a reminder that
        life is finite, but you're still here.
      </p>

      <p>
        Enter your date of birth and discover which notable figures from history
        you've now outlived. It's a peculiar form of achievement: every day you
        wake up, you've beaten someone famous at the game of longevity.
      </p>

      <h3>How it works</h3>
      <p>
        We calculate your age in days (not years — days are more dramatic) and
        find celebrities, artists, scientists, and historical figures who died
        at a younger age. The data comes from Wikidata, covering thousands of
        notable people throughout history.
      </p>

      <h3>Why?</h3>
      <p>
        Tom Lehrer once quipped: <em>"It is a sobering thought that when Mozart
        was my age, he had been dead for two years."</em> This site flips that
        idea — instead of feeling inadequate about achievements, celebrate the
        simple fact that you're still breathing.
      </p>

      <p>
        Every day is a small victory. You've outlived emperors, rock stars, and
        at least one circus performer.
      </p>

      <h3>Credits</h3>
      <p>
        Built by Justin Rowles. Data sourced from Wikidata.
        No celebrities were harmed in the making of this site (they were already dead).
      </p>

      <button onClick={onBack}>← Back</button>
    </div>
  )
}

export default About
