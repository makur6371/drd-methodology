import { getStageInfo, getConfig } from './config.js';
import { apiClient } from './api-client.js';

// 对话历史管理器
class ConversationManager {
  constructor() {
    this.messages = []; // 所有对话历史
    this.stageResults = {}; // 每个阶段的结果
    this.currentStage = 0;
  }

  // 初始化对话
  initialize() {
    const config = getConfig();
    this.messages = [
      {
        role: 'system',
        content: config.conversation.systemPrompt
      }
    ];
    this.stageResults = {};
    this.currentStage = 0;
  }

  // 开始新阶段
  async startStage(stageNum) {
    this.currentStage = stageNum;
    const stageInfo = getStageInfo(stageNum);
    
    // 添加阶段特定的系统提示
    this.messages.push({
      role: 'system',
      content: stageInfo.systemPrompt
    });

    // AI 发起对话
    const introMessage = `📝 阶段 ${stageNum}: ${stageInfo.name}\n\n${stageInfo.description}\n\n让我们开始吧！请告诉我关于你的项目，我会引导你完成这个阶段的关键问题。`;
    this.messages.push({
      role: 'assistant',
      content: introMessage
    });

    return introMessage;
  }

  // 发送用户消息并获取 AI 回复
  async sendMessage(userMessage) {
    // 添加用户消息
    this.messages.push({
      role: 'user',
      content: userMessage
    });

    // 调用 API
    const aiResponse = await apiClient.chat(this.messages);

    // 添加 AI 回复
    this.messages.push({
      role: 'assistant',
      content: aiResponse
    });

    return aiResponse;
  }

  // 完成当前阶段
  async completeStage() {
    const stageInfo = getStageInfo(this.currentStage);
    
    // 生成阶段总结
    const summaryPrompt = `请总结本阶段（阶段 ${this.currentStage}: ${stageInfo.name}）的关键信息，包括：\n1. ${stageInfo.outputs.join('\n2. ')}\n\n请以结构化的方式总结，便于后续阶段使用。`;
    
    this.messages.push({
      role: 'user',
      content: summaryPrompt
    });

    const summary = await apiClient.chat(this.messages);
    
    this.messages.push({
      role: 'assistant',
      content: summary
    });

    // 保存阶段结果
    this.stageResults[this.currentStage] = {
      name: stageInfo.name,
      description: stageInfo.description,
      outputs: stageInfo.outputs,
      summary: summary,
      messages: this.messages.filter(m => m.role !== 'system').slice(-10) // 保留最近 10 条对话
    };

    return summary;
  }

  // 获取完整的对话历史
  getHistory() {
    return this.messages;
  }

  // 获取阶段结果
  getStageResults() {
    return this.stageResults;
  }

  // 获取当前阶段
  getCurrentStage() {
    return this.currentStage;
  }

  // 导出对话历史
  exportHistory() {
    return {
      messages: this.messages,
      stageResults: this.stageResults
    };
  }
}

// 导出单例实例
export const conversationManager = new ConversationManager();