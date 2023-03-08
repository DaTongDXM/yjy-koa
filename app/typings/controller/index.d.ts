import IndexController from '../../controller/index';
import UserController from '../../controller/user';

declare module 'koa'{
interface Icontroller{
    index:IndexController;
user:UserController;
}}
