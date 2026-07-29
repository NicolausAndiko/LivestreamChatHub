class EventBus{
  constructor(){
    this.listeners=
      new Map();
  }
  on(
    event,
    listener
  ){
    if(
      !this.listeners.has(
        event
      )
    ){
      this.listeners.set(
        event,
        []
      );
    }
    this.listeners
      .get(
        event
      )
      .push(
        listener
      );
  }
  off(
    event,
    listener
  ){
    const listeners=
      this.listeners.get(
        event
      );
    if(
      !listeners
    ){
      return;
    }
    this.listeners.set(
      event,
      listeners.filter(
        item=>
          item!==
          listener
      )
    );
  }
  emit(
    event,
    data
  ){
    const listeners=
      this.listeners.get(
        event
      );
    if(
      !listeners
    ){
      return;
    }
    for(
      const listener
      of listeners
    ){
      listener(
        data
      );
    }
  }
  removeAll(){
    this.listeners.clear();
  }
}

module.exports=
  new EventBus();