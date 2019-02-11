import dva from 'dva-react-router-3';
import createLoading from 'dva-loading';
import { notification } from 'antd';
import './index.html';
import './index.less';

// 1. Initialize
const app = dva({
  onError(e) {
    // eslint-disable-next-line
    console.error(e);
    notification.error({
      message: e.message,
    });
  },
});

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(require('./models/auth'));
app.model(require('./models/list'));
app.model(require('./models/contribute'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
