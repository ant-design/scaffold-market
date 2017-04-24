import Github from 'github-api';
import { routerRedux } from 'dva/router';
import yaml from 'js-yaml';
import { parseGithubUrl } from '../utils/github';

export default {
  namespace: 'contribute',

  state: {
    visible: false,
    repo: null,
  },

  effects: {
    *validateRepo({ payload }, { put, select }) {
      // https://github.com/dvajs/dva-example-user-dashboard/
      const { user, repo } = parseGithubUrl(payload);
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

        const readme = yield repos.getContents('master', 'README.md', true);
        // eslint-disable-next-line
        console.log('>> readme', readme);

        yield put({
          type: 'saveRepo',
          payload: {
            ...data,
            readme: readme.data,
            isValidScaffold: 'start' in packageJson.data.scripts,
            isReact: 'react' in packageJson.data.dependencies,
            isAngular: 'angular' in packageJson.data.dependencies,
          },
        });
      }
    },
    *submit({ payload }, { select, put }) {
      const { auth, contribute } = yield select();
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
          readme: contribute.repo.readme,
          deployedAt: new Date(),
        }),
        'submit new scaffold',
        {
          encode: 'utf-8',
        },
      );

      // pr
      const pullRequestResult = yield scaffoldRepo.createPullRequest({
        title: `Add template ${payload.name} to the market`,
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

      // redirect to finish page
      yield put(routerRedux.push(`/contribute/finish?pull=${pullRequestResult.data.html_url}`));
    },
  },

  reducers: {
    saveRepo(state, { payload }) {
      return { ...state, repo: payload };
    },
  },
};
