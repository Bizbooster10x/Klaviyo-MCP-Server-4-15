import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const dataPrivacyTools = [
      {
        name: "create_deletion_request",
        description: "Create a new data deletion request",
        schema: {
          email: z.string().email().optional().describe("Email address to delete"),
          phone_number: z.string().optional().describe("Phone number to delete"),
          profile_id: z.string().optional().describe("Profile ID to delete")
        },
        handler: async ({ email, phone_number, profile_id }) => {
          try {
            if (!email && !phone_number && !profile_id) {
              throw new Error("At least one of email, phone_number, or profile_id is required");
            }
            
            const identifiers = [];
            if (email) identifiers.push({ type: "email", value: email });
            if (phone_number) identifiers.push({ type: "phone_number", value: phone_number });
            if (profile_id) identifiers.push({ type: "profile_id", value: profile_id });
            
            const data = {
              data: {
                type: "data-privacy-deletion-request",
                attributes: {
                  identifiers
                }
              }
            };
            
            const result = await klaviyoClient.createDeletionRequest(data);
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
        name: "get_deletion_requests",
        description: "Get a list of data deletion requests",
        schema: {
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ page_size, page_cursor }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getDeletionRequests(params);
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
        name: "get_deletion_request",
        description: "Get a specific data deletion request by ID",
        schema: {
          request_id: z.string().describe("The ID of the deletion request to retrieve")
        },
        handler: async ({ request_id }) => {
          try {
            const result = await klaviyoClient.getDeletionRequest(request_id);
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
