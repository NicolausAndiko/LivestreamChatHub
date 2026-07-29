import Dashboard from "../ui/Dashboard.js";

window.addEventListener(

  "DOMContentLoaded",

  ()=>{

    Dashboard.init();

    registerEvents();

  }

);

function registerEvents(){

  const addPlatformButton=

    document.getElementById(

      "add-platform"

    );

  if(

    addPlatformButton

  ){

    addPlatformButton.addEventListener(

      "click",

      ()=>{

        Dashboard.openDialog(

          "add-platform"

        );

      }

    );

  }

  const manageEmotesButton=

    document.getElementById(

      "manage-emotes"

    );

  if(

    manageEmotesButton

  ){

    manageEmotesButton.addEventListener(

      "click",

      ()=>{

        Dashboard.openDialog(

          "emotes"

        );

      }

    );

  }

  const startOverlayButton=

    document.getElementById(

      "start-overlay"

    );

  if(

    startOverlayButton

  ){

    startOverlayButton.addEventListener(

      "click",

      async()=>{

        await Dashboard.startOverlay();

      }

    );

  }

  const stopOverlayButton=
    document.getElementById(
      "stop-overlay"
    );
  if(
    stopOverlayButton
  ){
    stopOverlayButton.addEventListener(
      "click",
      async()=>{
        await Dashboard.stopOverlay();
      }
    );
  }

  const copyOverlayButton=
    document.getElementById(
      "copy-overlay-url"
    );
  if(
    copyOverlayButton
  ){
    copyOverlayButton.addEventListener(
      "click",
      ()=>{
        Dashboard.copyOverlayURL();
      }
    );
  }
}