class PlatformPage{

  constructor(){

    this.platforms=
      [];

    this.youtube=
      null;

    this.twitch=
      null;

    this.tiktok=
      null;

    this.grid=
      null;

  }

  async init(){

    this.grid=
      document.getElementById(
        "platform-grid"
      );

    this.youtube=
      document.getElementById(
        "youtube-card"
      );

    this.twitch=
      document.getElementById(
        "twitch-card"
      );

    this.tiktok=
      document.querySelector(
        ".platform-card.disabled"
      );

    this.registerEvents();

    await this.refresh();

  }

  registerEvents(){

    this.youtube
      .addEventListener(

        "click",

        ()=>{

          this.addPlatform(
            "youtube"
          );

        }

      );

    this.twitch
      .addEventListener(

        "click",

        ()=>{

          this.addPlatform(
            "twitch"
          );

        }

      );

  }

  async refresh(){

    this.platforms=

      await window.api
        .platform
        .getAll();

    this.render();

  }

  render(){

    this.youtube.style.display=
      "";

    this.twitch.style.display=
      "";

    for(

      const platform

      of this.platforms

    ){

      switch(

        platform.platform

      ){

        case "youtube":

          this.youtube.style.display=
            "none";

          break;

        case "twitch":

          this.twitch.style.display=
            "none";

          break;

      }

    }

    const visible=

      this.grid.querySelectorAll(

        ".platform-card:not([style*='display: none'])"

      );

    if(

      visible.length===0

    ){

      this.grid.innerHTML=

        `
        <div
          class="empty">

          All available platforms
          have already been added.

        </div>
        `;

    }

  }

  async addPlatform(

    platform

  ){

    await window.api
      .platform
      .add({

        platform,

        username:
          "",

        connected:
          false

      });

    window.close();

  }

}

new PlatformPage()
  .init();