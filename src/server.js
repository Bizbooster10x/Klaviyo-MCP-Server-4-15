import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
    import { klaviyoClient } from './klaviyo-client.js';
    import { 
      profileTools, 
      listTools, 
      eventTools, 
      campaignTools, 
      flowTools, 
      templateTools,
      segmentTools,
      metricTools,
      catalogTools,
      dataPrivacyTools
    } from './tools/index.js';

    // Create an MCP server for Klaviyo API
    const server = new McpServer({
      name: "Klaviyo API",
      version: "2023-12-15",
      description: "MCP Server for interacting with Klaviyo's API"
    });

    // Add API documentation resource
    server.resource(
      "documentation",
      new ResourceTemplate("klaviyo://docs/{section}", { list: undefined }),
      async (uri, { section }) => {
        const docs = {
          "overview": `# Klaviyo API Overview
          
          The Klaviyo API allows you to programmatically access and manage your Klaviyo account data.
          
          ## Base URL
          
          All API requests should be made to: \`https://a.klaviyo.com/api\`
          
          ## Authentication
          
          Klaviyo API uses API keys for authentication. You can generate API keys in your Klaviyo account settings.
          
          ## API Versions
          
          Klaviyo uses date-based API versioning (e.g., 2023-12-15).`,
          
          "profiles": `# Profiles API
          
          Profiles represent individuals in your Klaviyo account. Each profile can have properties, metrics, and be part of segments and lists.
          
          ## Endpoints
          
          - GET /api/profiles
          - POST /api/profiles
          - GET /api/profiles/{profile_id}
          - PATCH /api/profiles/{profile_id}
          - DELETE /api/profiles/{profile_id}`,
          
          "lists": `# Lists API
          
          Lists are static collections of profiles that you can use for sending campaigns and flows.
          
          ## Endpoints
          
          - GET /api/lists
          - POST /api/lists
          - GET /api/lists/{list_id}
          - PATCH /api/lists/{list_id}
          - DELETE /api/lists/{list_id}
          - GET /api/lists/{list_id}/profiles
          - POST /api/lists/{list_id}/relationships/profiles`,
          
          "events": `# Events API
          
          Events represent actions taken by profiles, such as viewing a product, placing an order, or opening an email.
          
          ## Endpoints
          
          - GET /api/events
          - POST /api/events
          - GET /api/events/{event_id}`,
          
          "campaigns": `# Campaigns API
          
          Campaigns are one-time email or SMS sends to a specific audience.
          
          ## Endpoints
          
          - GET /api/campaigns
          - POST /api/campaigns
          - GET /api/campaigns/{campaign_id}
          - PATCH /api/campaigns/{campaign_id}
          - DELETE /api/campaigns/{campaign_id}
          - POST /api/campaigns/{campaign_id}/send`,
          
          "flows": `# Flows API
          
          Flows are automated sequences of messages triggered by specific events or conditions.
          
          ## Endpoints
          
          - GET /api/flows
          - POST /api/flows
          - GET /api/flows/{flow_id}
          - PATCH /api/flows/{flow_id}
          - DELETE /api/flows/{flow_id}
          - POST /api/flows/{flow_id}/actions/update-status`,
          
          "segments": `# Segments API
          
          Segments are dynamic groups of profiles that match specific criteria.
          
          ## Endpoints
          
          - GET /api/segments
          - POST /api/segments
          - GET /api/segments/{segment_id}
          - PATCH /api/segments/{segment_id}
          - DELETE /api/segments/{segment_id}`,
          
          "metrics": `# Metrics API
          
          Metrics are the events and properties that Klaviyo tracks for your account.
          
          ## Endpoints
          
          - GET /api/metrics
          - GET /api/metrics/{metric_id}
          - GET /api/metrics/{metric_id}/aggregate
          - GET /api/metrics/{metric_id}/timeline`,
          
          "templates": `# Templates API
          
          Templates are reusable email designs that can be used in campaigns and flows.
          
          ## Endpoints
          
          - GET /api/templates
          - POST /api/templates
          - GET /api/templates/{template_id}
          - PATCH /api/templates/{template_id}
          - DELETE /api/templates/{template_id}
          - POST /api/templates/{template_id}/clone
          - POST /api/templates/{template_id}/render`,
          
          "catalogs": `# Catalogs API
          
          Catalogs store product information that can be used in campaigns and flows.
          
          ## Endpoints
          
          - GET /api/catalogs
          - GET /api/catalogs/{catalog_id}
          - GET /api/catalogs/{catalog_id}/items
          - POST /api/catalogs/{catalog_id}/items
          - GET /api/catalogs/{catalog_id}/items/{item_id}
          - PATCH /api/catalogs/{catalog_id}/items/{item_id}
          - DELETE /api/catalogs/{catalog_id}/items/{item_id}`,
          
          "data-privacy": `# Data Privacy API
          
          The Data Privacy API allows you to manage data deletion requests and compliance with privacy regulations.
          
          ## Endpoints
          
          - POST /api/data-privacy/deletion-requests
          - GET /api/data-privacy/deletion-requests
          - GET /api/data-privacy/deletion-requests/{request_id}`
        };
        
        if (!section || !docs[section]) {
          return {
            contents: [{
              uri: uri.href,
              text: `Available documentation sections: ${Object.keys(docs).join(', ')}`
            }]
          };
        }
        
        return {
          contents: [{
            uri: uri.href,
            text: docs[section]
          }]
        };
      }
    );

    // Register all tools
    [
      ...profileTools,
      ...listTools,
      ...eventTools,
      ...campaignTools,
      ...flowTools,
      ...templateTools,
      ...segmentTools,
      ...metricTools,
      ...catalogTools,
      ...dataPrivacyTools
    ].forEach(tool => {
      server.tool(
        tool.name,
        tool.schema,
        tool.handler,
        { description: tool.description }
      );
    });

    export { server };
