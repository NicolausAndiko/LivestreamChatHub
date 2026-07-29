export function createYouTubeBadges(
  chat
){

  let badge=
    "";
  //--------------------------------------------------
  // Owner
  //--------------------------------------------------
  if(
    chat.badges?.owner
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
  // Verified
  //--------------------------------------------------
  if(
    chat.badges?.verified
  ){
    badge+=
      "✔️ ";
  }
  //--------------------------------------------------
  // Membership
  //--------------------------------------------------
  if(
    chat.badges?.membership?.icon
  ){
    badge+=`
      <img
        class="chat-badge"
        src="${
          chat.badges.membership.icon
        }"
        alt="Member"
        title="${
          chat.badges.membership.tooltip??
          "Member"
        }"
      >
    `;
  }
  return badge;
}

export function renderYouTubeMessage(
  chat,
  replaceLocalEmotes
){

  //--------------------------------------------------
  // New System (Runs)
  //--------------------------------------------------

  if(

    Array.isArray(

      chat.runs

    )

  ){

    return chat.runs.map(

      run=>{

        //----------------------------------------------
        // Text
        //----------------------------------------------

        if(

          run.text!==undefined&&

          !run.emoji

        ){

          return replaceLocalEmotes(

            run.text

          );

        }

        //----------------------------------------------
        // YouTube Emoji
        //----------------------------------------------

        if(

          run.emoji

        ){

          const image=

            run.emoji.image?.[0];

          if(

            image

          ){

            return`

              <img
                class="chat-emote"
                src="${image.url}"
                alt="${run.text}"
                title="${

                  run.emoji.shortcuts?.[0]??

                  run.text

                }"
              >

            `;

          }

        }

        return "";

      }

    ).join(

      ""

    );

  }

  //--------------------------------------------------
  // Legacy
  //--------------------------------------------------

  return replaceLocalEmotes(

    chat.message??

    ""

  );

}