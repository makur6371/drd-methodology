<div align="center">

# 🔥 对话精炼开发法 (DRD)

**Dialogue-Refinement-Development Methodology**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub stars](https://img.shields.io/github/stars/makur6371/drd-methodology?style=social)](https://github.com/makur6371/drd-methodology/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/makur6371/drd-methodology?style=social)](https://github.com/makur6371/drd-methodology/network/members)
[![文档](https://img.shields.io/badge/文档-中文-blue.svg)](README.md)

**通过多轮深度对话 + 外部调研 + 迭代精炼，将模糊愿景转化为可执行方案**

</div>

---

## 📚 什么是 DRD？

> **对话精炼开发法（Dialogue-Refinement-Development，DRD）** 是一种创新的 AI 辅助项目开发方法论，适用于技术改造、AI 应用开发、新产品规划和复杂系统设计。

<div align="center">

### 🌟 核心价值

| 🎯 需求精准落地 | 🔍 问题早期发现 | 📊 方案可执行 | 🚀 提高成功率 |
|:--------------:|:--------------:|:------------:|:------------:|
| 从模糊愿景到具体指标 | 通过对话暴露潜在问题 | 分阶段、可量化、可验证 | 减少返工，降低风险 |

</div>

---

## 🔄 核心流程

DRD 方法包含 5 个阶段：

```
阶段1：愿景澄清 → 阶段2：基础调研 → 阶段3：深度设计 → 阶段4：需求精炼 → 阶段5：方案固化
```

| 阶段 | 目标 | 关键活动 | 产出 |
|------|------|----------|------|
| **1. 愿景澄清** | 明确项目定位和核心价值 | 关键问题提问、核心价值提炼 | 项目定位、核心价值、对标项目 |
| **2. 基础调研** | 了解现有技术和竞品 | 对标项目分析、竞品调研 | 技术路线、竞品分析、痛点识别 |
| **3. 深度设计** | 设计核心解决方案 | 核心概念提出、用户挑战、方案迭代 | 技术方案、架构设计、成本控制 |
| **4. 需求精炼** | 将抽象需求转化为可执行指标 | 具体要求、外部调研、量化指标 | 量化指标、技术方案、质量控制 |
| **5. 方案固化** | 形成完整的可执行方案 | 多文档体系、命名规范、开发指令 | 完整方案文档、开发指令 |

详细流程请参考：[课题研究.md](./docs/课题研究.md)

---

## 🚀 快速开始

### 适用场景

<div align="center">

**✅ 适合的项目类型**

| 🔧 技术改造项目 | 🤖 AI 应用开发 | 🆕 新产品规划 | 🏗️ 复杂系统设计 |
|:--------------:|:--------------:|:------------:|:------------:|
| 基于现有项目改造 | 新兴技术领域 | 创新性产品 | 多模块、多交互 |

**❌ 不适合的项目类型**

| 📝 简单任务 | 📋 技术成熟的标准项目 |
|:----------:|:-------------------:|
| 过度设计 | 已有最佳实践 |

</div>

### 快速检查清单

开始项目前，问自己：

- [ ] 我能清晰表达项目愿景吗？
- [ ] 我有对标项目吗？
- [ ] 我准备好通过多轮对话来精炼需求吗？
- [ ] 我准备好质疑和挑战 AI 提出的方案吗？
- [ ] 我有耐心进行迭代优化吗？
- [ ] 我有文档意识吗？

如果以上答案都是"是"，那么 DRD 方法适合你的项目！

---

## 🤖 DRD AI 助手

想要使用真实的 AI 对话来生成你的项目方案？

### 快速开始

```bash
# 进入 AI 助手目录
cd drd-ai-assistant

# 运行程序
node index.js
```

### 核心功能

- 🔌 **真实 API 调用** - 支持兼容 OpenAI 格式的任意 API
- 🤖 **智能对话** - AI 引导完成 5 个阶段的深度对话
- 📊 **上下文管理** - 自动管理对话历史和阶段上下文
- 📄 **方案生成** - 自动生成完整的项目方案文档
- 💾 **跨阶段传递** - 每个阶段的结果自动传递到下一阶段

### 支持的 API

- ✅ OpenAI
- ✅ Azure OpenAI
- ✅ 硅基流动
- ✅ 其他兼容 OpenAI 格式的 API

详细使用说明请查看：[drd-ai-assistant/README.md](./drd-ai-assistant/README.md)

---

## 📖 文档

| 文档 | 描述 |
|------|------|
| [📚 课题研究.md](./课题研究.md) | 完整的方法论文档（约 15000 字） |
| [⚡ 快速参考.md](./快速参考.md) | 简明版本，快速查阅方法要点 |

---

## 🎯 案例研究

### nflow 项目

<div align="center">

**将 iflow-cli 改造为 AI 小说写作工具**

</div>

**📊 应用 DRD 方法成果**：

| 指标 | 数值 |
|------|------|
| 💬 对话轮次 | 约 20 轮 |
| 📄 产出文档 | 4 个完整文档 |
| 📝 文档规模 | 约 15000 字 |

**✨ 核心成果**：

```
┌─────────────────────────────────────────┐
│  🤖 6 个核心 Agent 设计                  │
│  📏 字数控制系统（2000-2500字）          │
│  🔄 质量把控闭环（审核→检查→修复→评分）  │
│  🔧 自动修复机制（6种问题类型）          │
│  💰 零成本方案（iflow 免费模型）          │
└─────────────────────────────────────────┘
```

完整案例详见：[课题研究.md](./课题研究.md#-案例研究nflow-项目)

---

## 💡 关键成功因素

1. **用户的主动参与** - 提出质疑、明确要求、挑战方案
2. **AI 的主动调研** - 不依赖内部知识、主动获取最新信息
3. **迭代的心态** - 接受不完美、持续优化、精雕细琢
4. **文档的意识** - 及时记录、多文档服务不同场景
5. **质量意识** - 追求可量化指标、确保方案可执行

---

## 🤝 贡献

欢迎贡献！请查看 [CONTRIBUTING.md](./CONTRIBUTING.md) 了解详情。

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](./LICENSE) 文件。

---

## 🙏 致谢

DRD 方法论由 AI + Makur。

---

## 📦 项目结构

```
drd-methodology/
├── README.md                      # 项目主页
├── 课题研究.md                    # 完整方法论文档
├── 快速参考.md                    # 简明版本
└── drd-ai-assistant/             # DRD AI 助手
    ├── index.js                  # 主程序
    ├── api-client.js             # API 客户端
    ├── conversation-manager.js   # 对话管理
    ├── document-generator.js     # 文档生成
    ├── config.js                 # 配置管理
    └── README.md                 # 使用文档
```

---

## 📮 联系方式

- 💬 **提交 Issue**：[创建问题](https://github.com/makur6371/drd-methodology/issues)
- 🔄 **提交 PR**：[贡献代码](https://github.com/makur6371/drd-methodology/pulls)
- 📧 **邮箱**：3397023886@qq.com

---

<div align="center">

### 💡 核心理念

> **DRD 的核心是对话，而不是文档。文档是对话的产物，不是起点。**

---

**Made with ❤️ by AI + Makur**

[![GitHub](https://img.shields.io/badge/GitHub-makur6371-black?style=for-the-badge&logo=github)](https://github.com/makur6371)

</div>
