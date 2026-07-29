const ConfigManager=
  require(
    "../core/config/ConfigManager"
  );

const ConnectorLoader=
  require(
    "../core/connector/ConnectorLoader"
  );

const PlatformManager=
  require(
    "../core/platform/PlatformManager"
  );

const Logger=
  require(
    "../core/logger/Logger"
  );

class PlatformService{
  load(){
    ConnectorLoader.load();
  }

  getAll(){
    return ConfigManager.load(
      "platforms"
    );
  }

  add(
    platform
  ){
    const platforms=
      this.getAll();
    platforms.push(
      platform
    );

    ConfigManager.save(
      "platforms",
      platforms
    );

    const connector=
      ConnectorLoader.create(
        platform
      );

    if(
      connector
    ){
      PlatformManager.register(
        platform.platform,
        connector
      );
    }
  }

  update(
    platform
  ){
    const platforms=
      this.getAll();
    const index=
      platforms.findIndex(
        item=>
          item.platform===
          platform.platform
      );
    if(
      index===-1
    ){
      return false;
    }
    platforms[index]={
      ...platforms[index],
      username:
        platform.username,
      browseId:
        platform.browseId,
      connected:
        platform.connected
    };
    ConfigManager.save(
      "platforms",
      platforms
    );
    return true;
  }

  resetConnections(){
    const platforms=
      this.getAll();
    for(
      const platform
      of platforms
    ){
      platform.connected=
        false;
    }
    ConfigManager.save(
      "platforms",
      platforms
    );
  }

  async remove(
    platform
  ){
    const connector=
      PlatformManager.get(
        platform
      );
    if(
      connector&&
      connector.isConnected()
    ){
      await connector.disconnect();
    }
    const platforms=
      this.getAll()
        .filter(
          item=>
            item.platform!==
            platform
        );
    ConfigManager.save(
      "platforms",
      platforms
    );
    Logger.warning(
      `[${platform.toUpperCase()}] Platform removed.`
    );
    return true;
  }

  async connect(
    platform
  ){
    const success=
      await PlatformManager.connect(
        platform
      );
    if(
      !success
    ){
      return false;
    }
    const connector=
      PlatformManager.get(
        platform.platform
      );
    if(
      connector
    ){
      this.update(
        connector.getPlatform()
      );
    }
    return true;
  }

  async disconnect(
    platform
  ){
    const success=
      await PlatformManager.disconnect(
        platform
      );
    if(
      !success
    ){
      return false;
    }
    const connector=
      PlatformManager.get(
        platform.platform
      );
    if(
      connector
    ){
      this.update(
        connector.getPlatform()
      );
    }
    return true;
  }

  async connectAll(){
    return await PlatformManager.connectAll();
  }

  async disconnectAll(){
    return await PlatformManager.disconnectAll();
  }

}

module.exports=
  new PlatformService();