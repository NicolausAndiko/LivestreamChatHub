const ConfigManager=
  require(
    "../config/ConfigManager"
  );

const PlatformManager=
  require(
    "../platform/PlatformManager"
  );

const YouTubeConnector=
  require(
    "../../connector/youtube/YouTubeConnector"
  );

const TwitchConnector=
  require(
    "../../connector/twitch/TwitchConnector"
  );

class ConnectorLoader{

  constructor(){

    this.connectorMap={

      youtube:
        YouTubeConnector,

      twitch:
        TwitchConnector

    };

  }

  create(

    platform

  ){

    const Connector=

      this.connectorMap[
        platform.platform
      ];

    if(

      !Connector

    ){

      return null;

    }

    return new Connector(

      platform

    );

  }

  load(){

    PlatformManager.clear();

    const platforms=

      ConfigManager.load(

        "platforms"

      );

    for(

      const platform

      of platforms

    ){

      const connector=

        this.create(

          platform

        );

      if(

        !connector

      ){

        continue;

      }

      PlatformManager.register(

        platform.platform,

        connector

      );

    }

  }

  async destroy(){

    await PlatformManager.destroy();

  }

}

module.exports=
  new ConnectorLoader();