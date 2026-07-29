const{
  ipcMain
}=require(
  "electron"
);

const EmoteService=
  require(
    "../src/service/EmoteService"
  );

function registerEmoteIPC(){

  ipcMain.handle(

    "emote:get-all",

    ()=>{

      return EmoteService.getAll();

    }

  );

  ipcMain.handle(

    "emote:count",

    ()=>{

      return EmoteService.count();

    }

  );

  ipcMain.handle(

    "emote:add",

    (

      event,

      sourceFile

    )=>{

      return EmoteService.add(

        sourceFile

      );

    }

  );

  ipcMain.handle(

    "emote:update",

    (

      event,

      id,

      keyword

    )=>{

      return EmoteService.update(

        id,

        keyword

      );

    }

  );

  ipcMain.handle(

    "emote:remove",

    (

      event,

      id

    )=>{

      return EmoteService.remove(

        id

      );

    }

  );

}

module.exports=
  registerEmoteIPC;