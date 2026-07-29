const BaseConnector=
  require(
    "../../core/connector/BaseConnector"
  );

const prepare=
  require(
    "./prepare"
  );

const connect=
  require(
    "./connect"
  );

const disconnect=
  require(
    "./disconnect"
  );

class TwitchConnector
  extends BaseConnector{

  constructor(

    platform

  ){

    super();

    this.platform=
      platform;

    this.context=
      null;

    this.session=
      null;

  }

  async prepare(){

    const result=

      await prepare(

        this.platform.username

      );

    if(

      !result.success

    ){

      return result;

    }

    this.context=

      result.context;

    return result;

  }

  async connect(){

    if(

      !this.context

    ){

      const result=

        await this.prepare();

      if(

        !result.success

      ){

        return false;

      }

    }

    this.session=

      await connect(

        this.context

      );

    if(

      !this.session

    ){

      return false;

    }

    this.setConnected(

      true

    );

    return true;

  }

  async disconnect(){

    if(

      !this.session

    ){

      return;

    }

    await disconnect(

      this.session

    );

    this.session=
      null;

    this.context=
      null;

    this.setConnected(

      false

    );

  }

  async destroy(){

    await this.disconnect();

  }

}

module.exports=
  TwitchConnector;