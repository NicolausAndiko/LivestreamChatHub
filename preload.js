const{
  contextBridge,
  ipcRenderer
}=require(
  "electron"
);

contextBridge.exposeInMainWorld(

  "api",

  {

    platform:{

      getAll(){

        return ipcRenderer.invoke(
          "platform:get-all"
        );

      },

      add(
        platform
      ){

        return ipcRenderer.invoke(
          "platform:add",
          platform
        );

      },

      remove(
        platform
      ){

        return ipcRenderer.invoke(
          "platform:remove",
          platform
        );

      },

      connect(
        platform
      ){

        return ipcRenderer.invoke(
          "platform:connect",
          platform
        );

      },

      disconnect(
        platform
      ){

        return ipcRenderer.invoke(
          "platform:disconnect",
          platform
        );

      },

      onChanged(
        callback
      ){

        ipcRenderer.on(

          "platform:changed",

          ()=>{

            callback();

          }

        );

      }

    },

    overlay:{

      start(){

        return ipcRenderer.invoke(
          "overlay:start"
        );

      },

      stop(){

        return ipcRenderer.invoke(
          "overlay:stop"
        );

      },

      getStatus(){

        return ipcRenderer.invoke(
          "overlay:get-status"
        );

      },

      getURL(){

        return ipcRenderer.invoke(
          "overlay:get-url"
        );

      }

    },

    emote:{

      getAll(){

        return ipcRenderer.invoke(
          "emote:get-all"
        );

      },

      count(){

        return ipcRenderer.invoke(
          "emote:count"
        );

      },

      add(
        sourceFile
      ){

        return ipcRenderer.invoke(
          "emote:add",
          sourceFile
        );

      },

      update(
        id,
        keyword
      ){

        return ipcRenderer.invoke(
          "emote:update",
          id,
          keyword
        );

      },

      remove(
        id
      ){

        return ipcRenderer.invoke(
          "emote:remove",
          id
        );

      },

      onChanged(
        callback
      ){

        ipcRenderer.on(

          "emote:changed",

          ()=>{

            callback();

          }

        );

      }

    },

    file:{

      pickGIF(){

        return ipcRenderer.invoke(
          "file:pick-gif"
        );

      }

    },

    window:{

      openEmote(){

        return ipcRenderer.invoke(
          "window:open-emote"
        );

      },

      openPlatform(){

        return ipcRenderer.invoke(
          "window:open-platform"
        );

      }

    },

    dialog:{

      open(
        type,
        data={}
      ){

        return ipcRenderer.invoke(
          "dialog:open",
          type,
          data
        );

      },

      close(){

        return ipcRenderer.invoke(
          "dialog:close"
        );

      },

      getState(){

        return ipcRenderer.invoke(
          "dialog:get-state"
        );

      }

    },

    log:{

      onMessage(
        callback
      ){

        ipcRenderer.on(

          "log",

          (

            _,

            log

          )=>{

            callback(
              log
            );

          }

        );

      }

    }

  }

);