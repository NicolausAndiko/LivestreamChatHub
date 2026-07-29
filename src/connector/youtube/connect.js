const Logger=
  require(
    "../../core/logger/Logger"
  );

async function connect(
  context
){

  const{
    youtube,
    videoId,
    channel,
    title
  }=context;

  let livechat=
    null;

  const seenMessages=
    new Set();

  try{
    const info=
      await youtube.getInfo(
        videoId
      );

    livechat=
      info.getLiveChat();
    livechat.on(
      "chat-update",
      action=>{
        if(
          action.type!==
          "AddChatItemAction"
        ){
          return;
        }
        const item=
          action.item;
        if(
          item.type!==
          "LiveChatTextMessage"
        ){
          return;
        }
        if(
          seenMessages.has(
            item.id
          )
        ){
          return;
        }
        seenMessages.add(
          item.id
        );
        Logger.chat({
          platform:
            "youtube",
          channel,
          streamTitle:
            title,
          id:
            item.id,
          username:
            item.author.name
              .replace(
                /^@/,
                ""
              ),
          message:
            item.message.text,
          runs:
            item.message.runs,
          avatar:
            null,
          badges:{
            owner:
              item.author
                .is_owner,
            moderator:
              item.author
                .is_moderator,
            verified:
              item.author
                .is_verified,
            membership:(
              ()=>{
                const member=
                  item.author
                    .badges
                    ?.find(
                      badge=>
                        badge.custom_thumbnail
                    );
                if(
                  !member
                ){
                  return null;
                }
                return{
                  tooltip:
                    member.tooltip,
                  icon:
                    member
                      .custom_thumbnail?.[0]
                      ?.url
                };
              }
            )()
          }
        });
      }
    );
    livechat.on(
      "error",
      error=>{
        Logger.error(
          `[YOUTUBE] ${error.message}`
        );
      }
    );
    Logger.success(
      `[YOUTUBE] Connected to ${channel}.`
    );
    if(
      title&&
      title.trim()!=="" 
    ){
      Logger.info(
        `[YOUTUBE] Live: ${title}`
      );
    }
    livechat.start();
    return{
      context,
      livechat,
      seenMessages
    };
  }
  catch(
    error
  ){
    Logger.error(
      `[YOUTUBE] ${error.message}`
    );
    return null;
  }
}

module.exports=
  connect;