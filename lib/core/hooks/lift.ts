export default async (app) => {
  const port = app.config.listen.port;
  console.log('lift1', port)
  app.listen(port, () => {
    porintLogo()
    log(`Server Port${c.cyan}${port}${c.end}`)
    log(`Server lifted in${c.cyan}${app.appPath}${c.end}`)
    // app.redisConMsg && log(app.redisConMsg)
    // app.mysqlConMsg && log(app.mysqlConMsg)
    // app.esConMsg && log(app.esConMsg)
    log('To shut down, press <CTRL> + C at any time.\n')
  })
}
const log = message => process.stdout.write(message + '\n');
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