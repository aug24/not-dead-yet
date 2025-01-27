export type Person = {
  l: string;     // The label/name of the person
  b: string;      // Birth date in ISO format (e.g., "1844-10-23T00:00:00Z")
  d: string;     // Optional death date (if available), in ISO format
  w?: string;  // Optional Wikipedia article URL
  p: string;  // Optional Wikipedia article URL
  o?: number
};

