import path from 'path';
import fs from 'fs';
import _throw from '../utils/throw';
import { App } from '../types/index'
export default async (app: App) => {
  const appPath = app.appPath;
  const configFPath = path.join(appPath, 'config')

  _throw(fs.existsSync(configFPath), `Directory ${configFPath} not exists`)
  _throw(fs.statSync(configFPath).isDirectory(), `Directory ${configFPath} is not a directory`)

  const baseConfig = require(path.join(configFPath, 'config.base' + app.extName)).default()
  const targetPath = path.join(configFPath, `config.${process.env.NODE_ENV}${app.extName}`)
  _throw(fs.existsSync(targetPath), `Directory ${targetPath} not exists`)
  const targetConfig = require(targetPath).default()
  const res = meagerObj(baseConfig, targetConfig)
  app.config = { ...res };
  fs.writeFile(path.join(app.appPath, 'config.json'), JSON.stringify(res), (err) => {
    if (err) console.log(err)
  })
}
/**
 * 合并config
*/
function meagerObj(base, target) {
  const baseKeys = Object.keys(base)
  if (baseKeys.length === 0) return target;
  const res = { ...base }
  for (const key in target) {
    const tValue = target[key]
    const bValue = base[key]
    if (!bValue) {
      res[key] = base[key];

    }
    if (Object.prototype.toString.call(bValue) === "[object Object]" && Object.prototype.toString.call(bValue) === "[object Object]") {
      res[key] = meagerObj(bValue, tValue)

    } else {
      res[key] = tValue
    }
  }
  return res
}