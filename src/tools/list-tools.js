import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const listTools = [
      {
        name: "get_lists",
        description: "Get all lists",
        schema: {
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ page_size, page_cursor }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getLists(params);
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
        name: "get_list",
        description: "Get a specific list by ID",
        schema: {
          list_id: z.string().describe("The ID of the list to retrieve")
        },
        handler: async ({ list_id }) => {
          try {
            const result = await klaviyoClient.getList(list_id);
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
        name: "create_list",
        description: "Create a new list",
        schema: {
          name: z.string().describe("Name of the list")
        },
        handler: async ({ name }) => {
          try {
            const data = {
              data: {
                type: "list",
                attributes: {
                  name
                }
              }
            };
            
            const result = await klaviyoClient.createList(data);
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
        name: "update_list",
        description: "Update an existing list",
        schema: {
          list_id: z.string().describe("The ID of the list to update"),
          name: z.string().describe("New name for the list")
        },
        handler: async ({ list_id, name }) => {
          try {
            const data = {
              data: {
                type: "list",
                id: list_id,
                attributes: {
                  name
                }
              }
            };
            
            const result = await klaviyoClient.updateList(list_id, data);
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
        name: "delete_list",
        description: "Delete a list",
        schema: {
          list_id: z.string().describe("The ID of the list to delete")
        },
        handler: async ({ list_id }) => {
          try {
            await klaviyoClient.deleteList(list_id);
            return {
              content: [{ type: "text", text: `List ${list_id} successfully deleted` }]
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
        name: "get_list_profiles",
        description: "Get profiles in a list",
        schema: {
          list_id: z.string().describe("The ID of the list"),
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ list_id, page_size, page_cursor }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getListProfiles(list_id, params);
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
        name: "add_profiles_to_list",
        description: "Add profiles to a list",
        schema: {
          list_id: z.string().describe("The ID of the list"),
          profile_ids: z.array(z.string()).describe("Array of profile IDs to add to the list")
        },
        handler: async ({ list_id, profile_ids }) => {
          try {
            const data = {
              data: profile_ids.map(id => ({
                type: "profile",
                id
              }))
            };
            
            const result = await klaviyoClient.addProfilesToList(list_id, data);
            return {
              content: [{ type: "text", text: `Successfully added ${profile_ids.length} profiles to list ${list_id}` }]
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
        name: "remove_profiles_from_list",
        description: "Remove profiles from a list",
        schema: {
          list_id: z.string().describe("The ID of the list"),
          profile_ids: z.array(z.string()).describe("Array of profile IDs to remove from the list")
        },
        handler: async ({ list_id, profile_ids }) => {
          try {
            const data = {
              data: profile_ids.map(id => ({
                type: "profile",
                id
              }))
            };
            
            const result = await klaviyoClient.removeProfilesFromList(list_id, data);
            return {
              content: [{ type: "text", text: `Successfully removed ${profile_ids.length} profiles from list ${list_id}` }]
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
