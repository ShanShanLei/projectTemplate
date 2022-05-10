// git commit 提交规范配置文件
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2, // level: 0-disable, 1-warning, 2-error
      'always', // 应用与否: always|never
      [
        // 验证规则
        'feat', // 新功能(feature)
        'fix', // 修复(bug)
        'chore', // 构建过程或辅助工具的变动
        'docs', // 文档(documentation)
        'style', // 格式(不影响代码运行的变动)
        'perf', // 性能优化相关
        'test', // 测试相关
        'revert', // 回滚代码
        'refactor', // 重构(即不是新增功能，也不是修改bug的代码变动)
      ],
    ],
    'type-case': [2, 'always', 'lowerCase'],
    'type-empty': [2, 'never'],
    'scope-empty': [0],
    'scope-case': [2, 'always', 'lowerCase'],
    'subject-case': [0, 'never'],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [0, 'never'],
    'header-max-length': [0, 'always', 100],
  },
}
