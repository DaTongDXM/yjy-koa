// This file is created by yjy-koa
// Do not modify this file!!!!!!!!!
import 'koa';import IndexController from '../../controller/index';
import UserController from '../../controller/user';

declare module 'koa'{
interface Icontroller{
    index:IndexController;
user:UserController;
}}
import IndexController from '../../controller/index';
import UserController from '../../controller/user';

declare module 'koa'{
interface Icontroller{
    index:IndexController;
user:UserController;
}}
