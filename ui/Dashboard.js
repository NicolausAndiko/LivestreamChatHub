import PlatformCard from "./PlatformCard.js";
import LogPanel from "./LogPanel.js";
import OverlayPanel from "./OverlayPanel.js";

class Dashboard{
  constructor(){
    this.platformContainer=
      null;
    this.logContainer=
      null;
  }

  async init(){
    this.platformContainer=
      document.getElementById(
        "platform-list"
      );
    this.logContainer=
      document.getElementById(
        "log-panel"
      );
    window.api
      .platform
      .onChanged(
        async()=>{
          await this.renderPlatforms();
        }
      );
    window.api
      .emote
      .onChanged(
        async()=>{
          await this.renderEmotes();
        }
      );
    window.api
      .log
      .onMessage(
        log=>{
          if(
            !this.logContainer
          ){

            return;

          }

          const item=

            LogPanel.create(

              log

            );

          this.logContainer.append(

            item

          );

          this.logContainer.scrollTop=

            this.logContainer.scrollHeight;

        }

      );

    await this.refresh();

  }

  async refresh(){

    await this.renderPlatforms();

    await this.renderOverlay();

    await this.renderEmotes();

  }

  createPlatformCards(

    platforms

  ){

    return platforms.map(

      platform=>

        PlatformCard.create(

          platform,

          {

            connect:
              this.connectPlatform.bind(
                this
              ),

            disconnect:
              this.disconnectPlatform.bind(
                this
              ),

            remove:
              this.removePlatform.bind(
                this
              )

          }

        )

    );

  }

  async renderPlatforms(){

    if(

      !this.platformContainer

    ){

      return;

    }

    const platforms=

      await window.api
        .platform
        .getAll();

    this.platformContainer.replaceChildren(

      ...this.createPlatformCards(

        platforms

      )

    );

  }

  async renderOverlay(){

    const status=

      await window.api
        .overlay
        .getStatus();

    OverlayPanel.update(

      status

    );

  }

  async renderEmotes(){

    const badge=

      document.getElementById(

        "emote-count"

      );

    if(

      !badge

    ){

      return;

    }

    const count=

      await window.api
        .emote
        .count();

    badge.textContent=

      `${count} Emotes`;

  }

  async connectPlatform(

    platform

  ){

    const platforms=

      await window.api
        .platform
        .getAll();

    const current=

      platforms.find(

        item=>

          item.platform===

          platform.platform

      );

    if(

      current

    ){

      current.connected=

        "connecting";

    }

    this.platformContainer.replaceChildren(

      ...this.createPlatformCards(

        platforms

      )

    );

    await new Promise(

      resolve=>

        requestAnimationFrame(

          resolve

        )

    );

    const success=

      await window.api
        .platform
        .connect(

          platform

        );

    platform.connected=

      success;

    await this.refresh();

  }

  async disconnectPlatform(

    platform

  ){

    await window.api
      .platform
      .disconnect(

        platform

      );

    await this.refresh();

  }

  async addPlatform(

    platform

  ){

    await window.api
      .platform
      .add(

        platform

      );

  }

  async removePlatform(

    platform

  ){

    await window.api
      .platform
      .remove(

        platform

      );

  }

  async startOverlay(){

    await window.api
      .overlay
      .start();

    await this.renderOverlay();

  }

  async stopOverlay(){

    await window.api
      .overlay
      .stop();

    await this.renderOverlay();

  }

  async openDialog(
    type
  ){
    switch(
      type
    ){
      case "emotes":
        await window.api
          .window
          .openEmote();
        break;
      case "add-platform":
        await window.api
          .window
          .openPlatform();
        break;
      default:
        break;
    }
  }

  async copyOverlayURL(){
    const input=
      document.getElementById(
        "overlay-url"
      );
    const button=
      document.getElementById(
        "copy-overlay-url"
      );
    if(
      !input||
      !button
    ){
      return;
    }
    try{
      await navigator.clipboard.writeText(
        input.value
      );
      button.innerHTML=
        `
        <span class="material-symbols-outlined">
            done_all
        </span>
        Copied!
        `;
      button.disabled=
        true;
      setTimeout(
        ()=>{
          button.textContent=
            "Copy";
          button.disabled=
            false;
        },
        3000
      );
    }
    catch{
      button.textContent=
        "✖";
      setTimeout(
        ()=>{
          button.textContent=
            "Copy";
        },
        3000
      );
    }
  }
}

export default
  new Dashboard();