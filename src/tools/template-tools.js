import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const templateTools = [
      {
        name: "get_templates",
        description: "Get a list of templates with optional filtering",
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
            
            const result = await klaviyoClient.getTemplates(params);
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
        name: "get_template",
        description: "Get a specific template by ID",
        schema: {
          template_id: z.string().describe("The ID of the template to retrieve")
        },
        handler: async ({ template_id }) => {
          try {
            const result = await klaviyoClient.getTemplate(template_id);
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
        name: "create_template",
        description: "Create a new template",
        schema: {
          name: z.string().describe("Name of the template"),
          html: z.string().describe("HTML content of the template")
        },
        handler: async ({ name, html }) => {
          try {
            const data = {
              data: {
                type: "template",
                attributes: {
                  name,
                  html
                }
              }
            };
            
            const result = await klaviyoClient.createTemplate(data);
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
        name: "update_template",
        description: "Update an existing template",
        schema: {
          template_id: z.string().describe("The ID of the template to update"),
          name: z.string().optional().describe("Name of the template"),
          html: z.string().optional().describe("HTML content of the template")
        },
        handler: async ({ template_id, name, html }) => {
          try {
            const attributes = {};
            if (name) attributes.name = name;
            if (html) attributes.html = html;
            
            const data = {
              data: {
                type: "template",
                id: template_id,
                attributes
              }
            };
            
            const result = await klaviyoClient.updateTemplate(template_id, data);
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
        name: "delete_template",
        description: "Delete a template",
        schema: {
          template_id: z.string().describe("The ID of the template to delete")
        },
        handler: async ({ template_id }) => {
          try {
            await klaviyoClient.deleteTemplate(template_id);
            return {
              content: [{ type: "text", text: `Template ${template_id} successfully deleted` }]
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
        name: "clone_template",
        description: "Clone an existing template",
        schema: {
          template_id: z.string().describe("The ID of the template to clone"),
          name: z.string().describe("Name for the cloned template")
        },
        handler: async ({ template_id, name }) => {
          try {
            const data = {
              data: {
                type: "template",
                attributes: {
                  name
                }
              }
            };
            
            const result = await klaviyoClient.cloneTemplate(template_id, data);
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
        name: "render_template",
        description: "Render a template with context variables",
        schema: {
          template_id: z.string().describe("The ID of the template to render"),
          context: z.record(z.any()).describe("Context variables for rendering")
        },
        handler: async ({ template_id, context }) => {
          try {
            const data = {
              data: {
                type: "template-render",
                attributes: {
                  context
                }
              }
            };
            
            const result = await klaviyoClient.renderTemplate(template_id, data);
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
