import 'koa';
import ExportIndex from '../../controller/index';
declare module 'koa' {
  interface Icontroller {
    index: ExportIndex;
  }
}