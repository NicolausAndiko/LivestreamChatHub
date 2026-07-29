class EmoteDialog{

  constructor(){

    this.emotes=
      [];

    this.modified=
      false;

    this.visible=
      false;

  }

  async open(){

    this.emotes=
      await window.api
        .emote
        .getAll();

    this.visible=
      true;

    this.modified=
      false;

    this.render();

  }

  close(){

    this.visible=
      false;

  }

  async refresh(){

    this.emotes=
      await window.api
        .emote
        .getAll();

    this.render();

  }

  async add(

    keyword,

    sourceFile

  ){

    await window.api
      .emote
      .add(

        keyword,

        sourceFile

      );

    this.modified=
      true;

    await this.refresh();

  }

  async update(

    id,

    keyword

  ){

    await window.api
      .emote
      .update(

        id,

        keyword

      );

    this.modified=
      true;

    await this.refresh();

  }

  async remove(

    id

  ){

    await window.api
      .emote
      .remove(

        id

      );

    this.modified=
      true;

    await this.refresh();

  }

  async save(){

    this.modified=
      false;

  }

  hasUnsavedChanges(){

    return this.modified;

  }

  render(){

  }

}

export default
  new EmoteDialog();