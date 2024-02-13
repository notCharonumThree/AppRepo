const Curvature = {
  config: {
    name: "Curvature",
    type: "process",
    icon: "https://cdn.jim-nielsen.com/ios/512/arc-search-2024-01-31.png",
    targetVer: "2.0.0"
  },
  run: async process => {
    const wm = await process.loadLibrary("lib/WindowManager")
    const HTML = await process.loadLibrary("lib/HTML")

    const win = wm.createWindow(
      {
        title: "Curvature",
        icon: Curvature.config.icon,
        width: 700,
        height: 500
      },
      process
    )

    const { default: Sortable } = await import(
      "https://cdn.jsdelivr.net/npm/sortablejs@1.15.2/+esm"
    )

    const transparentStyles = {
      background: "rgba(0, 0, 0, 0.1)",
      borderRadius: "15px",
      padding: "10px",
      fontSize: "15px",
      border: "none"
    }

    const Icon = icon =>
      new HTML("i")
        .class("material-symbols-rounded")
        .text(icon)
        .style({
          opacity: "0.6"
        })
    const Flex = () =>
      new HTML("div").style({
        flex: "1"
      })
    const Divider = () =>
      new HTML("div").styleJs({
        width: "100%",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)"
      })
    const Tab = (icon, title, active) => {
      const div = new HTML("div").styleJs({
        width: "100%",
        display: "flex",
        alignItems: "center",
        padding: "10px",
        gap: "10px"
      })

      if (icon.startsWith("https://")) {
        div.append(
          new HTML("img").attr({
            src: icon,
            width: "24px",
            height: "24px"
          })
        )
      } else {
        div.append(Icon(icon))
      }

      div.append(new HTML("span").text(title))

      if (active) {
        div.styleJs({
          background: "white",
          borderRadius: "10px",
          border: "none",
          boxShadow: "0 1.5px 3.5px rgba(0, 0, 0, 0.25)"
        })
      }
      return div
    }

    const sites = [
      {
        name: "YouTube",
        url: "https://youtube.com",
        icon: "https://s2.googleusercontent.com/s2/favicons?domain=youtube.com"
      },
      {
        name: "Discord",
        url: "https://discord.com",
        icon: "https://s2.googleusercontent.com/s2/favicons?domain=discord.com"
      },
      {
        name: "Minecraft",
        url: "https://minecraft.net",
        icon:
          "https://s2.googleusercontent.com/s2/favicons?domain=minecraft.net"
      },
      {
        name: "Google",
        url: "https://google.com",
        icon: "https://s2.googleusercontent.com/s2/favicons?domain=google.com"
      }
    ]

    const body = new HTML(win.content)

    new HTML("style").appendTo(body).html(`
	* {
		box-sizing: border-box;
		font-family: Inter, sans-serif;
	}
	.material-symbols-rounded {
  		font-variation-settings:
  			'FILL' 0,
  			'wght' 500,
  			'GRAD' 0,
  			'opsz' 48
	}
	.ghost {
		opacity: 0.5;
	}

@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-display: swap;
  font-weight: 400;
  src: url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff2) format('woff2'), url(https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.woff) format('woff');
  unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
}


`)

    const container = new HTML("div").appendTo(body).styleJs({
      background: "linear-gradient(135deg, yellow, coral)",
      width: "100%",
      height: "100%",
      display: "flex",
      gap: "10px",
      padding: "10px",
      transition: "gap .5s cubic-bezier(1,0,0,1)"
    })

    const sidebar = new HTML("div").appendTo(container).styleJs({
      width: "225px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      overflow: "hidden",
      transition: "width .5s cubic-bezier(1,0,0,1)"
    })

    const iframe = new HTML("div").appendTo(container).styleJs({
      flex: "1",
      background: "white",
      borderRadius: "10px",
      overflow: "hidden",
      boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
      position: "relative"
    })

    let isSidebarOpen = true

    const actions = new HTML("div")
      .appendTo(sidebar)
      .styleJs({
        display: "flex",
        gap: "10px"
      })
      .appendMany(
        Icon("view_sidebar").on("click", () => {
          if (isSidebarOpen) {
            sidebar.style({
              width: "0",
              padding: "0"
            })
            container.style({
              gap: "0"
            })
          } else {
            sidebar.style({
              width: "225px",
              padding: "0"
            })
            container.style({
              gap: "10px"
            })
          }

          isSidebarOpen = !isSidebarOpen
        }),
        Flex(),
        Icon("arrow_back"),
        Icon("arrow_forward"),
        Icon("refresh")
      )
    const input = new HTML("input").appendTo(sidebar).styleJs({
      ...transparentStyles,
      width: "100%",
      padding: "10px 15px",
      display: "flex",
      alignItems: "center",
      letterSpacing: "0.5px"
    })
    const buttons = new HTML("div").appendTo(sidebar).styleJs({
      display: "flex",
      gap: "10px",
      marginTop: "5px"
    })
    const tabs = new HTML("div").appendTo(sidebar).styleJs({
      display: "flex",
      flexDirection: "column",
      gap: "5px"
    })

    new Sortable(tabs.elm, {
      animation: 150,
      ghostClass: "ghost"
    })

    sidebar.append(Divider())
    sidebar.append(
      Tab("add", "New Tab", false).on("click", () => {
        tabsArray.push(new BrowserTab("https://www.google.com/webhp?igu=1"))
      })
    )

    for (const site of sites) {
      new HTML("button")
        .appendTo(buttons)
        .styleJs({
          ...transparentStyles,
          flex: "1",
          display: "flex",
          aspectRatio: "1 / 1",
          justifyContent: "center",
          alignItems: "center"
        })
        .append(
          new HTML("img").attr({
            src: site.icon,
            alt: site.name,
            width: "20"
          })
        )
    }

    input.attr({
      value: "example.com"
    })

    const genTabID = () =>
      Math.random()
        .toString(36)
        .substring(7)

    class BrowserTab {
      active = false
      id = genTabID()

      constructor(url) {
        this.url = url
        this.render()
      }

      render = () => {
        this.tab = Tab(
          `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${this.url}&size=64`,
          "Tab",
          false
        )
        this.tabElement = new HTML("iframe").attr({
          src: this.url,
          width: "100%",
          height: "100%",
          frameBorder: "0",
          borderRadius: "10px",
          display: "absolute",
          top: "0",
          left: "0",
          overflow: "hidden"
        })
        this.tabElement.on("load", () => {
          this.url = this.tabElement?.elm.contentDocument?.URL
          this.tab
            ?.qs("span")
            ?.text(this.tabElement?.elm.contentDocument?.title || "Tab")
          this.tab?.qs("img")?.attr({
            src: `https://s2.googleusercontent.com/s2/favicons?domain=${this.url}`
          })
        })
        this.tab.on("click", () => {
          this.setActive(true)
        })
        this.setActive(true)
        this.tab.appendTo(tabs)
        this.tabElement.appendTo(iframe)
      }

      setActive = active => {
        this.active = active
        this.tabElement?.attr({
          style: active ? "display: block;" : "display: none;"
        })
        this.tab?.styleJs({
          background: active ? "white" : "transparent",
          borderRadius: active ? "10px" : "0",
          boxShadow: active ? "0 1.5px 3.5px rgba(0, 0, 0, 0.25)" : "none"
        })
        if (active === true) {
          tabsArray.forEach(tab => {
            console.log(tab !== this && tab.active === true)
            if (tab !== this && tab.active === true) tab.setActive(false)
          })
        }
      }
    }

    const tabsArray = []
  }
}
