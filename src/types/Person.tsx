export type Person = {
  personLabel: string;     // The label/name of the person
  birth_date: string;      // Birth date in ISO format (e.g., "1844-10-23T00:00:00Z")
  death_date?: string;     // Optional death date (if available), in ISO format
  wikipedia_article?: string;  // Optional Wikipedia article URL
  profession: string;  // Optional Wikipedia article URL
  days_old_at_death: number
};

