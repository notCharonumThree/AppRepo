const Reddit = {
  config: {
    name: 'Reddit',
    type: 'process',
    icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/reddit.svg',
    targetVer: '1.0.0-indev.0'
  },
  run: async (process) => {
    const wm = await process.loadLibrary('lib/WindowManager')
    const xor = await process.loadLibrary('lib/XOR')
    const HTML = await process.loadLibrary('lib/HTML')
    
    const win = wm.createWindow({
      title: 'Reddit',
      icon: Reddit.config.icon,
      width: 700,
      height: 500
    }, process)

    new HTML('iframe').attr({
      src: `/service/${xor.encode('https://reddit.com/')}`,
    }).style({
      width: '100%',
      height: '100%',
      border: 'none'
    }).appendTo(win.content)
  }
}

export default Reddit
