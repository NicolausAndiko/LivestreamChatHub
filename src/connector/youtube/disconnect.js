const Logger=
  require(
    "../../core/logger/Logger"
  );

async function disconnect(
  session
){
  if(
    !session
  ){
    return true;
  }
  try{
    const channel=
      session.context?.channel??
      "Unknown";
    if(
      session.livechat
    ){
      session.livechat.stop();
    }
    if(
      session.seenMessages
    ){
      session.seenMessages.clear();
    }
    Logger.info(
      `[YOUTUBE] Disconnected from ${channel}.`
    );
    session.livechat=
      null;
    session.seenMessages=
      null;
    session.context=
      null;
    return true;
  }
  catch(
    error
  ){
    Logger.error(
      `[YOUTUBE] ${error.message}`
    );
    return false;
  }
}

module.exports=
  disconnect;