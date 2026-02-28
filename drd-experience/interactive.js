import readline from 'readline';
import { STAGES, EXAMPLE_PROJECT } from './stages.js';

// 创建 readline 接口用于用户输入
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
  console.log('🔥 对话精炼开发法 (DRD) - 交互式体验程序');
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

// 显示菜单
function showMenu() {
  console.log('\n' + '='.repeat(60));
  console.log('请选择体验方式：');
  console.log('='.repeat(60));
  console.log('1. 🎮 完整体验 - 从头开始体验 DRD 方法论');
  console.log('2. 📖 示例演示 - 查看 nflow 项目的完整案例');
  console.log('3. 🎲 随机阶段 - 体验单个阶段');
  console.log('4. ❌ 退出\n');
}

// 执行一个阶段
async function executeStage(stageNum, useExample = false) {
  const stage = STAGES[stageNum];
  console.log('\n' + '─'.repeat(60));
  console.log(`阶段 ${stageNum}: ${stage.name}`);
  console.log('─'.repeat(60));
  console.log(`📝 ${stage.description}\n`);

  const answers = {};

  if (useExample) {
    console.log('💡 示例项目：nflow\n');
    for (const q of stage.questions) {
      console.log(`❓ ${q}`);
      const exampleAnswer = EXAMPLE_PROJECT.stages[stageNum].answers[q];
      console.log(`✅ ${exampleAnswer}\n`);
      answers[q] = exampleAnswer;
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } else {
    for (const q of stage.questions) {
      console.log(`❓ ${q}`);
      const answer = await question('你的回答: ');
      answers[q] = answer;
      console.log();
    }
  }

  // 显示阶段输出
  console.log('─'.repeat(60));
  console.log('📊 本阶段产出：');
  console.log('─'.repeat(60));
  stage.outputs.forEach((output, index) => {
    console.log(`  ${index + 1}. ${output}`);
  });
  console.log();

  return answers;
}

// 完整体验模式
async function fullExperience() {
  console.log('\n🎮 开始完整体验 DRD 方法论\n');
  const projectName = await question('请输入你的项目名称（或按回车使用示例项目 nflow）: ');

  const useExample = !projectName.trim();

  if (useExample) {
    console.log('\n📖 使用示例项目：nflow');
    console.log('项目描述：将 iflow-cli 改造为 AI 小说写作工具\n');
  } else {
    console.log(`\n🚀 开始体验项目：${projectName}\n`);
  }

  const projectData = { name: projectName || 'nflow', stages: {} };

  for (let i = 1; i <= 5; i++) {
    const answers = await executeStage(i, useExample);
    projectData.stages[i] = { answers };

    if (i < 5) {
      const continueChoice = await question('继续下一阶段？: ');
      if (continueChoice.toLowerCase() !== 'y') {
        console.log('\n⏸️  体验已暂停，下次可以从阶段 ' + (i + 1) + ' 继续体验\n');
        break;
      }
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('🎉 恭喜！DRD 方法论体验完成');
  console.log('='.repeat(60));
  console.log('\n📊 项目总结：');
  console.log(`  项目名称：${projectData.name}`);
  console.log(`  完成阶段：${Object.keys(projectData.stages).length}/5`);
  console.log('\n💡 提示：');
  console.log('  - 每个阶段的输出都会积累，最终形成完整的可执行方案');
  console.log('  - 通过不断的对话和精炼，方案会越来越完善');
  console.log('  - 这就是 DRD 方法的核心价值！\n');
}

// 示例演示模式
async function exampleDemo() {
  console.log('\n📖 nflow 项目完整案例演示\n');
  console.log('项目描述：将 iflow-cli 改造为 AI 小说写作工具');
  console.log('核心价值：靠谱、免费、强大\n');

  await question('按回车键开始演示...');

  for (let i = 1; i <= 5; i++) {
    await executeStage(i, true);

    if (i < 5) {
      await question('\n按回车键继续下一阶段...');
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('📊 nflow 项目成果');
  console.log('='.repeat(60));
  console.log('  对话轮次：约 20 轮');
  console.log('  产出文档：4 个完整文档');
  console.log('  文档规模：约 15000 字');
  console.log('  核心成果：');
  console.log('    • 6 个核心 Agent 设计');
  console.log('    • 字数控制系统（2000-2500字）');
  console.log('    • 质量把控闭环（审核→检查→修复→评分）');
  console.log('    • 自动修复机制（6种问题类型）');
  console.log('    • 零成本方案（iflow 免费模型）\n');
}

// 随机阶段体验模式
async function randomStageExperience() {
  console.log('\n🎲 随机阶段体验模式\n');
  console.log('可用阶段：');

  for (const [num, stage] of Object.entries(STAGES)) {
    console.log(`  ${num}. ${stage.name} - ${stage.description}`);
  }

  const stageNum = await question('\n请选择阶段编号 (1-5): ');

  if (STAGES[stageNum]) {
    const useExample = await question('使用示例项目演示？: ');
    await executeStage(parseInt(stageNum), useExample.toLowerCase() === 'y');
    console.log('\n💡 提示：这只是单个阶段的演示，完整体验请选择选项 1\n');
  } else {
    console.log('\n❌ 无效的阶段编号\n');
  }
}

// 主程序
async function main() {
  showWelcome();

  while (true) {
    showMenu();
    const choice = await question('请选择 (1-4): ');

    switch (choice) {
      case '1':
        await fullExperience();
        break;
      case '2':
        await exampleDemo();
        break;
      case '3':
        await randomStageExperience();
        break;
      case '4':
        console.log('\n👋 感谢体验 DRD 方法论！\n');
        rl.close();
        return;
      default:
        console.log('\n❌ 无效的选择，请重新输入\n');
    }

    const continueChoice = await question('\n返回主菜单？: ');
    if (continueChoice.toLowerCase() !== 'y') {
      console.log('\n👋 感谢体验 DRD 方法论！\n');
      rl.close();
      return;
    }
  }
}

// 运行主程序
main().catch(console.error);