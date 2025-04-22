# Klaviyo API MCP Server

    A comprehensive Model Context Protocol (MCP) server for interacting with Klaviyo's API. This server provides tools and resources for managing profiles, lists, events, campaigns, flows, templates, segments, metrics, catalogs, and data privacy in Klaviyo.

    ## Features

    - Complete coverage of Klaviyo's API functionality
    - Structured tools with proper validation using Zod
    - Documentation resources for API reference
    - Error handling and logging

    ## Setup

    1. Clone this repository
    2. Install dependencies:
       ```
       npm install
       ```
    3. Create a `.env` file with your Klaviyo API key:
       ```
       KLAVIYO_API_KEY=your_private_api_key_here
       ```
    4. Start the server:
       ```
       npm run dev
       ```

    ## Testing with MCP Inspector

    You can test the server using the MCP Inspector:

    ```
    npm run inspect
    ```

    This will open a web interface where you can:
    - Browse available tools and resources
    - Test tools with different inputs
    - View server logs and responses

    ## Available Tools

    ### Profiles
    - `get_profiles`: Get a list of profiles with optional filtering
    - `get_profile`: Get a specific profile by ID
    - `create_profile`: Create a new profile
    - `update_profile`: Update an existing profile
    - `delete_profile`: Delete a profile

    ### Lists
    - `get_lists`: Get all lists
    - `get_list`: Get a specific list by ID
    - `create_list`: Create a new list
    - `update_list`: Update an existing list
    - `delete_list`: Delete a list
    - `get_list_profiles`: Get profiles in a list
    - `add_profiles_to_list`: Add profiles to a list
    - `remove_profiles_from_list`: Remove profiles from a list

    ### Events
    - `get_events`: Get a list of events with optional filtering
    - `get_event`: Get a specific event by ID
    - `create_event`: Create a new event

    ### Campaigns
    - `get_campaigns`: Get a list of campaigns with optional filtering
    - `get_campaign`: Get a specific campaign by ID
    - `create_campaign`: Create a new campaign
    - `update_campaign`: Update an existing campaign
    - `delete_campaign`: Delete a campaign
    - `send_campaign`: Send a campaign

    ### Flows
    - `get_flows`: Get a list of flows with optional filtering
    - `get_flow`: Get a specific flow by ID
    - `update_flow_status`: Update the status of a flow

    ### Templates
    - `get_templates`: Get a list of templates with optional filtering
    - `get_template`: Get a specific template by ID
    - `create_template`: Create a new template
    - `update_template`: Update an existing template
    - `delete_template`: Delete a template
    - `clone_template`: Clone an existing template
    - `render_template`: Render a template with context variables

    ### Segments
    - `get_segments`: Get a list of segments with optional filtering
    - `get_segment`: Get a specific segment by ID

    ### Metrics
    - `get_metrics`: Get a list of metrics with optional filtering
    - `get_metric`: Get a specific metric by ID
    - `get_metric_aggregate`: Get aggregate data for a metric
    - `get_metric_timeline`: Get timeline data for a metric

    ### Catalogs
    - `get_catalogs`: Get a list of catalogs
    - `get_catalog`: Get a specific catalog by ID
    - `get_catalog_items`: Get items in a catalog
    - `get_catalog_item`: Get a specific item in a catalog
    - `create_catalog_item`: Create a new item in a catalog
    - `update_catalog_item`: Update an existing item in a catalog
    - `delete_catalog_item`: Delete an item from a catalog

    ### Data Privacy
    - `create_deletion_request`: Create a new data deletion request
    - `get_deletion_requests`: Get a list of data deletion requests
    - `get_deletion_request`: Get a specific data deletion request by ID

    ## Available Resources

    - `klaviyo://docs/{section}`: Documentation for different API sections
      - Available sections: overview, profiles, lists, events, campaigns, flows, segments, metrics, templates, catalogs, data-privacy

    ## License

    MIT
