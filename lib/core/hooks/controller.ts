import glob from 'glob';
import path from 'path';
export default async (app) => {
  const controllPath = `${path.join(app.appPath, './controller', `**/*${app.extName}`)}`.replace(/\\/g, '/')
  const controllerFiles = glob.sync(controllPath);
  app.controller = {}
  for (const controllerFile of controllerFiles) {
    const controller = await import(controllerFile)
    const { name: controllerName } = controller.default;
    if (!/Controller$/.test(controllerName)) {
      throw new Error("controller mast end with 'Controller'");
    }
    const name = controllerName.replace('Controller', '').toLowerCase();
    app.controller[name] = {}

    const prototype = controller.default.prototype;
    app.controller[name] = Object.assign({}, prototype)
    for (const key in prototype) {
      if (typeof prototype[key] !== 'function') {
        const element = prototype[key];
        app.controller[name][key] = element;
      }
    }
    // app.controller[name] = { ...controller.default.prototype };
    // console.log(app.controller[name].index)
    console.log(app.controller[name])
  }

}