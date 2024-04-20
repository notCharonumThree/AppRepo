const Discord = {
  config: {
    name: 'Discord',
    type: 'process',
    icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/discord.svg',
    targetVer: '1.0.0-indev.0'
  },
  run: async (process) => {
    const wm = await process.loadLibrary('lib/WindowManager')
    const xor = await process.loadLibrary('lib/XOR')
    const HTML = await process.loadLibrary('lib/HTML')
    
    const win = wm.createWindow({
      title: 'Discord',
      icon: Discord.config.icon,
      width: 700,
      height: 500
    }, process)

    new HTML('iframe').attr({
      src: `${process.kernel.config['SERVER']}/a/${xor.encode('https://discord.com/app/')}`,
    }).style({
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'white'
    }).appendTo(win.content)
  }
}

export default Discord
