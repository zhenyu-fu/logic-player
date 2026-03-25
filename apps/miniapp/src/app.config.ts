export default defineAppConfig({
  pages: [
    'pages/stocks/index',
    'pages/records/index',
    'pages/mine/index',
    'pages/stockEdit/index',
    'pages/recordEdit/index',
    'pages/settings/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '逻辑播放器',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#4e5969',
    selectedColor: '#165dff',
    backgroundColor: '#ffffff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/stocks/index',
        text: '股票'
      },
      {
        pagePath: 'pages/records/index',
        text: '记录'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的'
      }
    ]
  }
})
