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

      session.client

    ){

      await session.client.disconnect();

    }

    Logger.info(

      `[TWITCH] Disconnected from ${channel}.`

    );

    session.client=
      null;

    session.context=
      null;

    return true;

  }

  catch(

    error

  ){

    Logger.error(

      `[TWITCH] ${error.message}`

    );

    return false;

  }

}

module.exports=
  disconnect;