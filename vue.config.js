module.exports = {
    devServer:{
        proxy:{
           '/app':{
                target:'http://ttapi.research.itcast.cn/',
                ws:true,
                changeOrigin: true
            },
        }
    }
};                       