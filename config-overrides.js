// Overrides baked config provided by create-react-app
const { override, fixBabelImports, addBabelPlugin } = require('customize-cra');
module.exports = override(
  addBabelPlugin('emotion'),
  fixBabelImports('import', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: 'css'
  })
);
