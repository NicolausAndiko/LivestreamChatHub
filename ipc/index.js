const registerPlatformIPC =
  require(
    "./PlatformIPC"
  );

const registerOverlayIPC =
  require(
    "./OverlayIPC"
  );

const registerDialogIPC =
  require(
    "./DialogIPC"
  );

function registerIPC(){

  registerPlatformIPC();

  registerOverlayIPC();

  registerDialogIPC();

}

module.exports =
  registerIPC;