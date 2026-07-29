import EmoteDialog
  from "./Dialog/EmoteDialog.js";

class DialogManager{

  constructor(){

    this.dialog={

      visible:
        false,

      type:
        null,

      data:
        {}

    };

  }

  async open(

    type,

    data={}

  ){

    this.dialog.visible=
      true;

    this.dialog.type=
      type;

    this.dialog.data=
      data;

    switch(

      type

    ){

      case "emotes":

        await EmoteDialog.open();

        break;

      default:

        break;

    }

  }

  close(){

    switch(

      this.dialog.type

    ){

      case "emotes":

        EmoteDialog.close();

        break;

      default:

        break;

    }

    this.dialog.visible=
      false;

    this.dialog.type=
      null;

    this.dialog.data=
      {};

  }

  isOpen(){

    return this.dialog.visible;

  }

  getType(){

    return this.dialog.type;

  }

  getData(){

    return{

      ...this.dialog.data

    };

  }

  getState(){

    return{

      ...this.dialog

    };

  }

}

export default
  new DialogManager();