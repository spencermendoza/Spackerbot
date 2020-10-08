module.exports = {
    name: '8ball',
    description: 'Will use my magic powers to shake a pretend 8ball and I\'ll let you know what the result is! For fun! HAHAHAHA!',
    execute(message, args) {
        message.channel.send(`you gave me commands with a little side of args, here are the args: ${args}`);
    }
}