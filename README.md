# MCP Server for Squadcast

This is a basic MCP Server for Squadcast. It is intended for personal use only.

## Video Demo

- [Status Page Update](https://drive.google.com/file/d/1fCwRT6duf6UtqbWMhxt87qIwmQD5y1Je/view?usp=sharing)

Available tools:

- Authenticate with OAuth (Configure your refresh token in `config.json`.)
- List Teams
- Select Team
- Who is on call?
- Get Incidents
- Acknowledge Incidents
- Resolve Incidents
- Update Status Page
- Create Schedules

## Installation - For local development

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

Refer to the ["Testing your server with Claude for Desktop"](https://modelcontextprotocol.io/quickstart/server) to set up a local server with Claude Desktop. Point it to the dist/index.js file on your computer.

## Configuration

I used the following personal preferences for Claude Desktop. Replace Your Team Name in the template:

```
Help me with using Squadcast.

Ensure I am authenticated before using tools.

Once authenticated, ensure a team is selected. Select <Your Team Name Here> Team by default.

Once a team is selected, answer questions related to the selected team only.

If searching for incidents, don't use periods of more than 1 day. To get the latest incidents, you can use a future end date/time

When greeted, check for any triggered incidents and let the user know. Also remind the user of any acknowledged incidents (not been resolved yet.)

When creating resources, guide the user through the options they have and request for their inputs or confirmations before creation.
```
