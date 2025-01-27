# not-dead-yet


# Todo

Add more data.  

Add different phrases, randomised.

Try to work out a better way of establishing "notable"

Publish at its own address

Add Google Ads




To filter Wikidata queries by specific professions using SPARQL, you'll need the corresponding Wikidata QIDs (unique identifiers) for each profession. Here are some notable professions along with their QIDs that you can use in your queries:

```
Profession	Wikidata QID	Wikidata Link
Actors	Q33999	Actor (Q33999)
Athletes	Q2066131	Athlete (Q2066131)
Musicians	Q639669	Musician (Q639669)
Scientists	Q901	Scientist (Q901)
Politicians	Q82955	Politician (Q82955)
Astronauts	Q11631	Astronaut (Q11631)
Circus Performers	Q17307272	Circus Performer (Q17307272)
Explorers	Q1179951	Explorer (Q1179951)
Inventors	Q482980	Inventor (Q482980)
Philosophers	Q4964182	Philosopher (Q4964182)
Authors	Q482980	Author (Q482980)
Poets	Q49757	Poet (Q49757)
Painters	Q1028181	Painter (Q1028181)
Directors	Q2526255	Film Director (Q2526255)
Mathematicians	Q170790	Mathematician (Q170790)
Engineers	Q81096	Engineer (Q81096)
Medical Researchers	Q901	Scientist (Q901)
Comedians	Q10800557	Comedian (Q10800557)
Dancers	Q11660	Dancer (Q11660)
Magicians	Q82955	Magician (Q82955)
Royalty	Q11641	Monarch (Q11641)
Revolutionaries	Q1792450	Revolutionary (Q1792450)
Military Leaders	Q189290	Military Personnel (Q189290)
Chess Players	Q10873124	Chess Player (Q10873124)
Racers	Q2066131	Athlete (Q2066131)
Mountaineers	Q2306091	Mountaineer (Q2306091)
Chefs	Q177195	Chef (Q177195)
Fashion Designers	Q15231611	Fashion Designer (Q15231611)
Entrepreneurs	Q131524	Entrepreneur (Q131524)
TV Hosts	Q947873	Television Presenter (Q947873)
Influencers	Q1930187	Influencer (Q1930187)
Voice Actors	Q2405480	Voice Actor (Q2405480)
Spies	Q82955	Spy (Q82955)
Mythological Figures	Q22988604	Mythological Figure (Q22988604)
Religious Leaders	Q3392853	Religious Leader (Q3392853)
```


```
SELECT ?person ?personLabel ?birth_date ?death_date ?wikipedia_article
WHERE {
       ?person wdt:P31 wd:Q5;         # Instance of human (Q5)
       wdt:P106 wd:Q33999;              # Occupation is actor
       wdt:P570 ?death_date;          # Death date (P570)
        { ?wikipedia_article schema:about ?person ; schema:inLanguage "en" ; schema:isPartOf <https://en.wikipedia.org/> }

  OPTIONAL { ?person wdt:P569 ?birth_date. }  # Birth date (P569)
  FILTER EXISTS {
    ?person p:P570 ?death_statement.     # Access the death date statement
    ?death_statement wikibase:rank wikibase:PreferredRank. # Only preferred rank
  }
  FILTER EXISTS {
    ?person p:P569 ?birth_statement.        # Access the birth date statement
    ?birth_statement wikibase:rank wikibase:PreferredRank. # Only preferred rank
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
LIMIT 1000
```


