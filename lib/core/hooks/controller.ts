import glob from 'glob';
import path from 'path';
import type KoaCore from '..';
/**
 * @param {KoaCore} app
 * - 模仿egg.js约定，在项目中建立controller文件夹，遍历文件将controller和上面的方法挂载到app对象上。
 * - 同时在代码中对controller命名做了部分约定
 */
export default async (app) => {
  const controllPath = `${path.join(app.appPath, './controller', `**/*${app.extName}`)}`.replace(/\\/g, '/')
  const controllerFiles = glob.sync(controllPath);
  app.controller = {}
  for (const controllerFile of controllerFiles) {
    const controller = await import(controllerFile)
    const { name: controllerName } = controller.default;
    if (controllerName === undefined) {
      continue;
    }
    if (!/Controller$/.test(controllerName)) {
      throw new Error("controller mast end with 'Controller'");
    }
    const name = controllerName.replace('Controller', '').toLowerCase();
    if (name === controllerName) {
      throw new Error("controller name must contain 'Controller'");
    }
    if (app.controller[name]) {
      throw new Error(`the controller width name '${name}' is repeatedly declared`);
    } else {
      app.controller[name] = {}
    }
    const prototype = controller.default.prototype
    const prototypes = Object.getOwnPropertyNames(controller.default.prototype);
    for (const key of prototypes) {
      if (key !== 'constructor' && typeof prototype[key] === 'function') {
        const element = prototype[key];
        app.controller[name][key] = element;
      }
    }
  }

}