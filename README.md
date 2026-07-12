# MongoDB Kit

A collection of tools for working with MongoDB from the command line and AI clients.

MongoDB Kit provides a shared core library, a command-line interface, and a local Model Context Protocol (MCP) server, all built on top of the official MongoDB Node.js driver.

## Packages

```text
packages/
├── core
├── cli
└── mcp-local
```

### `@mongodb-kit/core`

Shared MongoDB library that wraps the official MongoDB driver.

Features

* Connection management
* Database management
* Collection management
* CRUD operations
* Aggregation pipelines
* Index management

### `@mongodb-kit/cli`

Command-line interface built on top of the shared core.

Supported commands

* List collections
* Find documents
* Insert documents
* Update documents
* Delete documents
* Aggregate documents
* List indexes
* Create indexes
* Drop indexes

### `@mongodb-kit/mcp-local`

A local MCP server that enables AI assistants to interact with MongoDB through Tools, Resources, and Prompts.

---

# Features

## Tools

### Database

* `list_collections`

### Collection

* `find_documents`
* `insert_document`
* `update_documents`
* `delete_documents`
* `aggregate_documents`

### Indexes

* `list_indexes`
* `create_index`
* `drop_index`

---

## Resources

### Database

```text
mongodb://{database}
```

Returns database information and available collections.

### Collection Sample

```text
mongodb://{database}/{collection}/sample
```

Returns the first 10 documents from a collection.

### Collection Indexes

```text
mongodb://{database}/{collection}/indexes
```

Returns all indexes for a collection.

### Collection Schema

```text
mongodb://{database}/{collection}/schema
```

Infers a schema from the first 20 documents.

---

## Prompts

* `mongodb-query-helper`
* `aggregation-builder`
* `explain-pipeline`
* `schema-summary`
* `query-optimizer`
* `index-advisor`

---

# Architecture

```text
                 AI Client
                     │
             ┌───────▼────────┐
             │   MCP Local    │
             └───────┬────────┘
                     │
             ┌───────▼────────┐
             │ MongoDB Core   │
             └───────┬────────┘
                     │
             ┌───────▼────────┐
             │ MongoDB Driver │
             └───────┬────────┘
                     │
                 MongoDB
```

The CLI and MCP server share the same core library, ensuring MongoDB logic is implemented only once.

---

# Installation

```bash
bun install
```

---

# Configuration

Create a `.env` file in the project root.

```env
MONGODB_URI=mongodb://localhost:27017
```

---

# Running the CLI

```bash
bun packages/cli/src/index.ts
```

---

# Running the Local MCP Server

```bash
bun packages/mcp-local/src/index.ts
```

To test with the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector bun packages/mcp-local/src/index.ts
```

---

# Project Structure

```text
packages/
│
├── core/
│   ├── managers/
│   ├── mongo.ts
│   └── index.ts
│
├── cli/
│   ├── commands/
│   └── index.ts
│
└── mcp-local/
    ├── src/
    │   ├── tools/
    │   ├── resources/
    │   ├── prompts/
    │   ├── context.ts
    │   ├── server.ts
    │   └── index.ts
```

---

# Design Principles

* Shared MongoDB logic lives in `@mongodb-kit/core`.
* The CLI and MCP server delegate all database operations to the core.
* The MCP server is stateless.
* Resources provide read-only access to MongoDB metadata.
* Prompts offer reusable AI workflows without duplicating business logic.
* Follow the official MongoDB driver's API where practical.

---

# Roadmap

* [x] Core library
* [x] CLI
* [x] Local MCP server
* [x] MCP Tools
* [x] MCP Resources
* [x] MCP Prompts
* [ ] Tests
* [ ] CI/CD
* [ ] Documentation improvements
* [ ] Publish packages
* [ ] Remote MCP server
* [ ] MongoDB Atlas support

---


