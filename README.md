# Database Switcher

`db-switcher` is a TypeScript-based NPM package that allows you to dynamically switch between PostgreSQL, MySQL, and MongoDB databases. It handles connection pooling, error handling, and can be used to easily manage different database connections based on your application's requirements.

## Features

- **Dynamic Database Switching**: Supports PostgreSQL, MySQL, and MongoDB.
- **Connection Pooling**: Manages and reuses database connections.
- **Error Handling**: Properly handles and logs errors related to database connections.
- **Retry Logic**: Includes optional retry logic for connection failures.

## Installation

To install the package, run:

```bash
npm install db-switcher
```

## Usage

### Configure Your Databases

Create a configuration object for the database you want to connect to. The configuration should include the type of database and the necessary connection details.

#### Database Configuration Object

```ts
import { DbConfig, dbSwitcher } from "db-switcher";

// PostgreSQL Configuration
const postgresConfig: DbConfig = {
  type: "postgres",
  config: {
    user: "admin",
    password: "password",
    host: "localhost",
    database: "test",
    port: 5432,
  },
};

// MySQL Configuration
const mysqlConfig: DbConfig = {
  type: "mysql",
  config: {
    user: "root",
    password: "password",
    host: "localhost",
    database: "test_db",
    port: 3306,
  },
};

// MongoDB Configuration
const mongodbConfig: DbConfig = {
  type: "mongodb",
  config: {
    uri: "mongodb://localhost:27017/test",
    options: { useNewUrlParser: true, useUnifiedTopology: true },
  },
};

const dbConnection = await dbSwitcher("ur-dbConfiguration");
```

## API

### `dbSwitcher(dbConfig: DbConfig): Promise<any>`

- **dbConfig**: An object containing the database type and configuration.
  - `type`: The type of database (`'postgres'`, `'mysql'`, or `'mongodb'`).
  - `config`: Configuration object specific to the database type.

Returns a `Promise` that resolves to a database connection object.
