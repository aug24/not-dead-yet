export type Person = {
  i: number[];     // The label/name of the person represented as a series of ids
  b: string;      // Birth date in ISO format (e.g., "1844-10-23T00:00:00Z")
  w?: string;  // Optional Wikipedia article URL
  s: string;  // short version of profession
  o?: number
};

