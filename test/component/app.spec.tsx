import ReactDOM from 'react-dom';

// 冒烟测试
test('renders full app without crashing', async () => {
  const div = document.createElement('div');
  div.id = 'app';
  document.body.append(div);

  await import('@web/index');

  ReactDOM.unmountComponentAtNode(div);
});
