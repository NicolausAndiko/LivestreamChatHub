class LogPanel{
  create(
    log
  ){
    const template=
      document.getElementById(
        "log-template"
      );
    const item=
      template.content
        .firstElementChild
        .cloneNode(
          true
        );
    const level=
      (
        log.level??
        "info"
      ).toLowerCase();
    item.dataset.level=
      level;
    item.querySelector(
      ".log-title"
    ).textContent=
      log.title??
      "System";
    item.querySelector(
      ".log-time"
    ).textContent=
      log.time??
      "--:--:--";
    const message=
      item.querySelector(
        ".log-message"
      );
    if(
      level==="chat"&&
      typeof log.message===
        "object"
    ){
      const chat=
        log.message;
      const badgeCount=
        Object.values(
          chat.badges??
          {}
        ).filter(
          Boolean
        ).length;
      const platform=
        chat.platform??
        "Unknown";
      const username=
        chat.username??
        "Unknown";
      message.textContent=
        `[${platform}] ${username} (Badges: ${badgeCount}) -> mengirim chat.`;
    }
    else{
      message.textContent=
        log.message??
        "";
    }
    return item;
  }
}

export default
  new LogPanel();