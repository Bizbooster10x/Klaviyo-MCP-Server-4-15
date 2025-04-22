import axios from 'axios';

    class KlaviyoClient {
      constructor() {
        this.baseURL = 'https://a.klaviyo.com/api';
        this.apiKey = process.env.KLAVIYO_API_KEY;
        this.apiVersion = '2023-12-15';
      }

      getHeaders() {
        return {
          'Authorization': `Klaviyo-API-Key ${this.apiKey}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Revision': this.apiVersion
        };
      }

      async request(method, endpoint, data = null, params = null) {
        try {
          if (!this.apiKey) {
            throw new Error('Klaviyo API key is not set. Please set the KLAVIYO_API_KEY environment variable.');
          }

          const config = {
            method,
            url: `${this.baseURL}${endpoint}`,
            headers: this.getHeaders(),
          };

          if (data) {
            config.data = data;
          }

          if (params) {
            config.params = params;
          }

          const response = await axios(config);
          return response.data;
        } catch (error) {
          if (error.response) {
            throw new Error(`Klaviyo API Error: ${error.response.status} - ${JSON.stringify(error.response.data)}`);
          } else if (error.request) {
            throw new Error(`Klaviyo API Request Error: No response received`);
          } else {
            throw error;
          }
        }
      }

      // Profiles
      async getProfiles(params) {
        return this.request('GET', '/profiles', null, params);
      }

      async getProfile(profileId) {
        return this.request('GET', `/profiles/${profileId}`);
      }

      async createProfile(data) {
        return this.request('POST', '/profiles', data);
      }

      async updateProfile(profileId, data) {
        return this.request('PATCH', `/profiles/${profileId}`, data);
      }

      async deleteProfile(profileId) {
        return this.request('DELETE', `/profiles/${profileId}`);
      }

      // Lists
      async getLists(params) {
        return this.request('GET', '/lists', null, params);
      }

      async getList(listId) {
        return this.request('GET', `/lists/${listId}`);
      }

      async createList(data) {
        return this.request('POST', '/lists', data);
      }

      async updateList(listId, data) {
        return this.request('PATCH', `/lists/${listId}`, data);
      }

      async deleteList(listId) {
        return this.request('DELETE', `/lists/${listId}`);
      }

      async getListProfiles(listId, params) {
        return this.request('GET', `/lists/${listId}/profiles`, null, params);
      }

      async addProfilesToList(listId, data) {
        return this.request('POST', `/lists/${listId}/relationships/profiles`, data);
      }

      async removeProfilesFromList(listId, data) {
        return this.request('DELETE', `/lists/${listId}/relationships/profiles`, data);
      }

      // Events
      async getEvents(params) {
        return this.request('GET', '/events', null, params);
      }

      async getEvent(eventId) {
        return this.request('GET', `/events/${eventId}`);
      }

      async createEvent(data) {
        return this.request('POST', '/events', data);
      }

      // Campaigns
      async getCampaigns(params) {
        return this.request('GET', '/campaigns', null, params);
      }

      async getCampaign(campaignId) {
        return this.request('GET', `/campaigns/${campaignId}`);
      }

      async createCampaign(data) {
        return this.request('POST', '/campaigns', data);
      }

      async updateCampaign(campaignId, data) {
        return this.request('PATCH', `/campaigns/${campaignId}`, data);
      }

      async deleteCampaign(campaignId) {
        return this.request('DELETE', `/campaigns/${campaignId}`);
      }

      async sendCampaign(campaignId) {
        return this.request('POST', `/campaigns/${campaignId}/send`);
      }

      // Flows
      async getFlows(params) {
        return this.request('GET', '/flows', null, params);
      }

      async getFlow(flowId) {
        return this.request('GET', `/flows/${flowId}`);
      }

      async createFlow(data) {
        return this.request('POST', '/flows', data);
      }

      async updateFlow(flowId, data) {
        return this.request('PATCH', `/flows/${flowId}`, data);
      }

      async deleteFlow(flowId) {
        return this.request('DELETE', `/flows/${flowId}`);
      }

      async updateFlowStatus(flowId, status) {
        return this.request('POST', `/flows/${flowId}/actions/update-status`, { status });
      }

      // Templates
      async getTemplates(params) {
        return this.request('GET', '/templates', null, params);
      }

      async getTemplate(templateId) {
        return this.request('GET', `/templates/${templateId}`);
      }

      async createTemplate(data) {
        return this.request('POST', '/templates', data);
      }

      async updateTemplate(templateId, data) {
        return this.request('PATCH', `/templates/${templateId}`, data);
      }

      async deleteTemplate(templateId) {
        return this.request('DELETE', `/templates/${templateId}`);
      }

      async cloneTemplate(templateId, data) {
        return this.request('POST', `/templates/${templateId}/clone`, data);
      }

      async renderTemplate(templateId, data) {
        return this.request('POST', `/templates/${templateId}/render`, data);
      }

      // Segments
      async getSegments(params) {
        return this.request('GET', '/segments', null, params);
      }

      async getSegment(segmentId) {
        return this.request('GET', `/segments/${segmentId}`);
      }

      async createSegment(data) {
        return this.request('POST', '/segments', data);
      }

      async updateSegment(segmentId, data) {
        return this.request('PATCH', `/segments/${segmentId}`, data);
      }

      async deleteSegment(segmentId) {
        return this.request('DELETE', `/segments/${segmentId}`);
      }

      // Metrics
      async getMetrics(params) {
        return this.request('GET', '/metrics', null, params);
      }

      async getMetric(metricId) {
        return this.request('GET', `/metrics/${metricId}`);
      }

      async getMetricAggregate(metricId, params) {
        return this.request('GET', `/metrics/${metricId}/aggregate`, null, params);
      }

      async getMetricTimeline(metricId, params) {
        return this.request('GET', `/metrics/${metricId}/timeline`, null, params);
      }

      // Catalogs
      async getCatalogs(params) {
        return this.request('GET', '/catalogs', null, params);
      }

      async getCatalog(catalogId) {
        return this.request('GET', `/catalogs/${catalogId}`);
      }

      async getCatalogItems(catalogId, params) {
        return this.request('GET', `/catalogs/${catalogId}/items`, null, params);
      }

      async getCatalogItem(catalogId, itemId) {
        return this.request('GET', `/catalogs/${catalogId}/items/${itemId}`);
      }

      async createCatalogItem(catalogId, data) {
        return this.request('POST', `/catalogs/${catalogId}/items`, data);
      }

      async updateCatalogItem(catalogId, itemId, data) {
        return this.request('PATCH', `/catalogs/${catalogId}/items/${itemId}`, data);
      }

      async deleteCatalogItem(catalogId, itemId) {
        return this.request('DELETE', `/catalogs/${catalogId}/items/${itemId}`);
      }

      // Data Privacy
      async createDeletionRequest(data) {
        return this.request('POST', '/data-privacy/deletion-requests', data);
      }

      async getDeletionRequests(params) {
        return this.request('GET', '/data-privacy/deletion-requests', null, params);
      }

      async getDeletionRequest(requestId) {
        return this.request('GET', `/data-privacy/deletion-requests/${requestId}`);
      }
    }

    export const klaviyoClient = new KlaviyoClient();
