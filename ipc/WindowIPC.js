const{
  ipcMain
}=require(
  "electron"
);

const EmoteWindow=
  require(
    "../ui/Window/EmoteWindow"
  );

const PlatformWindow=
  require(
    "../ui/Window/PlatformWindow"
  );

function registerWindowIPC(){

  ipcMain.handle(

    "window:open-emote",

    ()=>{

      EmoteWindow.open();

      return true;

    }

  );

  ipcMain.handle(

    "window:open-platform",

    ()=>{

      PlatformWindow.open();

      return true;

    }

  );

}

module.exports=
  registerWindowIPC;