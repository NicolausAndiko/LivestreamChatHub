const EventBus=
  require(
    "../event/EventBus"
  );

class Logger{
  constructor(){
    this.logs=
      [];
  }

  createLog(
    level,
    message
  ){

    const log={
      id:
        crypto.randomUUID
        ?
        crypto.randomUUID()
        :
        Date.now().toString(),
      level,
      message,
      time:
        new Date()
          .toLocaleTimeString(),
      timestamp:
        new Date()
    };

    this.logs.push(
      log
    );

    EventBus.emit(
      "log",
      log
    );
    return log;
  }

  info(
    message
  ){
    return this.createLog(
      "info",
      message
    );
  }

  success(
    message
  ){
    return this.createLog(
      "success",
      message
    );
  }

  warning(
    message
  ){
    return this.createLog(
      "warning",
      message
    );
  }

  error(
    message
  ){
    return this.createLog(
      "error",
      message
    );
  }

  chat(
    message
  ){
    return this.createLog(
      "chat",
      message
    );
  }

  getAll(){
    return[
      ...this.logs
    ];
  }

  getLast(){
    return this.logs.at(
      -1
    );
  }

  count(){
    return this.logs.length;
  }

  clear(){
    this.logs=
      [];
  }
}

module.exports=
  new Logger();