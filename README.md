# not-dead-yet


# Todo

Add more data.  

Try to work out a better way of establishing "notable"

Publish at its own address

Add Google Ads




To filter Wikidata queries by specific professions using SPARQL, you'll need the corresponding Wikidata QIDs (unique identifiers) for each profession. Here are some notable professions along with their QIDs that you can use in your queries:

```
Actor: wd:Q33999
Painter: wd:Q1028181
Writer: wd:Q36180
Musician: wd:Q639669
Politician: wd:Q82955
Scientist: wd:Q901
Athlete: wd:Q2066131
Architect: wd:Q42973
Journalist: wd:Q1930187
Philosopher: wd:Q4964182
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


