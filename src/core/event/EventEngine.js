class EventEngine{

  constructor(){

    this.events = {};

  }

  on(
    event,
    listener
  ){

    if(
      !this.events[event]
    ){

      this.events[event] = [];

    }

    this.events[event].push(
      listener
    );

  }

  once(
    event,
    listener
  ){

    const wrapper = (
      data
    ) => {

      listener(
        data
      );

      this.off(
        event,
        wrapper
      );

    };

    this.on(
      event,
      wrapper
    );

  }

  off(
    event,
    listener
  ){

    if(
      !this.events[event]
    ){

      return;

    }

    this.events[event] =
      this.events[event]
      .filter(
        item =>
          item !== listener
      );

  }

  emit(
    event,
    data
  ){

    if(
      !this.events[event]
    ){

      return;

    }

    for(
      const listener
      of this.events[event]
    ){

      listener(
        data
      );

    }

  }

  clear(){

    this.events = {};

  }

}

module.exports =
  new EventEngine();