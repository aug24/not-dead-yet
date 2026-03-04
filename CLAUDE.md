# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Not Dead Yet" is a React/TypeScript web application that shows users which celebrities they have outlived based on their birthdate. Users enter their date of birth and the app displays celebrities who died at a younger age (in days).

## Commands

```bash
npm run dev       # Start Vite dev server with hot reload
npm run build     # TypeScript compile + Vite build
npm run lint      # ESLint
npm run publish   # Build and deploy to local sibling directories (aug24.co.uk, notdeadyet.uk)
```

## Architecture

### Data Model
- Celebrity data is stored in `src/data/peopleByDay.json` - a map from "days old at death" to arrays of Person objects
- Person objects use compressed fields to minimize data size:
  - `i`: array of name word IDs (resolved via `src/data/idToNameMap.json`)
  - `s`: profession codes (e.g., "1"=actor, "2"=writer, "3"=athlete - see `src/functions/GetProfession.tsx`)
  - `d`: birth date as days since epoch (Jan 1, 1900)
  - `w`: optional Wikipedia article slug (if different from name)

### Key Components
- `MainContent.tsx`: Handles birthdate input and calculates user's age in days
- `CarouselCeleb.tsx`: Displays matching celebrities in a carousel with Wikipedia links and social sharing
- `GetAllCelebs.tsx`: Finds celebrities who died at fewer days than the user's current age

### Data Pipeline
- `scripts/fetchWikidata.js` / `fetch_wikidata.sh`: Fetch celebrity data from Wikidata SPARQL
- `scripts/prepare_data.js`: Process and compress data for the app
- See README.md for Wikidata SPARQL query patterns and profession QIDs

### Deployment
The app deploys to S3/CloudFront (see `cloudformation/` for infrastructure). The `npm run publish` script builds and copies to sibling site directories.
