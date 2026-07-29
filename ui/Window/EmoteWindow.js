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
        "Emote Manager",

      width:
        900,

      height:
        700,

      minWidth:
        700,

      minHeight:
        500,

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

      "../../renderer/emote/emote.html"

    )

  );

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