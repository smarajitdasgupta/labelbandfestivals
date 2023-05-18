# Labels, Bands, Festivals

This project displays band record labe at the top level, below that it list out all bands under their management, and below that it displays which festivals they've attended, if any. All entries are sorted alphabetically.

## Description

The application fetches data from an API and renders record labels along with their associated bands and festivals. It provides a visual representation of the relationships between record labels, bands, and festivals.

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/smarajitdasgupta/labelbandfestivals.git`
2. Navigate to the project directory: `cd labelbandfestivals`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`

The application will be running at [http://localhost:3000](http://localhost:3000).

## Usage

Upon running the application, you will see the record labels displayed along with their associated bands. Each band is listed under its respective record label, and the festivals they participate in are shown as well.

- If the data is still being fetched, a "Loading..." message will be displayed.
- If an error occurs during data fetching, an error message will be shown with instructions to refresh the page or try again later.
- Once the data is successfully fetched, the record labels, bands, and festivals will be rendered.

## Technologies Used

- React.js
- TypeScript
- CSS

## API

The project uses an API endpoint to fetch the data:

- [https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals](https://eacp.energyaustralia.com.au/codingtest/api/v1/festivals)
