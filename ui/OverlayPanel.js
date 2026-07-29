class OverlayPanel{

  update(
    overlay
  ){

    const panel=
      document.getElementById(
        "overlay-panel"
      );

    const status=
      document.getElementById(
        "overlay-status"
      );

    const url=
      document.getElementById(
        "overlay-url"
      );

    const startButton=
      document.getElementById(
        "start-overlay"
      );

    const stopButton=
      document.getElementById(
        "stop-overlay"
      );

    if(
      !panel||
      !status||
      !url
    ){
      return;
    }

    const running=
      overlay.running===true;

    panel.dataset.status=
      running
      ?
      "running"
      :
      "stopped";

    status.dataset.status=
      running
      ?
      "running"
      :
      "stopped";

    status.textContent=
      running
      ?
      "Running"
      :
      "Stopped";

    status.classList.remove(
      "badge-success",
      "badge-danger"
    );

    status.classList.add(
      running
      ?
      "badge-success"
      :
      "badge-danger"
    );

    url.value=
      overlay.url??
      "";

    if(
      startButton
    ){
      startButton.disabled=
        running;
    }

    if(
      stopButton
    ){
      stopButton.disabled=
        !running;
    }

  }

}

export default new OverlayPanel();