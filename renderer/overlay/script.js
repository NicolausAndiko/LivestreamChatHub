import{
  createYouTubeBadges,
  renderYouTubeMessage
}
from "./script-youtube.js";
import{
  createTwitchBadges,
  renderTwitchMessage
}
from "./script-twitch.js";
const socket=
  io();
const container=
  document.getElementById(
    "chat"
  );
const emotes=
  new Map();
const platformIcons={
  youtube:
    "/assets/youtube.svg",
  twitch:
    "/assets/twitch.svg",
  tiktok:
    "/assets/tiktok.svg",
//   kick:
//     "/assets/kick.svg",
//   default:
//     "/assets/default.svg"
};

async function loadEmotes(){

  try{

    const response=

      await fetch(

        "/emotes"

      );

    const list=

      await response.json();

    emotes.clear();

    for(

      const emote

      of list

    ){

      if(

        !emote.keyword

      ){

        continue;

      }

      emotes.set(

        emote.keyword,

        emote.url

      );

    }

  }

  catch(

    error

  ){

    console.error(

      error

    );

  }

}

function getUsernameColor(

  username

){

  let hash=
    0;

  for(

    const character

    of username

  ){

    hash=

      character.charCodeAt(

        0

      )+

      (

        (

          hash<<5

        )-

        hash

      );

  }

  const hue=

    Math.abs(

      hash

    )%

    360;

  return `hsl(${hue},90%,60%)`;

}

export function replaceLocalEmotes(

  text

){

  return text

    .split(

      " "

    )

    .map(

      word=>{

        if(

          emotes.has(

            word

          )

        ){

          return`

            <img
              class="chat-emote"
              src="${

                emotes.get(

                  word

                )

              }"
              alt="${word}"
            >

          `;

        }

        return word;

      }

    )

    .join(

      " "

    );

}

function renderPlatform(

  chat

){

  switch(

    chat.platform

  ){

    case "youtube":

      return{

        badges:

          createYouTubeBadges(

            chat

          ),

        message:

          renderYouTubeMessage(

            chat,

            replaceLocalEmotes

          )

      };

    case "twitch":

      return{

        badges:

          createTwitchBadges(

            chat

          ),

        message:

          renderTwitchMessage(

            chat,

            replaceLocalEmotes

          )

      };

    default:

      return{

        badges:
          "",

        message:

          replaceLocalEmotes(

            chat.message??

            ""

          )

      };

  }

}

function renderChat(

  chat

){

  const item=

    document.createElement(

      "div"

    );

  item.className=
    "message";

  const icon=

    platformIcons[
      chat.platform
    ]??

    platformIcons.default;

  const{

    badges,

    message

  }=

    renderPlatform(

      chat

    );

  const color=

    getUsernameColor(

      chat.username

    );

  item.innerHTML=

  `
  <img
    class="platform-icon"
    src="${icon}"
    alt="${chat.platform}"
  >

  <span class="content">

    <span
      class="username"
      style="color:${color}"
    >

      ${badges}${chat.username}:

    </span>

    ${message}

  </span>
  `;

  container.append(

    item

  );

}

socket.on(

  "chat",

  chat=>{

    renderChat(

      chat

    );

  }

);

loadEmotes();