const{
  ipcMain
}=require(
  "electron"
);

const OverlayService=
  require(
    "../src/service/OverlayService"
  );

function registerOverlayIPC(){

  ipcMain.handle(

    "overlay:start",

    async()=>{

      return await OverlayService.start();

    }

  );

  ipcMain.handle(

    "overlay:stop",

    async()=>{

      return await OverlayService.stop();

    }

  );

  ipcMain.handle(

    "overlay:get-status",

    ()=>{

      return OverlayService.getStatus();

    }

  );

  ipcMain.handle(

    "overlay:get-url",

    ()=>{

      return OverlayService.getURL();

    }

  );

}

module.exports=
  registerOverlayIPC;