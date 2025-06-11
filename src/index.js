-import { createServer } from "@modelcontextprotocol/server";
-const transport = new KlaviyoTransport();
-const server    = new MCPServer();
-await server.connect(transport);     // ❌ top-level await triggers the error
-
-export default server;               // also wrong shape for a Module Worker
+import { createServer } from "@modelcontextprotocol/server";
+
+let server;   // will be filled on the first request
+
+export default {
+  async fetch(request, env, ctx) {
+    // First request: spin up and cache the MCP server instance
+    if (!server) {
+      const transport = new KlaviyoTransport(env.KLAVIYO_API_KEY);
+      server = new MCPServer();
+      await server.connect(transport);
+    }
+    return server.handleRequest(request, env, ctx);
+  },
+};
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
