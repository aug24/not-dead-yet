#!/bin/bash

# Output file
OUTPUT_FILE="wikidata_person_data.csv"
LIMIT=1  # Number of results per query
OFFSET=0    # Starting offset
TOTAL_RESULTS=1  # Total results to fetch
QUERY_URL="https://query.wikidata.org/sparql"
TEMP_FILE=temp
TEMP_FILE2=temp2

# SPARQL query template
SPARQL_QUERY='SELECT ?person ?personLabel ?birth_date ?death_date ?wikipedia_link ?image ?abstract WHERE { ?person wdt:P31 wd:Q5. OPTIONAL { ?person wdt:P569 ?birth_date. } OPTIONAL { ?person wdt:P570 ?death_date. } OPTIONAL { ?wikipedia_link schema:about ?person ; schema:inLanguage "en" ; schema:isPartOf <https://en.wikipedia.org/>. } OPTIONAL { ?person wdt:P18 ?image. } OPTIONAL { ?wikipedia_article schema:about ?person ; schema:inLanguage "en" ; schema:isPartOf <https://en.wikipedia.org/>. ?wikipedia_article schema:text ?abstract. } SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". } } LIMIT ${LIMIT} OFFSET ${OFFSET}'

# Fetch data in chunks
while [ $OFFSET -lt $TOTAL_RESULTS ]; do
  echo "Fetching records starting at offset $OFFSET..."

  # Properly encode the query
  ENCODED_QUERY=$(echo "$SPARQL_QUERY" | sed "s/\${LIMIT}/$LIMIT/g" | sed "s/\${OFFSET}/$OFFSET/g" | jq -sRr @uri)

  # Make the request and process results
  curl -s -G --data-urlencode "query=$ENCODED_QUERY" \
    -H "Accept: application/json" \
    "$QUERY_URL" > "$TEMP_FILE"

cat $TEMP_FILE | jq -r '
    .results.bindings[] | 
    {
      person: .person.value,
      label: .personLabel.value,
      birth_date: (.birth_date.value // ""),
      death_date: (.death_date.value // ""),
      wikipedia_link: (.wikipedia_link.value // ""),
      image: (.image.value // ""),
      abstract: (.abstract.value | gsub("\n"; " ") // "")  # Replace newlines with spaces
    }
    ' > "$TEMP_FILE2"

  # Increment offset
  OFFSET=$((OFFSET + LIMIT))
done

# Process and group data by age at death
cat "$TEMP_FILE2" | jq -r '
map(
  .age_at_death_days = (
    if .birth_date != "" and .death_date != "" then
      ((.death_date | fromdateiso8601) - (.birth_date | fromdateiso8601)) / 86400
    else null end
  )
) |
group_by(.age_at_death_days) |
map({
  age_at_death_days: (.[0].age_at_death_days // "Unknown"),
  people: map(del(.age_at_death_days))
})' > "$OUTPUT_FILE"

# Cleanup

echo "Data grouped by age at death has been saved to $OUTPUT_FILE"

