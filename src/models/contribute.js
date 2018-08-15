import Github from 'github-api';
import { routerRedux } from 'dva/router';
import yaml from 'js-yaml';
import { message } from 'antd';
import { fetch } from '../services/list';
import { parseGithubUrl } from '../utils/github';

export default {
  namespace: 'contribute',

  state: {
    visible: false,
    repo: null,
  },

  effects: {
    *validateRepo({ payload, intl }, { put, select, call }) {
      const scaffoldsData = yield call(fetch);
      const { user, repo } = parseGithubUrl(payload);
      if (scaffoldsData.data && scaffoldsData.data.list) {
        const existed = scaffoldsData.data.list.some((item) => {
          const result = parseGithubUrl(item.git_url);
          return user === result.user && repo === result.repo;
        });
        if (existed) {
          message.error(intl.formatMessage({ id: 'existed' }));
          return;
        }
      }

      if (user && repo) {
        const { auth } = yield select();
        const { accessToken } = auth;
        const github = new Github({ token: accessToken });

        // read basic information of repo
        const repos = yield github.getRepo(user, repo);
        const { data } = yield repos.getDetails();

        // parse package.json of repo
        const packageJson = yield repos.getContents('master', 'package.json', true);
        // eslint-disable-next-line
        console.log('>> packageJson', packageJson);

        yield put({
          type: 'saveRepo',
          payload: {
            ...data,
            isValidScaffold: 'start' in packageJson.data.scripts,
            isReact: 'react' in packageJson.data.dependencies,
            isAngular: 'angular' in packageJson.data.dependencies,
          },
        });
      }
    },
    *submit({ payload }, { select, put }) {
      const { auth } = yield select();
      const { accessToken } = auth;
      const github = new Github({ token: accessToken });
      // fork scaffold-market repo
      const scaffoldRepo = yield github.getRepo('ant-design', 'scaffold-market');
      const fork = yield scaffoldRepo.fork();
      const user = fork.data.owner.login;
      const repo = fork.data.name;

      const forkedRepo = yield github.getRepo(user, repo);

      const branchName = `scaffold-${payload.name}-${Date.now()}`;

      // create branch
      yield forkedRepo.createBranch('master', branchName);

      // update list
      yield forkedRepo.writeFile(
        branchName,
        `scaffolds/${payload.name}/index.yml`,
        yaml.safeDump({
          ...payload,
          deployedAt: new Date(),
        }),
        `submit new scaffold: ${payload.name}`,
        {
          encode: 'utf-8',
        },
      );

      // pr
      const pullRequestResult = yield scaffoldRepo.createPullRequest({
        title: `Add ${payload.name} to the market`,
        head: `${user}:${branchName}`,
        base: 'master',
        body: `
- Name: \`${payload.name}\`
- Url: \`${payload.git_url}\`
${payload.coverPicture ? `- Cover Picture:\n![](${payload.coverPicture})` : ''}
        `,
      });

      // eslint-disable-next-line
      console.log('>> pullRequestResult', pullRequestResult);

      // const master = yield forkedRepo.getBranch('master');
      // const masterSHA = master.data.commit.sha;
      // createTree

      // clear saved repo
      yield put({
        type: 'saveRepo',
        payload: null,
      });

      // redirect to finish page
      yield put(routerRedux.push(`/contribute/finish?pull=${pullRequestResult.data.html_url}`));
    },
    *deploy({ payload, intl }, { select }) {
      const { auth } = yield select();
      const { accessToken } = auth;
      const github = new Github({ token: accessToken });
      // fork scaffold-market repo
      const scaffoldRepo = yield github.getRepo('ant-design', 'scaffold-market');
      const fork = yield scaffoldRepo.fork();
      const user = fork.data.owner.login;
      const repo = fork.data.name;

      const forkedRepo = yield github.getRepo(user, repo);

      const branchName = `scaffold-${payload.name}-${Date.now()}`;

      // create branch
      yield forkedRepo.createBranch('master', branchName);

      const indexYml = yield scaffoldRepo.getContents('master', `scaffolds/${payload.name}/index.yml`, true);
      const deployedAt = new Date().toISOString();

      // update list
      yield forkedRepo.writeFile(
        branchName,
        `scaffolds/${payload.name}/index.yml`,
        indexYml.data.replace(/deployedAt:.*$/gm, `deployedAt: ${deployedAt}`),
        `Update scaffold ${payload.name} deployedAt`,
        {
          encode: 'utf-8',
        },
      );

      // pr
      yield scaffoldRepo.createPullRequest({
        title: `Re-deploy ${payload.name}`,
        head: `${user}:${branchName}`,
        base: 'master',
        body: deployedAt,
      });

      message.success(intl.formatMessage({ id: 'successed' }));
    },
  },

  reducers: {
    saveRepo(state, { payload }) {
      return { ...state, repo: payload };
    },
  },
};
