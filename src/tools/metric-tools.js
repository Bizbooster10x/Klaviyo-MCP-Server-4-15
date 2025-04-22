import { z } from 'zod';
    import { klaviyoClient } from '../klaviyo-client.js';

    export const metricTools = [
      {
        name: "get_metrics",
        description: "Get a list of metrics with optional filtering",
        schema: {
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ page_size, page_cursor }) => {
          try {
            const params = {};
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getMetrics(params);
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
        name: "get_metric",
        description: "Get a specific metric by ID",
        schema: {
          metric_id: z.string().describe("The ID of the metric to retrieve")
        },
        handler: async ({ metric_id }) => {
          try {
            const result = await klaviyoClient.getMetric(metric_id);
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
        name: "get_metric_aggregate",
        description: "Get aggregate data for a metric",
        schema: {
          metric_id: z.string().describe("The ID of the metric"),
          measurement: z.enum(["count", "sum", "unique"]).describe("Measurement type"),
          start_date: z.string().describe("Start date in ISO format"),
          end_date: z.string().describe("End date in ISO format"),
          interval: z.enum(["day", "week", "month"]).describe("Time interval")
        },
        handler: async ({ metric_id, measurement, start_date, end_date, interval }) => {
          try {
            const params = {
              measurement,
              start_date,
              end_date,
              interval
            };
            
            const result = await klaviyoClient.getMetricAggregate(metric_id, params);
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
        name: "get_metric_timeline",
        description: "Get timeline data for a metric",
        schema: {
          metric_id: z.string().describe("The ID of the metric"),
          start_date: z.string().optional().describe("Start date in ISO format"),
          end_date: z.string().optional().describe("End date in ISO format"),
          page_size: z.number().optional().describe("Number of results per page"),
          page_cursor: z.string().optional().describe("Cursor for pagination")
        },
        handler: async ({ metric_id, start_date, end_date, page_size, page_cursor }) => {
          try {
            const params = {};
            if (start_date) params.start_date = start_date;
            if (end_date) params.end_date = end_date;
            if (page_size) params.page_size = page_size;
            if (page_cursor) params.page_cursor = page_cursor;
            
            const result = await klaviyoClient.getMetricTimeline(metric_id, params);
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
