class PlatformCard{

  create(

    platform,

    callbacks={}

  ){

    const PLATFORM={

      youtube:{

        name:
          "YouTube",

        icon:
          "../assets/youtube.svg",

        description:
          "YouTube Live Chat",

        placeholder:
          "Username"

      },

      twitch:{

        name:
          "Twitch",

        icon:
          "../assets/twitch.svg",

        description:
          "Twitch Live Chat",

        placeholder:
          "Username"

      },

      tiktok:{

        name:
          "TikTok",

        icon:
          "../assets/tiktok.svg",

        description:
          "TikTok Live Chat",

        placeholder:
          "@Username"

      }

    };

    const info=

      PLATFORM[
        platform.platform
      ]??

      {

        name:
          "Unknown",

        icon:
          "../assets/default.svg",

        description:
          "Unknown platform.",

        placeholder:
          ""

      };

    const template=

      document.getElementById(
        "platform-template"
      );

    const card=

      template.content
        .firstElementChild
        .cloneNode(
          true
        );

    card.dataset.platform=
      platform.platform;

    if(

      platform.connected===true

    ){

      card.dataset.status=
        "connected";

    }

    else if(

      platform.connected==="connecting"

    ){

      card.dataset.status=
        "connecting";

    }

    else{

      card.dataset.status=
        "disconnected";

    }

    //--------------------------------------------------
    // Icon
    //--------------------------------------------------

    const icon=

      card.querySelector(
        ".platform-icon img"
      );

    icon.src=
      info.icon;

    icon.alt=
      info.name;

    //--------------------------------------------------
    // Name
    //--------------------------------------------------

    card.querySelector(
      ".platform-name"
    ).textContent=
      info.name;

    //--------------------------------------------------
    // Description
    //--------------------------------------------------

    card.querySelector(
      ".platform-description"
    ).textContent=
      info.description;

    //--------------------------------------------------
    // Username
    //--------------------------------------------------

    const input=

      card.querySelector(
        ".platform-channel"
      );

    input.placeholder=
      info.placeholder;

    input.value=
      platform.username??
      "";

    //--------------------------------------------------
    // Status
    //--------------------------------------------------

    const status=

      card.querySelector(
        ".platform-status"
      );

    if(

      platform.connected===true

    ){

      status.textContent=
        "Connected";

    }

    else if(

      platform.connected==="connecting"

    ){

      status.textContent=
        "Connecting...";

    }

    else{

      status.textContent=
        "Disconnected";

    }

    //--------------------------------------------------
    // Connect Button
    //--------------------------------------------------

    const button=

      card.querySelector(
        ".platform-connect"
      );

    button.disabled=
      false;

    if(

      platform.connected===true

    ){

      button.textContent=
        "Disconnect";

    }

    else if(

      platform.connected==="connecting"

    ){

      button.textContent=
        "Connecting...";

      button.disabled=
        true;

    }

    else{

      button.textContent=
        "Connect";

    }

    button.addEventListener(

      "click",

      ()=>{

        if(

          platform.connected===true

        ){

          callbacks.disconnect?.(

            platform

          );

        }

        else if(

          platform.connected!==

          "connecting"

        ){

          platform.username=

            input.value.trim();

          callbacks.connect?.(

            platform

          );

        }

      }

    );

    //--------------------------------------------------
    // Menu
    //--------------------------------------------------

    card.querySelector(

      ".platform-menu"

    ).addEventListener(

      "click",

      ()=>{

        callbacks.remove?.(

          platform.platform

        );

      }

    );

    return card;

  }

}

export default
  new PlatformCard();