import { getConfig, saveConfig } from './config.js';

// OpenAI API 客户端
class OpenAIClient {
  constructor() {
    this.baseUrl = '';
    this.apiKey = '';
    this.model = '';
  }

  // 配置 API
  configure(baseUrl, apiKey, model) {
    // 移除末尾斜杠
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.apiKey = apiKey;
    this.model = model;
    
    saveConfig({
      api: { baseUrl: this.baseUrl, apiKey: this.apiKey, model: this.model }
    });
  }

  // 获取完整的 API URL
  getApiUrl(endpoint) {
    // 如果 baseUrl 已经包含 /v1，直接拼接
    if (this.baseUrl.endsWith('/v1')) {
      return `${this.baseUrl}/${endpoint}`;
    }
    // 否则添加 /v1
    return `${this.baseUrl}/v1/${endpoint}`;
  }

  // 获取可用模型列表
  async getModels() {
    try {
      const response = await fetch(this.getApiUrl('models'), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.data || [];
    } catch (error) {
      console.error('获取模型列表失败:', error.message);
      throw error;
    }
  }

  // 发送聊天请求
  async chat(messages, options = {}) {
    const config = getConfig();
    
    try {
      const response = await fetch(this.getApiUrl('chat/completions'), {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: this.model || config.api.model,
          messages: messages,
          temperature: options.temperature || config.conversation.temperature,
          max_tokens: options.maxTokens || config.conversation.maxTokens
        })
      });

      if (!response.ok) {
        throw new Error(`API 请求失败: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('聊天请求失败:', error.message);
      throw error;
    }
  }

  // 测试连接
  async testConnection() {
    try {
      await this.getModels();
      return true;
    } catch (error) {
      return false;
    }
  }
}

// 导出单例实例
export const apiClient = new OpenAIClient();