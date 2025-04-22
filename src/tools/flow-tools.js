import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const flowTools = [
      {
        name: "get_flows",
        description: "Get a list of flows with optional filtering",
        schema: {
          filter: z.string().optional().describe("Filter criteria in the format 'field:operator:value'"),
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ filter, page_size, page_cursor }) => {
          try {
            const params = {};
            if (filter) params.filter = filter;
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getFlows(params);
            return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "get_flow",
        description: "Get a specific flow by ID",
        schema: {
          flow_id: z.string().describe("The ID of the flow to retrieve")
        },
        handler: async ({ flow_id }) => {
          try {
            const result = await klaviyoClient.getFlow(flow_id);
            return {
              content: [{ type: "text", text: JSON.stringify(result, null, 2) }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error: ${error.message}` }],
              isError: true
            };
          }
        }
      },
      {
        name: "update_flow_status",
        description: "Update the status of a flow (draft, manual, live)",
        schema: {
          flow_id: z.string().describe("The ID of the flow to update"),
          status: z.enum(["draft", "manual", "live"]).describe("New status for the flow")
        },
        handler: async ({ flow_id, status }) => {
          try {
            const result = await klaviyoClient.updateFlowStatus(flow_id, status);
            return {
              content: [{ type: "text", text: `Flow ${flow_id} status updated to ${status}` }]
            };
          } catch (error) {
            return {
              content: [{ type: "text", text: `Error: ${error.message}` }],
              isError: true
            };
          }
        }
      }
    ];
