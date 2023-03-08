import { App } from '../types/index';
import path from 'path';
import glob from 'glob';
import fs from 'fs';
const excludeDir = ['node_modules', 'typings', 'typings1', "config"]
export default async (app: App) => {
  const { appPath } = app;
  const typingsPath = path.resolve(appPath, 'typings1');
  let isExists = fs.existsSync(typingsPath)
  if (!isExists) {
    fs.mkdirSync(typingsPath)
  }
  const includes = fs.readdirSync(appPath).filter(el => {
    return !excludeDir.includes(el) && !el.includes(".")
  });
  includes.map(el => initTypingDir(app, typingsPath, el))

}
/**
 * 初始化文件目录
 * @param app 
 * @param typingsPath typing文件夹路径
 * @param subPath 需要创建描述文件的文件夹
 * @returns 
 */
function initTypingDir(app: App, typingsPath: string, subPath: string) {
  //文件源目录
  const sDir = path.join(app.appPath, subPath);
  if (!fs.existsSync(sDir)) {
    return;
  }
  //文件目标目录
  const tDir = path.join(typingsPath, subPath)
  if (!fs.existsSync(tDir)) {
    fs.mkdirSync(tDir)
    console.log(path.join(tDir, 'index.d.ts'))
    if (!fs.existsSync(path.join(tDir, 'index.d.ts'))) {
      fs.writeFileSync(path.join(tDir, 'index.d.ts'), `// This file is created by yjy-koa
// Do not modify this file!!!!!!!!!
import 'koa';`
      )
    }

  }
  initTypingFile(app, sDir, tDir, subPath)
}
/**
 * 写入化描述文件
 * @param app 
 * @param sDir 描述文件源路径
 * @param tDir 描述文件路径
 * @param subPath 创建描述文件的文件夹 controller/service/config等
 */
async function initTypingFile(app: App, sDir: string, tDir: string, subPath: string) {
  const sFilePath = `${path.join(sDir, `**/*${app.extName}`)}`.replace(/\\/g, '/')
  const sFiles = glob.sync(sFilePath);
  let importStr = ''
  const interfaceMap = {}
  for (const sFile of sFiles) {
    const sModule = await require(sFile).default
    const sModuleName = sModule.name.toLowerCase().replace(subPath, '')
    importStr += getImportStr(tDir, sModule, sModuleName, sFile, interfaceMap)
  }

  const content = `${importStr}\n` +
    `declare module 'koa'{\n` +
    `${composeInterface(subPath, interfaceMap)}` +
    `}\n`
  fs.appendFile(path.join(tDir, 'index.d.ts'), content, (error) => {
    //TODO 后续这里补充日志
  })

}
/**
 * 获取import字符串
 * @param tDir 描述文件路径
 * @param sModule 具体类，以类做interface
 * @param sModuleName 处理后类名，对应router里controller.后的一部分
 * @param sFile 类文件路径
 * @param interfaceMap map映射
 * @returns 
 */
function getImportStr(tDir, sModule, sModuleName, sFile, interfaceMap) {
  //import ExportIndex from '../../controller/index';
  const importPath = path.relative(tDir, sFile).replace('.ts', '').replace(/\/|\\/g, '/');
  interfaceMap[sModuleName] = sModule;
  return `import ${sModule.name} from '${importPath}';\n`
}

/**
 * 合并interface内部类型
 * @param subPath 接口名称
 * @param interfaceMap 接口map
 * @returns 
 */
function composeInterface(subPath: string, interfaceMap: object) {
  // interface Icontroller {
  //   index: ExportIndex;
  // }
  let mid = ''
  Object.keys(interfaceMap).forEach(key => {
    mid += `${key}:${interfaceMap[key].name};\n`
  })
  return `interface I${subPath}{
    ${mid}}`
}