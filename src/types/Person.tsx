export type Person = {
  i: number[];     // The label/name of the person represented as a series of ids
  w?: string;  // Optional Wikipedia article URL
  s: string;  // short version of profession
  o?: number; // days old at death
  d?: number; // birth date in days since epoch
};

