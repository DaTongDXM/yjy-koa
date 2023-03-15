import path from 'path';
import assert from 'assert';
import fs from 'fs'
import { App } from '../types/index'
export default (app: App) => {
  const appPath = app.appPath;
  const configFPath = path.join(appPath, 'config1')


  console.log(fs.statSync(configFPath));



  assert(fs.existsSync(configFPath), `Directory ${configFPath} not exists`);
  assert(fs.statSync(configFPath).isDirectory(), `Directory ${configFPath} is not a directory`)
  assert(false)
  console.log('end')



}