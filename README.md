Hello there 👋 <br/>
Welcome to my Scraper repo. <br/>

## Introduction

Scraper is a mini app that allows you to upload a CSV file with search keywords, and then use those to scrape the search result pages returned from Google.

Below is a example of the CSV file:

```csv
macbook air m2
laptop
iphone
iphone 15 pink
best place to travel in Vietnam
```

Note: Each keyword must be separated by a new line <br/>
The CSV can contain a maximum of 100 keywords and must be smaller than 1KB </br>

## Demo

[Demo video](https://vimeo.com/871844582?share=copy)

## How to get started?

To run the application from your local, follow the below steps:

1. Prepare a new instance of PostgreSQL

2. Prepare the environment variables

- For the Web, place the following content in the `.env.local` file in `apps/web` folder
```bash
NEXT_PUBLIC_BASE_API_URL="http://localhost:5001"
```

- For the API, place the following content in the `.env` file in `apps/api` folder
```bash
DATABASE_URL="postgres://user:password@host/dbname"
CORS_WHITELIST="http://localhost:3002"
FILE_UPLOAD_MAX_KEYWORD_LIMIT=100
FILE_UPLOAD_MAX_SIZE=1024 #in bytes
```

Note: 
- By default, the Web run on port 3002 and API will run on port 5001
- The API server need to whitelist the address of web app (http://localhost:3002)

3. Install dependencies with NPM (run at root folder)
```bash
npm i
```
4. Run the Prisma migration to generate the schema
```bash
npm run migrate:dev
```
5. Run Web and API in development mode
```bash
npm run dev
```

6. Visit `http://locahost:3002` and `http://localhost:5001` to check out Web and API

## Other resources

#### Scraping techniques

The following techniques have been considered to avoid Google from blocking the request:

- **Randomizing user agents**: Apply a random user agent to each request
- **Rotating proxy**: Use a pool of proxy that can be rotated. If a scrape request fail, the same request can be retried with proxies from the pool. 

Note: The proxy strategy is not currently used in the app, but it can be considered as an improvement in the future <br/>

At the moment, application can handle only upto 10 keywords in 1 file

#### Schema design

The schema design diagram can be found in [Scraper schema diagram](https://dbdiagram.io/d/Scrapper-651796d5ffbf5169f0c55e12)

#### API specifications

API specifications can be found at [Wiki - Scraper API Specifications](https://github.com/nhantran3395/scrapper/wiki/API-specifications)
