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
- `npm run csv` - Import tasks from CSV file (data.csv)
- `npm run clear` - Remove node_modules and reinstall dependencies
- `npm run clear:r` - Remove node_modules, reinstall dependencies, and start dev server

## Project Structure

```
src/
  ├── @types/              # TypeScript type definitions
  │   ├── database.types.ts
  │   ├── route.types.ts
  │   ├── server.types.ts
  │   └── tasks.types.ts
  ├── database/            # Database management
  │   └── Database.ts
  ├── middlewares/         # HTTP middlewares
  │   └── stream-to-json.ts
  ├── routes/              # API route handlers
  │   └── tasks.ts
  ├── scripts/             # Utility scripts
  │   └── import-csv.ts
  ├── utils/               # Utility functions
  │   ├── build-route-path.ts
  │   └── parse-query-params.ts
  ├── routes.ts            # Route registration
  └── server.ts            # Application entry point
```

## API Endpoints

### Tasks

- `GET /tasks` - List all tasks
  - Query params: `?search=term` (optional) - Filter tasks by title or description
  - Returns: Array of tasks

- `POST /tasks` - Create a new task
  - Body: `{ "title": string, "description": string }`
  - Returns: `{ "data": Task, "message": string }`

- `PUT /tasks/:id` - Update a task
  - Body: `{ "title": string, "description": string }`
  - Returns: `{ "data": Task | null, "message": string }`

- `DELETE /tasks/:id` - Delete a task
  - Returns: `{ "success": boolean, "message": string }`

- `PATCH /tasks/:id/complete` - Toggle task completion status
  - Returns: `{ "data": Task | null, "message": string }`

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

Hurick Krügner