const{
  Innertube
}=require(
  "youtubei.js"
);

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
          "Channel kosong."
      };
    }
    channel=
      channel.trim();
    if(
      !channel.startsWith(
        "@"
      )
    ){
      channel=
        "@"+
        channel;
    }
    const youtube=
      await Innertube.create();

      //------------------------------------------------
    // Resolve channel
    //------------------------------------------------

    const endpoint=
      await youtube.resolveURL(
        `https://www.youtube.com/${channel}`
      );
      const browseId=
      endpoint?.payload?.browseId;
    if(
      !browseId
    ){
      return{
        success:
          false,
        message:
          "Channel tidak ditemukan."
      };
    }
    const youtubeChannel=
      await youtube.getChannel(
        browseId
      );

      //------------------------------------------------
    // Canonical username
    //------------------------------------------------
    let username=
      channel.replace(
        /^@/,
        ""
      );

    const vanity=
      youtubeChannel
        ?.metadata
        ?.vanity_channel_url;
    if(
      vanity?.includes(
        "@"
      )
    ){
      username=
        vanity
          .split(
            "@"
          )[1];
    }

    //------------------------------------------------
    // Resolve livestream
    //------------------------------------------------

    const liveEndpoint=
      await youtube.resolveURL(
        `https://www.youtube.com/@${username}/live`
      );

    const videoId=
      liveEndpoint
        ?.payload
        ?.videoId;
    if(
      !videoId
    ){
      return{
        success:
          false,
        message:
          "Channel sedang tidak live."
      };
    }

    //------------------------------------------------
    // Livestream title
    //------------------------------------------------

    const info=
      await youtube.getInfo(
        videoId
      );

    const title=
      info
        ?.basic_info
        ?.title??
      "Unknown Title";
    return{
      success:
        true,
      context:{
        youtube,
        browseId,
        username,
        channel:
          username,
        videoId,
        title
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