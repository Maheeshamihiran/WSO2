# News Admin Panel

React.js frontend for managing news items.

## Setup & Run

1. Start the Ballerina backend:
   ```bash
   cd ../backend
   bal run news_service.bal
   ```

2. Start the React admin panel:
   ```bash
   cd admin
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Features

- Add news with title and content
- View all news items with timestamps
- Delete news items
- Real-time updates

## API Endpoints

- GET `/news/list` - Get all news
- POST `/news/add` - Add new news
- DELETE `/news/{id}` - Delete news by ID