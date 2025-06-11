import { MCPServer } from "@modelcontextprotocol/server";
import { KlaviyoTransport } from "@modelcontextprotocol/klaviyo-transport";

let server;                                // persisted between requests

export default {
  async fetch(request, env, ctx) {
    if (!server) {                         // cold-start initialisation
      const transport = new KlaviyoTransport(env.KLAVIYO_API_KEY);
      server = new MCPServer();
      await server.connect(transport);
    }
    return server.handleRequest(request, env, ctx);
  },
};
