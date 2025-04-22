import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const eventTools = [
      {
        name: "get_events",
        description: "Get a list of events with optional filtering",
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
            
            const result = await klaviyoClient.getEvents(params);
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
        name: "get_event",
        description: "Get a specific event by ID",
        schema: {
          event_id: z.string().describe("The ID of the event to retrieve")
        },
        handler: async ({ event_id }) => {
          try {
            const result = await klaviyoClient.getEvent(event_id);
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
        name: "create_event",
        description: "Create a new event",
        schema: {
          metric: z.object({
            name: z.string().describe("Name of the metric"),
            service: z.string().optional().describe("Service name")
          }).describe("Metric information"),
          profile: z.object({
            email: z.string().email().optional().describe("Email address"),
            phone_number: z.string().optional().describe("Phone number"),
            external_id: z.string().optional().describe("External ID"),
            properties: z.record(z.any()).optional().describe("Profile properties")
          }).describe("Profile information"),
          properties: z.record(z.any()).optional().describe("Event properties"),
          time: z.string().optional().describe("ISO timestamp for the event")
        },
        handler: async ({ metric, profile, properties, time }) => {
          try {
            if (!profile.email && !profile.phone_number && !profile.external_id) {
              throw new Error("At least one of email, phone_number, or external_id is required");
            }
            
            const data = {
              data: {
                type: "event",
                attributes: {
                  metric: {
                    name: metric.name,
                    ...(metric.service && { service: metric.service })
                  },
                  profile: {
                    ...(profile.email && { email: profile.email }),
                    ...(profile.phone_number && { phone_number: profile.phone_number }),
                    ...(profile.external_id && { external_id: profile.external_id }),
                    ...(profile.properties && { properties: profile.properties })
                  },
                  ...(properties && { properties }),
                  ...(time && { time })
                }
              }
            };
            
            const result = await klaviyoClient.createEvent(data);
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
      }
    ];
