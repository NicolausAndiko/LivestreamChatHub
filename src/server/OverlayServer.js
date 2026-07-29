const express=
  require(
    "express"
  );

const http=
  require(
    "http"
  );

const{
  Server
}=require(
    "socket.io"
);

const path=
  require(
    "path"
  );

const EventBus=
  require(
    "../core/event/EventBus"
  );

const EmoteService=
  require(
    "../service/EmoteService"
  );

class OverlayServer{

  constructor(){

    this.app=
      null;

    this.server=
      null;

    this.io=
      null;

    this.running=
      false;

    this.port=
      3000;

    this.boundLogListener=
      this.onLog.bind(
        this
      );

  }

  async start(){

    if(

      this.running

    ){

      return false;

    }

    this.app=

      express();

    this.server=

      http.createServer(

        this.app

      );

    this.io=

      new Server(

        this.server,

        {

          cors:{

            origin:
              "*"

          }

        }

      );

    //--------------------------------------------------
    // Health Check
    //--------------------------------------------------

    this.app.get(

      "/health",

      (

        req,

        res

      )=>{

        res.json({

          status:
            "ok"

        });

      }

    );

    //--------------------------------------------------
    // Emote List
    //--------------------------------------------------

    this.app.get(

      "/emotes",

      (

        req,

        res

      )=>{

        const emotes=

          EmoteService
            .getAll()
            .map(

              emote=>({

                id:
                  emote.id,

                keyword:
                  emote.keyword,

                url:
                  `/emote/${emote.id}`

              })

            );

        res.json(

          emotes

        );

      }

    );

    //--------------------------------------------------
    // Emote Image
    //--------------------------------------------------

    this.app.get(

      "/emote/:id",

      (

        req,

        res

      )=>{

        const emote=

          EmoteService.get(

            req.params.id

          );

        if(

          !emote

        ){

          return res.sendStatus(

            404

          );

        }

        res.sendFile(

          emote.path

        );

      }

    );

    //--------------------------------------------------
    // Assets
    //--------------------------------------------------

    this.app.use(

      "/assets",

      express.static(

        path.join(

          __dirname,

          "..",

          "..",

          "assets"

        )

      )

    );

    //--------------------------------------------------
    // Overlay Files
    //--------------------------------------------------

    this.app.use(

      express.static(

        path.join(

          __dirname,

          "..",

          "..",

          "renderer",

          "overlay"

        )

      )

    );

    //--------------------------------------------------
    // EventBus
    //--------------------------------------------------

    EventBus.on(

      "log",

      this.boundLogListener

    );

    await new Promise(

      (

        resolve,

        reject

      )=>{

        this.server.once(

          "error",

          reject

        );

        this.server.listen(

          this.port,

          ()=>{

            this.running=
              true;

            resolve();

          }

        );

      }

    );

    return true;

  }

  async stop(){
    if(
      !this.running
    ){
      return false;
    }
    EventBus.off(
      "log",
      this.boundLogListener
    );
    //--------------------------------------------------
    // Disconnect Socket.IO
    //--------------------------------------------------
    this.io.close();
    //--------------------------------------------------
    // Stop HTTP Server
    //--------------------------------------------------
    await new Promise(
      resolve=>{
        this.server.close(
          ()=>{
            resolve();
          }
        );
      }
    );
    this.io=
      null;
    this.server=
      null;
    this.app=
      null;
    this.running=
      false;
    return true;
  }

  onLog(
    log
  ){
    if(
      log.level!==
      "chat"
    ){
      return;
    }
    this.broadcast(
      "chat",
      log.message
    );
  }
  broadcast(
    event,
    data
  ){
    if(
      !this.running||
      !this.io
    ){
      return;
    }
    this.io.emit(
      event,
      data
    );
  }
  isRunning(){
    return this.running;
  }
  getPort(){
    return this.port;
  }
  getURL(){
    return `http://localhost:${this.port}`;
  }
}

module.exports=
  new OverlayServer();