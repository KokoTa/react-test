
module.exports = {
  // 更多用法参见插件说明
  '/api/postList': {
    'data|10': [{
      id: '@inc(10000)',
      title: '@cstr(4,10)',
      content: '@cparagraph'
    }]
  }
}
