const fs=
  require(
    "fs"
  );

const path=
  require(
    "path"
  );

const crypto=
  require(
    "crypto"
  );

const ConfigManager=
  require(
    "../core/config/ConfigManager"
  );

const AppPath=
  require(
    "../core/path/AppPath"
  );

class EmoteService{

  getAll(){

    const emotes=

      ConfigManager.load(
        "emotes"
      );

    return emotes.map(

      emote=>({

        ...emote,

        path:

          path.join(

            AppPath.emotes,

            emote.filename

          )

      })

    );

  }

  count(){

    return this.getAll()
      .length;

  }

  get(

    id

  ){

    return this.getAll()
      .find(

        emote=>

          emote.id===

          id

      );

  }

  add(

    sourceFile

  ){

    const extension=

      path.extname(

        sourceFile

      );

    const id=

      crypto

        .randomUUID()

        .replaceAll(

          "-",

          ""

        )

        .slice(

          0,

          12

        );

    const filename=

      `${id}${extension}`;

    fs.copyFileSync(

      sourceFile,

      path.join(

        AppPath.emotes,

        filename

      )

    );

    const emotes=

      ConfigManager.load(

        "emotes"

      );

    emotes.push({

      id,

      keyword:
        "",

      filename,

      originalName:

        path.basename(

          sourceFile

        )

    });

    ConfigManager.save(

      "emotes",

      emotes

    );

    return id;

  }

  update(

    id,

    keyword

  ){

    const emotes=

      ConfigManager.load(

        "emotes"

      );

    const emote=

      emotes.find(

        item=>

          item.id===

          id

      );

    if(

      !emote

    ){

      return false;

    }

    emote.keyword=

      keyword;

    ConfigManager.save(

      "emotes",

      emotes

    );

    return true;

  }

  remove(

    id

  ){

    const emotes=

      ConfigManager.load(

        "emotes"

      );

    const emote=

      emotes.find(

        item=>

          item.id===

          id

      );

    if(

      !emote

    ){

      return false;

    }

    const gif=

      path.join(

        AppPath.emotes,

        emote.filename

      );

    if(

      fs.existsSync(

        gif

      )

    ){

      fs.unlinkSync(

        gif

      );

    }

    ConfigManager.save(

      "emotes",

      emotes.filter(

        item=>

          item.id!==

          id

      )

    );

    return true;

  }

}

module.exports=

  new EmoteService();