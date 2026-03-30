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
        text: '股票',
        iconPath: 'assets/icons/stock.png',
        selectedIconPath: 'assets/icons/stock-active.png'
      },
      {
        pagePath: 'pages/records/index',
        text: '记录',
        iconPath: 'assets/icons/record.png',
        selectedIconPath: 'assets/icons/record-active.png'
      },
      {
        pagePath: 'pages/mine/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user-active.png'
      }
    ]
  }
})
