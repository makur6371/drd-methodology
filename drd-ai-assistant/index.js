import readline from 'readline';
import { apiClient } from './api-client.js';
import { conversationManager } from './conversation-manager.js';
import { documentGenerator } from './document-generator.js';
import { getStageInfo } from './config.js';

// 创建 readline 接口
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 辅助函数：获取用户输入
function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
    });
  });
}

// 显示欢迎信息
function showWelcome() {
  console.log('\n' + '='.repeat(60));
  console.log('🔥 DRD AI 助手 - 对话精炼开发法');
  console.log('='.repeat(60));
  console.log('\n📚 什么是 DRD？');
  console.log('对话精炼开发法是一种创新的 AI 辅助项目开发方法论');
  console.log('通过多轮深度对话 + 外部调研 + 迭代精炼');
  console.log('将模糊愿景转化为可执行方案\n');
  console.log('🎯 核心价值：');
  console.log('  🎯 需求精准落地 - 从模糊愿景到具体指标');
  console.log('  🔍 问题早期发现 - 通过对话暴露潜在问题');
  console.log('  📊 方案可执行 - 分阶段、可量化、可验证');
  console.log('  🚀 提高成功率 - 减少返工，降低风险\n');
}

// 配置 API
async function configureAPI() {
  console.log('\n' + '='.repeat(60));
  console.log('🔧 API 配置');
  console.log('='.repeat(60));
  
  console.log('\n请配置你的 AI API（兼容 OpenAI 格式）\n');
  console.log('💡 提示：');
  console.log('  - 硅基流动: https://api.siliconflow.cn/v1');
  console.log('  - OpenAI: https://api.openai.com');
  console.log('  - 其他兼容 API: 请查看提供商文档\n');
  
  const baseUrl = await question('API Base URL (例如: https://api.openai.com): ');
  const apiKey = await question('API Key: ');
  
  console.log('\n正在测试连接并加载模型列表...\n');
  
  try {
    apiClient.configure(baseUrl, apiKey, '');
    
    const testResult = await apiClient.testConnection();
    
    if (!testResult) {
      console.error('❌ 连接失败，请检查 API 配置\n');
      return false;
    }
    
    console.log('✅ 连接成功！\n');
    
    // 获取模型列表
    const models = await apiClient.getModels();
    
    if (models.length === 0) {
      console.log('⚠️  未找到可用模型\n');
      return false;
    }
    
    console.log('可用模型列表：\n');
    models.forEach((model, index) => {
      console.log(`  ${index + 1}. ${model.id}`);
    });
    
    console.log();
    const modelChoice = await question('请选择模型（输入编号，默认选择第一个）: ');
    
    let selectedModel;
    if (modelChoice.trim()) {
      const modelIndex = parseInt(modelChoice) - 1;
      if (modelIndex >= 0 && modelIndex < models.length) {
        selectedModel = models[modelIndex].id;
      } else {
        selectedModel = models[0].id;
        console.log('⚠️  无效的选择，使用第一个模型\n');
      }
    } else {
      selectedModel = models[0].id;
    }
    
    apiClient.configure(baseUrl, apiKey, selectedModel);
    
    console.log(`\n✅ 已选择模型: ${selectedModel}\n`);
    
    return true;
    
  } catch (error) {
    console.error(`❌ 配置失败: ${error.message}\n`);
    return false;
  }
}

// 运行一个阶段
async function runStage(stageNum) {
  const stageInfo = getStageInfo(stageNum);
  
  console.log('\n' + '─'.repeat(60));
  console.log(`📝 阶段 ${stageNum}: ${stageInfo.name}`);
  console.log('─'.repeat(60));
  console.log(`📋 ${stageInfo.description}\n`);
  
  // 初始化阶段
  await conversationManager.startStage(stageNum);
  
  // 获取 AI 的开场白
  const intro = conversationManager.messages[conversationManager.messages.length - 1].content;
  console.log(`🤖 AI: ${intro}\n`);
  
  // 对话循环
  while (true) {
    const userMessage = await question('💬 你: ');
    
    if (userMessage.toLowerCase() === 'exit') {
      console.log('\n⏸️  退出当前阶段\n');
      return false;
    }
    
    if (userMessage.toLowerCase() === 'done') {
      console.log('\n✅ 完成当前阶段\n');
      await conversationManager.completeStage();
      return true;
    }
    
    // 发送消息并获取回复
    console.log('\n🤖 AI: 正在思考...\n');
    
    try {
      const aiResponse = await conversationManager.sendMessage(userMessage);
      console.log(`🤖 AI: ${aiResponse}\n`);
    } catch (error) {
      console.error(`❌ 错误: ${error.message}\n`);
    }
    
    console.log('💡 提示: 输入 "done" 完成阶段，输入 "exit" 退出\n');
  }
}

// 运行完整的 DRD 流程
async function runDRDProcess() {
  console.log('\n' + '='.repeat(60));
  console.log('🚀 开始 DRD 流程');
  console.log('='.repeat(60));
  
  const projectName = await question('\n请输入项目名称: ');
  documentGenerator.setProjectName(projectName);
  
  console.log(`\n🎯 项目: ${projectName}`);
  console.log('\n即将开始 5 个阶段的对话...\n');
  
  await question('按回车键开始...');
  
  // 初始化对话管理器
  conversationManager.initialize();
  
  // 运行 5 个阶段
  for (let i = 1; i <= 5; i++) {
    const completed = await runStage(i);
    
    if (!completed) {
      console.log('\n⚠️  流程中断\n');
      return false;
    }
    
    if (i < 5) {
      console.log(`\n✅ 阶段 ${i} 完成！即将进入阶段 ${i + 1}...\n`);
      await question('按回车键继续...');
    }
  }
  
  return true;
}

// 生成并保存文档
async function generateAndSaveDocument() {
  console.log('\n' + '='.repeat(60));
  console.log('📄 生成项目方案文档');
  console.log('='.repeat(60));
  
  const document = await documentGenerator.generateDocument();
  
  console.log('\n📊 项目方案文档已生成！\n');
  console.log('文档预览（前 500 字）：\n');
  console.log(document.substring(0, 500) + '...\n');
  
  const save = await question('是否保存到文件？(y/n): ');
  
  if (save.toLowerCase() === 'y') {
    const filename = await question('请输入文件名（默认: project-solution.md）: ') || 'project-solution.md';
    
    try {
      const fs = await import('fs');
      fs.writeFileSync(filename, document, 'utf-8');
      console.log(`\n✅ 文档已保存到: ${filename}\n`);
    } catch (error) {
      console.error(`\n❌ 保存失败: ${error.message}\n`);
      console.log('文档内容：\n');
      console.log(document);
    }
  } else {
    console.log('\n文档内容：\n');
    console.log(document);
  }
}

// 主程序
async function main() {
  showWelcome();
  
  // 配置 API
  const configured = await configureAPI();
  
  if (!configured) {
    console.log('❌ API 配置失败，程序退出\n');
    rl.close();
    return;
  }
  
  // 运行 DRD 流程
  const completed = await runDRDProcess();
  
  if (completed) {
    console.log('\n' + '='.repeat(60));
    console.log('🎉 DRD 流程完成！');
    console.log('='.repeat(60));
    
    // 生成文档
    await generateAndSaveDocument();
  }
  
  console.log('\n👋 感谢使用 DRD AI 助手！\n');
  rl.close();
}

// 运行主程序
main().catch(console.error);