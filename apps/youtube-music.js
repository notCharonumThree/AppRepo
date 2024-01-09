export default class YouTubeMusicApp {
  meta = {
    name: 'YouTube Music',
    description: 'A new music service with official albums, singles, videos, remixes, live performances and more for Android, iOS and desktop.',
    icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/youtube-music-desktop-app.svg',
    pkg: 'google.youtube-music',
    version: '1.0.0'
  }

  async open () {
    const win = window.wm.createWindow({
      title: this.meta.name,
      icon: this.meta.icon,
      width: 700,
      height: 500
    })

    const xor = {
      randomMax: 100,
      randomMin: -100,

      encode: (str) => {
        if (!str) return str
        return encodeURIComponent(
          str
            .toString()
            .split('')
            .map((char, ind) =>
              ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
            )
            .join('')
        )
      },
      decode: (str) => {
        if (!str) return str
        const [input, ...search] = str.split('?')

        return (
          decodeURIComponent(input)
            .split('')
            .map((char, ind) =>
              ind % 2 ? String.fromCharCode(char.charCodeAt(0) ^ 2) : char
            )
            .join('') + (search.length ? '?' + search.join('?') : '')
        )
      }
    }

    win.content.style.background = 'var(--base)'
    win.content.innerHTML = `
      <iframe src="/service/${xor.encode('https://music.youtube.com/')}" style="width: 100%;height: 100%;border: none;"/>
    `

    return win
  }
}
