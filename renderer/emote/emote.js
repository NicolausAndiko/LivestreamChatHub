class EmotePage{

  constructor(){

    this.emotes=
      [];

    this.list=
      null;

    this.count=
      null;

    this.editingId=
      null;

  }

  async init(){

    this.list=
      document.getElementById(
        "emote-list"
      );

    this.count=
      document.getElementById(
        "emote-count"
      );

    this.registerEvents();

    await this.refresh();

  }

  registerEvents(){

    document
      .getElementById(
        "add-emote"
      )
      .addEventListener(

        "click",

        ()=>{

          this.add();

        }

      );

  }

  async refresh(){

    this.emotes=

      await window.api
        .emote
        .getAll();

    this.render();

  }

  render(){

    this.count.textContent=

      `● ${this.emotes.length} Emotes`;

    this.list.replaceChildren();

    if(

      this.emotes.length===0

    ){

      this.renderEmptyState();

      return;

    }

    for(

      const emote

      of this.emotes

    ){

      this.list.appendChild(

        this.createRow(
          emote
        )

      );

    }

  }

  renderEmptyState(){

    const row=
      document.createElement(
        "tr"
      );

    const cell=
      document.createElement(
        "td"
      );

    cell.colSpan=
      4;

    cell.textContent=
      "No emotes yet.";

    cell.style.textAlign=
      "center";

    cell.style.padding=
      "32px";

    row.appendChild(
      cell
    );

    this.list.appendChild(
      row
    );

  }

  async saveKeyword(

    id,

    input

  ){

    const keyword=

      input.value.trim();

    if(

      keyword===""

    ){

      input.focus();

      return;

    }

    await window.api
      .emote
      .update(

        id,

        keyword

      );

    this.editingId=
      null;

    await this.refresh();

  }

  createRow(

    emote

  ){

    const row=
      document.createElement(
        "tr"
      );

    //--------------------------------------------------
    // Keyword
    //--------------------------------------------------

    const keyword=
      document.createElement(
        "td"
      );

    let input=
      null;

    const editing=

      emote.keyword===""

      ||

      this.editingId===

      emote.id;

    if(

      editing

    ){

      input=
        document.createElement(
          "input"
        );

      input.type=
        "text";

      input.placeholder=
        "Keyword";

      input.value=
        emote.keyword;

      keyword.appendChild(
        input
      );

      setTimeout(

        ()=>{

          input.focus();

          input.select();

        },

        0

      );

      input.addEventListener(

        "keydown",

        async(

          event

        )=>{

          if(

            event.key===

            "Enter"

          ){

            await this.saveKeyword(

              emote.id,

              input

            );

          }

        }

      );

    }
    else{

      keyword.textContent=

        emote.keyword;

    }

    //--------------------------------------------------
    // GIF
    //--------------------------------------------------

    const file=
      document.createElement(
        "td"
      );

    file.textContent=

      emote.originalName??

      emote.filename;

    //--------------------------------------------------
    // Preview
    //--------------------------------------------------

    const preview=
      document.createElement(
        "td"
      );

    const image=
      document.createElement(
        "img"
      );

    image.className=
      "preview";

    image.src=

      `file:///${

        emote.path.replaceAll(

          "\\",

          "/"

        )

      }`;

    preview.appendChild(
      image
    );

    //--------------------------------------------------
    // Action
    //--------------------------------------------------

    const action=
      document.createElement(
        "td"
      );

    const actions=
      document.createElement(
        "div"
      );

    actions.className=
      "action";

    //---------------------------------
    // Save
    //---------------------------------

    const save=
      document.createElement(
        "button"
      );

    save.textContent=
      "💾";

    save.disabled=

      !editing;

    save.addEventListener(

      "click",

      async()=>{

        await this.saveKeyword(

          emote.id,

          input

        );

      }

    );

    //---------------------------------
    // Edit
    //---------------------------------

    const edit=
      document.createElement(
        "button"
      );

    edit.textContent=
      "✏";

    edit.disabled=

      editing;

    edit.addEventListener(

      "click",

      async()=>{

        this.editingId=
          emote.id;

        await this.refresh();

      }

    );

    //---------------------------------
    // Delete
    //---------------------------------

const remove=
  document.createElement(
    "button"
  );

remove.textContent=
  "🗑";

remove.disabled=

  editing;

remove.addEventListener(

  "click",

  async()=>{

    const result=

      confirm(

        "Are you sure you want to delete this emote?"

      );

    if(

      !result

    ){

      return;

    }

    await window.api
      .emote
      .remove(

        emote.id

      );

    await this.refresh();

  }

);

    actions.append(

      save,

      edit,

      remove

    );

    action.appendChild(
      actions
    );

    row.append(

      keyword,

      file,

      preview,

      action

    );

    return row;

  }

  async add(){

    const sourceFile=

      await window.api
        .file
        .pickGIF();

    if(

      !sourceFile

    ){

      return;

    }

    await window.api
      .emote
      .add(

        sourceFile

      );

    await this.refresh();

  }

}

new EmotePage()
  .init();