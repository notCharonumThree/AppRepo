const Movies = {
  config: {
    name: 'movie-web',
    type: 'process',
    icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/mplayer.svg',
    targetVer: '2.1.1'
  },
  run: async (process) => {
    const wm = await process.loadLibrary('lib/WindowManager')
    const xor = await process.loadLibrary('lib/XOR')
    const HTML = await process.loadLibrary('lib/HTML')
    
    const win = wm.createWindow({
      title: 'movie-web',
      icon: Movies.config.icon,
      width: 700,
      height: 500
    }, process)

    new HTML('iframe').attr({
      src: `/service/${xor.encode('https://movie-web.app/')}`,
    }).style({
      width: '100%',
      height: '100%',
      border: 'none',
      background: 'white'
    }).appendTo(win.content)
  }
}

export default YouTube
