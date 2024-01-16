const Test = {
  config: {
    name: 'Test',
    type: 'process',
    targetVer: '1.0.0-indev.0'
  },
  run: async (process) => {
    const wm = await process.loadLibrary('lib/WindowManager')
    const HTML = await process.loadLibrary('lib/HTML')

    const win = wm.createWindow({
      title: this.meta.name,
      icon: '',
      width: 700,
      height: 300
    }, process)

    win.content.style.background = 'var(--base)'

    new HTML('p').text('Hello World!').appendTo(win.content)
  }
}

export default Test
