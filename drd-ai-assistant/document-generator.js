import { conversationManager } from './conversation-manager.js';
import { apiClient } from './api-client.js';
import { getStageInfo, getConfig } from './config.js';

// 方案文档生成器
class DocumentGenerator {
  constructor() {
    this.projectName = '未命名项目';
    this.createdAt = new Date().toLocaleString('zh-CN');
  }

  // 设置项目名称
  setProjectName(name) {
    this.projectName = name;
  }

  // 生成完整的方案文档
  async generateDocument() {
    const stageResults = conversationManager.getStageResults();
    
    // 生成文档
    const document = `# ${this.projectName} - DRD 项目方案

**生成时间**: ${this.createdAt}
**方法论**: 对话精炼开发法 (DRD)

---

## 📋 目录

1. [项目概述](#项目概述)
2. [阶段1: 愿景澄清](#阶段1-愿景澄清)
3. [阶段2: 基础调研](#阶段2-基础调研)
4. [阶段3: 深度设计](#阶段3-深度设计)
5. [阶段4: 需求精炼](#阶段4-需求精炼)
6. [阶段5: 方案固化](#阶段5-方案固化)
7. [实施计划](#实施计划)
8. [验收标准](#验收标准)

---

## 项目概述

本项目采用**对话精炼开发法 (DRD)** 进行规划和设计，通过 5 个阶段的深度对话，将模糊的项目愿景转化为可执行的开发方案。

**核心价值**:
- 🎯 需求精准落地
- 🔍 问题早期发现
- 📊 方案可执行
- 🚀 提高成功率

---

${this.generateStageSections(stageResults)}

---

## 实施计划

基于以上分析，建议按照以下步骤实施：

### 第一阶段：核心功能开发
- 根据阶段 3 的技术方案，开发核心功能模块
- 建立基本的架构和代码规范

### 第二阶段：功能完善
- 根据阶段 4 的量化指标，完善各项功能
- 实现质量控制机制

### 第三阶段：优化和测试
- 根据阶段 5 的验收标准，进行全面测试
- 性能优化和 bug 修复

### 第四阶段：部署和上线
- 准备部署环境
- 上线发布

---

## 验收标准

基于阶段 5 的方案固化，本项目验收标准如下：

1. **功能完整性**: 所有功能按需求实现
2. **性能指标**: 满足阶段 4 定义的性能要求
3. **质量标准**: 通过阶段 4 定义的质量检查
4. **文档完整性**: 提供完整的技术文档和用户文档
5. **可维护性**: 代码结构清晰，易于维护和扩展

---

## 附录

### DRD 方法论说明

**对话精炼开发法 (DRD)** 是一种创新的 AI 辅助项目开发方法论，通过多轮深度对话 + 外部调研 + 迭代精炼，将模糊愿景转化为可执行方案。

### 参考资源

- [DRD 方法论文档](https://github.com/makur6371/drd-methodology)
- [项目案例](https://github.com/makur6371/drd-methodology)

---

*本文档由 DRD AI 助手自动生成*
`;

    return document;
  }

  // 生成各阶段内容
  generateStageSections(stageResults) {
    let sections = '';

    for (let i = 1; i <= 5; i++) {
      const result = stageResults[i];
      if (result) {
        sections += this.generateStageSection(i, result);
      }
    }

    return sections;
  }

  // 生成单个阶段内容
  generateStageSection(stageNum, result) {
    return `
## 阶段${stageNum}: ${result.name}

### 📝 阶段目标

${result.description}

### ✨ 核心产出

${result.outputs.map((output, index) => `${index + 1}. ${output}`).join('\n')}

### 💡 详细内容

${result.summary}

### 📊 对话摘要

${result.messages.map(m => `**${m.role === 'user' ? '用户' : 'AI'}**: ${m.content.substring(0, 200)}...`).join('\n\n')}

---

`;
  }

  // 保存文档到文件
  async saveDocument(outputPath) {
    const document = await this.generateDocument();
    
    try {
      import('fs').then(fs => {
        fs.writeFileSync(outputPath, document, 'utf-8');
      });
      return true;
    } catch (error) {
      console.error('保存文档失败:', error);
      return false;
    }
  }
}

// 导出单例实例
export const documentGenerator = new DocumentGenerator();