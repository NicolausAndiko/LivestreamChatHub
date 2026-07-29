const{
  app,
  BrowserWindow
}=require(
  "electron"
);

const path=
  require(
    "path"
  );

const PlatformService=
  require(
    "./src/service/PlatformService"
  );

const registerPlatformIPC=
  require(
    "./ipc/PlatformIPC"
  );

const registerOverlayIPC=
  require(
    "./ipc/OverlayIPC"
  );

const registerEmoteIPC=
  require(
    "./ipc/EmoteIPC"
  );

const registerWindowIPC=
  require(
    "./ipc/WindowIPC"
  );

const registerFileIPC=
  require(
    "./ipc/FileIPC"
  );

const EventBus=
  require(
    "./src/core/event/EventBus"
  );

let mainWindow=
  null;

function registerEvents(){
  EventBus.on(
    "log",
    log=>{
      if(
        !mainWindow||
        mainWindow.isDestroyed()
      ){
        return;
      }
      mainWindow.webContents.send(
        "log",
        log
      );
    }
  );
}

function createWindow(){
  mainWindow=
    new BrowserWindow({
      title:
        "Livestream Chat Hub",
      width:
        1600,
      height:
        900,
      minWidth:
        1200,
      minHeight:
        800,
      autoHideMenuBar:
        true,
      webPreferences:{
        preload:
          path.join(
            __dirname,
            "preload.js"
          ),
        devTools:
          false
      }
    });

  mainWindow.loadFile(
    path.join(
      __dirname,
      "renderer",
      "index.html"
    )
  );
}

app.whenReady().then(
  ()=>{
    PlatformService.load();
    registerPlatformIPC();
    registerOverlayIPC();
    registerEmoteIPC();
    registerWindowIPC();
    registerEvents();
    registerFileIPC();
    createWindow();
    app.on(
      "activate",
      ()=>{
        if(
          BrowserWindow
            .getAllWindows()
            .length===0
        ){
          createWindow();
        }
      }
    );
  }
);

app.on(
  "before-quit",
  ()=>{
    PlatformService.resetConnections();
  }
);

app.on(
  "window-all-closed",
  ()=>{
    if(
      process.platform!==
      "darwin"
    ){
      app.quit();
    }
  }
);