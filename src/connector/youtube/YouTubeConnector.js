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
class YouTubeConnector
  extends BaseConnector{
  constructor(
    platform
  ){
    super();
    this.setPlatform(
      platform
    );
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
    this.platform.username=
      this.context.username;
    this.platform.browseId=
      this.context.browseId;
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
    this.platform.connected=
      true;
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
    this.platform.connected=
      false;
    this.setConnected(
      false
    );
  }
  async destroy(){
    await this.disconnect();
  }
}

module.exports=
  YouTubeConnector;