import dva from 'dva';
import './index.html';
import 'antd/dist/antd.min.css';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/auth'));
app.model(require('./models/list'));
app.model(require('./models/contribute'));

// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
