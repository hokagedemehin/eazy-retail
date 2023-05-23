import 'dotenv/config';

export default ({ config }) => {
  return Object.assign(config, {
    scheme: 'easyretail',
    extra: {
      backendUrl: process.env.BACKEND_URL,
      eas: {
        projectId: '1b05b21e-d2c1-4c55-b697-5ad285b91f45',
      },
    },
  });
};

// export default {
//   expo: {

//     extra: {
//       backendUrl: process.env.BACKEND_URL,
//     },
//   },
// };
