module.exports = {
    plugins: {
    //   autoprefixer: {
    //     browsers: ['Android >= 4.0', 'iOS >= 8'],
    //   },
      //px 转换成 rem
      'postcss-pxtorem': {
        //按照设计稿的宽来修改值
        rootValue: 37.5,

        //需要转换的属性
        propList: ['*'],
      },
    },
  };