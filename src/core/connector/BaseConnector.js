class BaseConnector{

  constructor(){

    this.connected=
      false;

    this.platform=
      null;

  }

  setPlatform(

    platform

  ){

    this.platform=
      platform;

  }

  getPlatform(){

    return this.platform;

  }

  async prepare(){

    throw new Error(

      "prepare() must be implemented."

    );

  }

  async connect(){

    throw new Error(

      "connect() must be implemented."

    );

  }

  async disconnect(){

    this.setConnected(

      false

    );

  }

  async destroy(){

    await this.disconnect();

  }

  isConnected(){

    return this.connected;

  }

  setConnected(

    state

  ){

    this.connected=
      state;

    if(

      this.platform

    ){

      this.platform.connected=
        state;

    }

  }

}

module.exports=
  BaseConnector;