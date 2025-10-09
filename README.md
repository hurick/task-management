# Task Management API

API project for a To-Do List system using Node.js. Implements the essential features of a task manager for learning and portfolio purposes.

## Requirements

- Node.js v22.x
- npm v11.x

## Installation

1. Clone the repository
```bash
git clone https://github.com/hurick/task-management.git
cd task-management
```

2. Install dependencies
```bash
npm install
```

## Development

To run the project in development mode with auto-reload:
```bash
npm run dev
```

The server will start on port 3333.

## Available Scripts

- `npm run dev` - Start the development server with auto-reload
- `npm run clear` - Remove node_modules and reinstall dependencies
- `npm run clear:r` - Remove node_modules, reinstall dependencies, and start dev server

## Project Structure

```
src/
  ├── @types/              # TypeScript type definitions
  │   ├── database.types.ts
  │   ├── requests.types.ts
  │   ├── route.types.ts
  │   └── tasks.types.ts
  ├── database/            # Database management
  │   └── Database.ts
  ├── middlewares/         # Express-like middlewares
  │   └── stream-to-json.ts
  ├── routes/              # API route handlers
  │   └── tasks.ts
  ├── utils/               # Utility functions
  │   ├── build-route-path.ts
  │   └── parse-query-params.ts
  ├── routes.ts            # Route registration
  └── server.ts            # Application entry point
```

## API Endpoints

### Tasks

- `POST /tasks` - Create a new task
  - Body: `{ "title": string, "description": string }`
  - Returns: Created task with ID and timestamps

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Hurick Krügner