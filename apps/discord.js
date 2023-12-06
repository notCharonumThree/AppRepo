export default class DiscordApp {
  meta = {
    name: 'Discord',
    description: 'Discord is the easiest way to talk over voice, video, and text. Talk, chat, hang out, and stay close with your friends and communities.',
    pkg: 'discord.discord',
    version: '1.0.0'
  }

  async open () {
    const win = window.wm.createWindow({
      title: this.meta.name,
      icon: 'https://raw.githubusercontent.com/Flow-Works/AppRepo/main/assets/discord.png',
      width: 700,
      height: 300
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
      <iframe src="/service/${xor.encode('https://discord.com')}" style="width: 100%;height: 100%;"/>
    `

    return win
  }
}
