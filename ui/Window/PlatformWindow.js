const{
  BrowserWindow
}=require(
  "electron"
);

const path=
  require(
    "path"
  );

let window=
  null;

function open(){

  if(

    window

  ){

    window.focus();

    return;

  }

  window=
    new BrowserWindow({

      title:
        "Add Platform",

      width:
        720,

      height:
        520,

      minWidth:
        600,

      minHeight:
        420,

      autoHideMenuBar:
        true,

      parent:
        BrowserWindow.getFocusedWindow(),

      webPreferences:{

        preload:
          path.join(

            __dirname,

            "../../preload.js"

          )

      }

    });

  window.loadFile(

    path.join(

      __dirname,

      "../../renderer/platform/platform.html"

    )

  );

  // Uncomment kalau lagi debugging
  // window.webContents.openDevTools();

  window.on(

    "closed",

    ()=>{

      window=
        null;

    }

  );

}

function getWindow(){

  return window;

}

module.exports={

  open,

  getWindow

};