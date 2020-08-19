module.exports = {
    plugins: {
      'autoprefixer': {
        overrideBrowserslist: [
          'Android 4.1',
          'iOS 7.1',
          'Chrome > 31',
          'ff > 31',
          'ie >= 8'
        ]
      },
      'postcss-pxtorem': {
                    // 设计稿 375: 37.5
              // 设计稿：750: 75
              // Vant 是基于 375
        rootValue: 37.5,
        propList: ['*']
      }
    }
  }