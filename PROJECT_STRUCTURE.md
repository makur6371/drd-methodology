# DRD 项目结构说明

```
对话精炼开发法(DRD)/
├── README.md                    # 项目主页、快速开始指南
├── LICENSE                      # MIT 许可证
├── PROJECT_STRUCTURE.md         # 本文件：项目结构说明
├── CONTRIBUTING.md              # 贡献指南
├── docs/                        # 文档目录
│   ├── 课题研究.md             # 完整的方法论文档（约15000字）
│   ├── 快速参考.md             # 简明版本，快速查阅
│   └── checklists/             # 各阶段检查清单
│       ├── 阶段1-愿景澄清.md
│       ├── 阶段2-基础调研.md
│       ├── 阶段3-深度设计.md
│       ├── 阶段4-需求精炼.md
│       └── 阶段5-方案固化.md
├── examples/                    # 实践案例
│   └── nflow/                  # nflow 项目案例
│       ├── 方案.md
│       ├── 开发改造技术方案.md
│       ├── 开发改造指南.md
│       └── README.md
└── .gitignore                  # Git 忽略文件
```

## 文件说明

### 根目录文件

- **README.md** - 项目的主页，包含项目介绍、快速开始、核心流程等
- **LICENSE** - MIT 开源许可证
- **PROJECT_STRUCTURE.md** - 本文件，说明项目结构
- **CONTRIBUTING.md** - 贡献指南，说明如何参与项目贡献

### docs/ 目录

存放核心文档：

- **课题研究.md** - 完整的方法论文档，包含详细的流程说明、实践技巧、案例研究
- **快速参考.md** - 简明版本，适合快速查阅方法要点
- **checklists/** - 各阶段的检查清单，帮助用户确保每个阶段的关键任务都已完成

### examples/ 目录

存放实践案例：

- **nflow/** - nflow 项目案例，展示 DRD 方法在实际项目中的应用
  - 方案.md
  - 开发改造技术方案.md
  - 开发改造指南.md
  - README.md

## 扩展建议

未来可以添加的内容：

```
├── templates/                  # 模板文件
│   ├── 方案模板.md
│   ├── 技术方案模板.md
│   └── 开发指南模板.md
├── diagrams/                   # 流程图和架构图
│   ├── 流程图.png
│   ├── 架构图.png
│   └── 检查清单.png
├── i18n/                       # 国际化
│   └── en/                     # 英文版本
│       ├── README.md
│       ├── docs/
│       └── examples/
└── tools/                      # 辅助工具
    └── drd-checklist.py       # 检查清单生成工具
```