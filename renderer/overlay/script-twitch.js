export function createTwitchBadges(

  chat

){

  let badge=
    "";

  //--------------------------------------------------
  // Broadcaster
  //--------------------------------------------------

  if(

    chat.badges?.broadcaster

  ){

    badge+=
      "👑 ";

  }

  //--------------------------------------------------
  // Moderator
  //--------------------------------------------------

  if(

    chat.badges?.moderator

  ){

    badge+=
      "🛡️ ";

  }

  //--------------------------------------------------
  // VIP
  //--------------------------------------------------

  if(

    chat.badges?.vip

  ){

    badge+=
      "💎 ";

  }

  //--------------------------------------------------
  // Subscriber
  //--------------------------------------------------

  if(

    chat.badges?.subscriber

  ){

    badge+=
      "⭐ ";

  }

  return badge;

}

function renderRuns(

  runs,

  replaceLocalEmotes

){

  return runs.map(

    run=>{

      //------------------------------------------------
      // Text
      //------------------------------------------------

      if(

        run.text!==undefined

      ){

        return replaceLocalEmotes(

          run.text

        );

      }

      //------------------------------------------------
      // Native Twitch Emote
      //------------------------------------------------

      if(

        run.twitchEmote

      ){

        return `

          <img
            class="chat-emote"
            src="https://static-cdn.jtvnw.net/emoticons/v2/${run.twitchEmote.id}/default/dark/2.0"
            alt="Twitch Emote"
          >

        `;

      }

      return "";

    }

  ).join(

    ""

  );

}

export function renderTwitchMessage(

  chat,

  replaceLocalEmotes

){

  if(

    Array.isArray(

      chat.runs

    )

  ){

    return renderRuns(

      chat.runs,

      replaceLocalEmotes

    );

  }

  return replaceLocalEmotes(

    chat.message??

    ""

  );

}