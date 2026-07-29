async function prepare(

  channel

){

  try{

    if(

      !channel||

      channel.trim()===""

    ){

      return{

        success:
          false,

        message:
          "Channel not found!"

      };

    }

    channel=

      channel.trim();

    return{

      success:
        true,

      context:{

        channel,

        displayName:
          channel

      }

    };

  }

  catch(

    error

  ){

    return{

      success:
        false,

      message:
        error.message

    };

  }

}

module.exports=
  prepare;