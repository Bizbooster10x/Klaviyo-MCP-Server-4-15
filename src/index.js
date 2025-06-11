import { MCPServer, createServer } from "@modelcontextprotocol/server";
import { KlaviyoTransport } from "@klaviyo/mcp-klaviyo-transport";

let server;                               // cache across requests

export default {
  async fetch(request, env, ctx) {
    if (!server) {                       // cold-start once
      const transport = new KlaviyoTransport(env.KLAVIYO_API_KEY);
      server = new MCPServer();
      await server.connect(transport);
    }
    return server.handleRequest(request, env, ctx);
#!/usr/bin/env node
    import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
    import { server } from './server.js';
    import dotenv from 'dotenv';

    // Load environment variables
    dotenv.config();

    console.log('Starting Klaviyo API MCP server...');

    // Start receiving messages on stdin and sending messages on stdout
    const transport = new StdioServerTransport();
    await server.connect(transport);
