import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const campaignTools = [
      {
        name: "get_campaigns",
        description: "Get a list of campaigns with optional filtering",
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
            
            const result = await klaviyoClient.getCampaigns(params);
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
        name: "get_campaign",
        description: "Get a specific campaign by ID",
        schema: {
          campaign_id: z.string().describe("The ID of the campaign to retrieve")
        },
        handler: async ({ campaign_id }) => {
          try {
            const result = await klaviyoClient.getCampaign(campaign_id);
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
        name: "create_campaign",
        description: "Create a new campaign",
        schema: {
          name: z.string().describe("Name of the campaign"),
          template_id: z.string().describe("ID of the template to use"),
          list_id: z.string().describe("ID of the list to send to"),
          subject: z.string().describe("Email subject line"),
          from_email: z.string().email().describe("Sender email address"),
          from_name: z.string().describe("Sender name")
        },
        handler: async ({ name, template_id, list_id, subject, from_email, from_name }) => {
          try {
            const data = {
              data: {
                type: "campaign",
                attributes: {
                  name,
                  subject,
                  from_email,
                  from_name
                },
                relationships: {
                  template: {
                    data: {
                      type: "template",
                      id: template_id
                    }
                  },
                  list: {
                    data: {
                      type: "list",
                      id: list_id
                    }
                  }
                }
              }
            };
            
            const result = await klaviyoClient.createCampaign(data);
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
        name: "update_campaign",
        description: "Update an existing campaign",
        schema: {
          campaign_id: z.string().describe("The ID of the campaign to update"),
          name: z.string().optional().describe("Name of the campaign"),
          subject: z.string().optional().describe("Email subject line"),
          from_email: z.string().email().optional().describe("Sender email address"),
          from_name: z.string().optional().describe("Sender name")
        },
        handler: async ({ campaign_id, name, subject, from_email, from_name }) => {
          try {
            const attributes = {};
            if (name) attributes.name = name;
            if (subject) attributes.subject = subject;
            if (from_email) attributes.from_email = from_email;
            if (from_name) attributes.from_name = from_name;
            
            const data = {
              data: {
                type: "campaign",
                id: campaign_id,
                attributes
              }
            };
            
            const result = await klaviyoClient.updateCampaign(campaign_id, data);
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
        name: "delete_campaign",
        description: "Delete a campaign",
        schema: {
          campaign_id: z.string().describe("The ID of the campaign to delete")
        },
        handler: async ({ campaign_id }) => {
          try {
            await klaviyoClient.deleteCampaign(campaign_id);
            return {
              content: [{ type: "text", text: `Campaign ${campaign_id} successfully deleted` }]
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
        name: "send_campaign",
        description: "Send a campaign",
        schema: {
          campaign_id: z.string().describe("The ID of the campaign to send")
        },
        handler: async ({ campaign_id }) => {
          try {
            const result = await klaviyoClient.sendCampaign(campaign_id);
            return {
              content: [{ type: "text", text: `Campaign ${campaign_id} successfully sent` }]
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
