import ConsoleLog from '../utils/consoleLog'
export default async (app) => {
  const port = app.config.listen.port;
  const log = new ConsoleLog()
  app.listen(port, () => {
    //porintLogo()
    log.info(`Server Port:${c.cyan}${port}${c.end}`)
    log.info(`Server lifted in:${c.cyan}${app.appPath}${c.end}`)
    // app.redisConMsg && log(app.redisConMsg)
    // app.mysqlConMsg && log(app.mysqlConMsg)
    // app.esConMsg && log(app.esConMsg)
    log.info('To shut down, press <CTRL> + C at any time.\n')
  })
}
// const log = message => process.stdout.write(message + '\n');
const c = { cyan: '\x1b[36m', red: '\x1b[31m', end: '\x1b[39m' }
const porintLogo = () => {
  console.log(`${c.cyan}
       \\     /    -------     \\     /                     |   /         - - -              /\\               
        \\   /        |         \\   /                      |  /         /     \\            /  \\              
         \\ /         |          \\ /                       | /         /       \\          /    \\             
          |          |           |      -------------     |          |         |        /      \\            
          |          |           |                        | \\        |         |       / ------ \\           
          |      \\   /           |                        |  \\        \\       /       /          \\          
          |       \\ /            |                        |   \\        \\_ _ _/       /            \\         

    ${c.end}`)
}