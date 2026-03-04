import fs from 'fs/promises'; // Promises-based FS module
import fetch from 'node-fetch'; // Fetch API
const occupations = ['Q82955', 'Q937857']; // Example occupation IDs (e.g., writer, painter)

const endpoint = 'https://query.wikidata.org/sparql';

// SPARQL Query Template
const getQuery = (occupation, offset, limit) => `
SELECT ?person ?personLabel ?birth_date ?death_date ?wikipedia_article
WHERE {
  ?person wdt:P31 wd:Q5;          # Instance of human (Q5)
         wdt:P106 wd:${occupation}; # Occupation (dynamic)
         wdt:P570 ?death_date.    # Death date (P570)
  ?wikipedia_article schema:about ?person; 
                    schema:inLanguage "en"; 
                    schema:isPartOf <https://en.wikipedia.org/>.
  OPTIONAL { ?person wdt:P569 ?birth_date. }  # Birth date (P569)
  FILTER EXISTS {
    ?person p:P570 ?death_statement.         # Access the death date statement
    ?death_statement wikibase:rank wikibase:PreferredRank. # Only preferred rank
  }
  FILTER EXISTS {
    ?person p:P569 ?birth_statement.         # Access the birth date statement
    ?birth_statement wikibase:rank wikibase:PreferredRank. # Only preferred rank
  }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
}
LIMIT ${limit}
OFFSET ${offset}
`;

// Fetch data from Wikidata
async function fetchData(query) {
  const url = `${endpoint}?query=${encodeURIComponent(query)}`;
  const headers = {
    'User-Agent': 'Node.js Wikidata Fetcher',
    Accept: 'application/sparql-results+json',
  };
  const response = await fetch(url, { headers });
  if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
  return response.json();
}

// Process data
async function processOccupation(occupation, limit, outputFile) {
  let offset = 0;
  let hasMoreResults = true;
  const results = [];

  console.log(`Fetching data for occupation: ${occupation}`);

  while (hasMoreResults) {
    const query = getQuery(occupation, offset, limit);
    console.log(`Querying offset: ${offset}`);

    try {
      const data = await fetchData(query);
      const bindings = data.results.bindings;

      // Check if there are results
      if (bindings.length > 0) {
        results.push(
          ...bindings.map((item) => ({
            person: item.person.value,
            personLabel: item.personLabel?.value || '',
            birth_date: item.birth_date?.value || '',
            death_date: item.death_date?.value || '',
            wikipedia_article: item.wikipedia_article?.value || '',
          }))
        );
        offset += limit; // Move to the next page
      } else {
        hasMoreResults = false; // No more results
      }
    } catch (error) {
      console.error(`Error fetching data for occupation ${occupation}:`, error);
      hasMoreResults = false; // Stop on error
    }
  }

  // Write results to the output file
  console.log(`Writing ${results.length} records to file: ${outputFile}`);
  await fs.appendFile(outputFile, JSON.stringify(results, null, 2) + ',\n');
}

// Main function
async function main() {
  const limit = 100; // Fetch 100 records per query
  const outputFile = 'wikidata_results.json';

  // Clear or create the output file
  await fs.writeFile(outputFile, '[');

  for (const occupation of occupations) {
    await processOccupation(occupation, limit, outputFile);
  }

  // Close the JSON array
  await fs.appendFile(outputFile, '{}]');
  console.log('Data fetching complete!');
}

main().catch((error) => console.error('Error in main:', error));

