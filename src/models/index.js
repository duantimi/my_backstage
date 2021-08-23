// Use require.context to require reducers automatically
const contextMain = require.context('./', false, /\.js$/);
const contextChild = require.context('@/routes/', true, /(models\/).*(.js)$/);
const modelsMain = contextMain
  .keys()
  .filter((item) => item != './index.js')
  .map((key) => contextMain(key));
const modelsChild = contextChild
  .keys()
  .filter((item) => item != './index.js')
  .map((key) => contextChild(key));

export default [...modelsMain, ...modelsChild];
