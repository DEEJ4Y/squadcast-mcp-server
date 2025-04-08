# MCP Server for Squadcast

This is a basic MCP Server for Squadcast. It is intended for personal use only.

Available tools:

- Authenticate with OAuth (Configure your refresh token in `config.json`.)
- List Teams
- Select Team
- Who is on call?
- Get Incidents
- Acknowledge Incidents
- Resolve Incidents

## Installation

Build using NodeJS v20.19.0

1. Clone the repository
2. Install dependencies

   ```bash
   npm install
   ```

3. Rebuild Typescript dependencies

   ```bash
   npm rebuild typescript
   ```

4. Run the dev server

   ```bash
   npm run dev
   ```

Build files (MCP Server) will be in the `./dist` directory. You can use this to connect to your MCP Client.

## Connecting with Claude Desktop

Refer to the ["Testing your server with Claude for Desktop"](https://modelcontextprotocol.io/quickstart/server) to set up a local server with Claude Desktop.

## Configuration

I used the following personal preferences for Claude Desktop:

```
Help me with using Squadcast.

Ensure I am authenticated before using tools.

Once authenticated, ensure a team is selected.

Once a team is selected, answer questions related to the selected team only.

If searching for incidents, by default don't use periods of more than 1 day.
```
