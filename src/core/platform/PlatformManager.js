class PlatformManager{

  constructor(){

    this.platforms=
      new Map();

  }

  register(

    platform,

    connector

  ){

    this.platforms.set(

      platform,

      connector

    );

  }

  unregister(

    platform

  ){

    this.platforms.delete(

      platform

    );

  }

  clear(){

    this.platforms.clear();

  }

  get(

    platform

  ){

    return this.platforms.get(

      platform

    );

  }

  getAll(){

    return Array.from(

      this.platforms.values()

    );

  }

  async connect(

    platform

  ){

    const connector=

      this.get(

        platform.platform

      );

    if(

      !connector

    ){

      return false;

    }

    connector.setPlatform(

      platform

    );

    await connector.connect();

    return true;

  }

  async disconnect(

    platform

  ){

    const connector=

      this.get(

        platform.platform

      );

    if(

      !connector

    ){

      return false;

    }

    await connector.disconnect();

    return true;

  }

  async connectAll(){

    for(

      const connector

      of this.platforms.values()

    ){

      await connector.connect();

    }

  }

  async disconnectAll(){

    for(

      const connector

      of this.platforms.values()

    ){

      await connector.disconnect();

    }

  }

  async destroy(){

    await this.disconnectAll();

    this.clear();

  }

}

module.exports=

  new PlatformManager();