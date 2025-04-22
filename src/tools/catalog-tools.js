import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const catalogTools = [
      {
        name: "get_catalogs",
        description: "Get a list of catalogs",
        schema: {
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ page_size, page_cursor }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getCatalogs(params);
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
        name: "get_catalog",
        description: "Get a specific catalog by ID",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog to retrieve")
        },
        handler: async ({ catalog_id }) => {
          try {
            const result = await klaviyoClient.getCatalog(catalog_id);
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
        name: "get_catalog_items",
        description: "Get items in a catalog",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog"),
          filter: z.string().optional().describe("Filter criteria in the format 'field:operator:value'"),
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ catalog_id, filter, page_size, page_cursor }) => {
          try {
            const params = {};
            if (filter) params.filter = filter;
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getCatalogItems(catalog_id, params);
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
        name: "get_catalog_item",
        description: "Get a specific item in a catalog",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog"),
          item_id: z.string().describe("The ID of the item to retrieve")
        },
        handler: async ({ catalog_id, item_id }) => {
          try {
            const result = await klaviyoClient.getCatalogItem(catalog_id, item_id);
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
        name: "create_catalog_item",
        description: "Create a new item in a catalog",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog"),
          external_id: z.string().describe("External ID for the item"),
          title: z.string().describe("Title of the item"),
          description: z.string().optional().describe("Description of the item"),
          price: z.number().optional().describe("Price of the item"),
          url: z.string().url().optional().describe("URL for the item"),
          image_url: z.string().url().optional().describe("Image URL for the item"),
          custom_metadata: z.record(z.any()).optional().describe("Custom metadata for the item")
        },
        handler: async ({ catalog_id, external_id, title, description, price, url, image_url, custom_metadata }) => {
          try {
            const attributes = {
              external_id,
              title
            };
            
            if (description) attributes.description = description;
            if (price) attributes.price = price;
            if (url) attributes.url = url;
            if (image_url) attributes.image_url = image_url;
            if (custom_metadata) attributes.custom_metadata = custom_metadata;
            
            const data = {
              data: {
                type: "catalog-item",
                attributes
              }
            };
            
            const result = await klaviyoClient.createCatalogItem(catalog_id, data);
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
        name: "update_catalog_item",
        description: "Update an existing item in a catalog",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog"),
          item_id: z.string().describe("The ID of the item to update"),
          title: z.string().optional().describe("Title of the item"),
          description: z.string().optional().describe("Description of the item"),
          price: z.number().optional().describe("Price of the item"),
          url: z.string().url().optional().describe("URL for the item"),
          image_url: z.string().url().optional().describe("Image URL for the item"),
          custom_metadata: z.record(z.any()).optional().describe("Custom metadata for the item")
        },
        handler: async ({ catalog_id, item_id, title, description, price, url, image_url, custom_metadata }) => {
          try {
            const attributes = {};
            if (title) attributes.title = title;
            if (description) attributes.description = description;
            if (price) attributes.price = price;
            if (url) attributes.url = url;
            if (image_url) attributes.image_url = image_url;
            if (custom_metadata) attributes.custom_metadata = custom_metadata;
            
            const data = {
              data: {
                type: "catalog-item",
                id: item_id,
                attributes
              }
            };
            
            const result = await klaviyoClient.updateCatalogItem(catalog_id, item_id, data);
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
        name: "delete_catalog_item",
        description: "Delete an item from a catalog",
        schema: {
          catalog_id: z.string().describe("The ID of the catalog"),
          item_id: z.string().describe("The ID of the item to delete")
        },
        handler: async ({ catalog_id, item_id }) => {
          try {
            await klaviyoClient.deleteCatalogItem(catalog_id, item_id);
            return {
              content: [{ type: "text", text: `Catalog item ${item_id} successfully deleted from catalog ${catalog_id}` }]
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
