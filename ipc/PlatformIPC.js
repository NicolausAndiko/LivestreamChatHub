const{
  ipcMain,
  BrowserWindow
}=require(
  "electron"
);

const PlatformService=
  require(
    "../src/service/PlatformService"
  );

function broadcastPlatformChanged(){
  for(
    const window
    of BrowserWindow.getAllWindows()
  ){
    window.webContents.send(
      "platform:changed"
    );
  }
}

function registerPlatformIPC(){
  ipcMain.handle(
    "platform:get-all",
    ()=>{
      return PlatformService.getAll();
    }
  );

  ipcMain.handle(
    "platform:add",
    (
      event,
      platform
    )=>{
      PlatformService.add(
        platform
      );
      broadcastPlatformChanged();
      return true;
    }
  );

  ipcMain.handle(
    "platform:remove",
    async(
      event,
      platform
    )=>{
      const success=
      await PlatformService.remove(
        platform
      );
      broadcastPlatformChanged();
      return true;
    }
  );

  ipcMain.handle(
    "platform:connect",
    async(
      event,
      platform
    )=>{
      return await PlatformService.connect(
        platform
      );
    }
  );

  ipcMain.handle(
    "platform:disconnect",
    async(
      event,
      platform
    )=>{
      return await PlatformService.disconnect(
        platform
      );
    }
  );

  ipcMain.handle(
    "platform:connect-all",
    async()=>{
      return await PlatformService.connectAll();
    }
  );

  ipcMain.handle(
    "platform:disconnect-all",
    async()=>{
      return await PlatformService.disconnectAll();
    }
  );
}

module.exports=
  registerPlatformIPC;