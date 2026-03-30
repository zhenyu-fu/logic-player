import React from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import './app.less';

function App(props: React.PropsWithChildren) {
  useDidShow(() => {});
  useDidHide(() => {});
  return props.children;
}

export default App;
