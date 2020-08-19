
    module.exports = {
        devServer:{
            open: true,
            proxy:{
                '/api': {
                    target: 'http://mengxuegu.com:7300/mock/5f266cadbfeb617fe7415260',
                    changeOrigin: true,
                    secure: false,
                    pathRewrite: {
                        '^/api': '',  //需要rewrite的,前缀替换为空的
                      }
                  }
            }
        },
        css: {
            loaderOptions: {
                sass: {
                    prependData: `;`
                }
            }
        },
        
    }
