const OverlayServer=
  require(
    "../server/OverlayServer"
  );

const Logger=
  require(
    "../core/logger/Logger"
  );

class OverlayService{
  async start(){
    const success=
      await OverlayServer.start();
    if(
      success
    ){
      Logger.info(
        "[SYSTEM] Overlay Started."
      );
    }
    return success;
  }

  async stop(){
    const success=
      await OverlayServer.stop();
    if(
      success
    ){
      Logger.info(
        "[SYSTEM] Overlay Stopped."
      );
    }
    return success;
  }

  isRunning(){
    return OverlayServer.isRunning();
  }

  getStatus(){
    return{
      running:
        OverlayServer.isRunning(),
      url:
        OverlayServer.getURL()
    };
  }

  getURL(){
    return OverlayServer.getURL();
  }
}

module.exports=
  new OverlayService();