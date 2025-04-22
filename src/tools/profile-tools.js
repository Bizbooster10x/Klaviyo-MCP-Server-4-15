import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const profileTools = [
      {
        name: "get_profiles",
        description: "Get a list of profiles with optional filtering",
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
            
            const result = await klaviyoClient.getProfiles(params);
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
        name: "get_profile",
        description: "Get a specific profile by ID",
        schema: {
          profile_id: z.string().describe("The ID of the profile to retrieve")
        },
        handler: async ({ profile_id }) => {
          try {
            const result = await klaviyoClient.getProfile(profile_id);
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
        name: "create_profile",
        description: "Create a new profile",
        schema: {
          email: z.string().email().optional().describe("Email address for the profile"),
          phone_number: z.string().optional().describe("Phone number for the profile"),
          external_id: z.string().optional().describe("External ID for the profile"),
          first_name: z.string().optional().describe("First name"),
          last_name: z.string().optional().describe("Last name"),
          properties: z.record(z.any()).optional().describe("Additional properties as a JSON object")
        },
        handler: async ({ email, phone_number, external_id, first_name, last_name, properties }) => {
          try {
            if (!email && !phone_number && !external_id) {
              throw new Error("At least one of email, phone_number, or external_id is required");
            }
            
            const data = {
              data: {
                type: "profile",
                attributes: {
                  ...(email && { email }),
                  ...(phone_number && { phone_number }),
                  ...(external_id && { external_id }),
                  properties: {
                    ...(first_name && { first_name }),
                    ...(last_name && { last_name }),
                    ...(properties || {})
                  }
                }
              }
            };
            
            const result = await klaviyoClient.createProfile(data);
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
        name: "update_profile",
        description: "Update an existing profile",
        schema: {
          profile_id: z.string().describe("The ID of the profile to update"),
          email: z.string().email().optional().describe("Email address for the profile"),
          phone_number: z.string().optional().describe("Phone number for the profile"),
          external_id: z.string().optional().describe("External ID for the profile"),
          first_name: z.string().optional().describe("First name"),
          last_name: z.string().optional().describe("Last name"),
          properties: z.record(z.any()).optional().describe("Additional properties as a JSON object")
        },
        handler: async ({ profile_id, email, phone_number, external_id, first_name, last_name, properties }) => {
          try {
            const attributes = {};
            if (email) attributes.email = email;
            if (phone_number) attributes.phone_number = phone_number;
            if (external_id) attributes.external_id = external_id;
            
            const profileProperties = {};
            if (first_name) profileProperties.first_name = first_name;
            if (last_name) profileProperties.last_name = last_name;
            if (properties) Object.assign(profileProperties, properties);
            
            if (Object.keys(profileProperties).length > 0) {
              attributes.properties = profileProperties;
            }
            
            const data = {
              data: {
                type: "profile",
                id: profile_id,
                attributes
              }
            };
            
            const result = await klaviyoClient.updateProfile(profile_id, data);
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
        name: "delete_profile",
        description: "Delete a profile",
        schema: {
          profile_id: z.string().describe("The ID of the profile to delete")
        },
        handler: async ({ profile_id }) => {
          try {
            await klaviyoClient.deleteProfile(profile_id);
            return {
              content: [{ type: "text", text: `Profile ${profile_id} successfully deleted` }]
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
