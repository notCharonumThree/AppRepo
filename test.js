export default class TestApp {
  meta = {
    name: 'Test',
    description: 'A testing app.',
    pkg: 'flow.test',
    version: '1.0.0'
  }

  async open () {
    const win = window.wm.createWindow({
      title: this.meta.name,
      icon: '',
      width: 700,
      height: 300
    })

    win.content.style.background = 'var(--base)'
    win.content.innerHTML = 'Tester'

    return win
  }
}
