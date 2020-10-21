module.exports = {
    name: 'commandlist',
    description: 'list of my commands',
    execute(message, args) {
        var commands = args.map(c => {
            var command = [
                c.name,
                c.description,
            ]
            return command;
        })
        message.channel.send(`Here is a list of all my (probably not) working commands: `)
        for (let i = 0; i < commands.length; i++) {
            message.channel.send('**' + commands[i][0] + '**' + ': ' + commands[i][1]);
        }
    }
}