const Eaglercraft = {
  config: {
    name: 'Eaglercraft',
    type: 'process',
    icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/minecraft.svg',
    targetVer: '1.0.0-indev.0'
  },
  run: async (process) => {
    const wm = await process.loadLibrary('lib/WindowManager')
    const xor = await process.loadLibrary('lib/XOR')
    const HTML = await process.loadLibrary('lib/HTML')
    
    const win = wm.createWindow({
      title: 'Eaglercraft',
      icon: Eaglercraft.config.icon,
      width: 700,
      height: 500
    }, process)

    new HTML('iframe').attr({
      src: `/a/${xor.encode('https://eaglercraft.com/mc/1.8.8/')}`,
    }).style({
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'white'
    }).appendTo(win.content)
  }
}

export default Eaglercraft
