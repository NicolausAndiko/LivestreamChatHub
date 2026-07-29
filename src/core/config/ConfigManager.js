const fs =
  require(
    "fs"
  );

const path =
  require(
    "path"
  );

const AppPath =
  require(
    "../path/AppPath"
  );

class ConfigManager{

  constructor(){

    this.configFolder =
      AppPath.config;

    this.defaults = {

      settings:
        {},

      platforms:
        [],

      emotes:
        []

    };

    this.initialize();

  }

  initialize(){

    fs.mkdirSync(

      AppPath.root,

      {

        recursive:
          true

      }

    );

    fs.mkdirSync(

      AppPath.config,

      {

        recursive:
          true

      }

    );

    fs.mkdirSync(

      AppPath.emotes,

      {

        recursive:
          true

      }

    );

    fs.mkdirSync(

      AppPath.logs,

      {

        recursive:
          true

      }

    );

    for(

      const [

        name,

        value

      ]

      of Object.entries(

        this.defaults

      )

    ){

      const file =
        this.getFilePath(
          name
        );

      if(

        !fs.existsSync(
          file
        )

      ){

        fs.writeFileSync(

          file,

          JSON.stringify(

            value,

            null,

            2

          )

        );

      }

    }

  }

  getFilePath(

    name

  ){

    return path.join(

      this.configFolder,

      `${name}.json`

    );

  }

  load(

    name

  ){

    const file =
      this.getFilePath(
        name
      );

    try{

      return JSON.parse(

        fs.readFileSync(

          file,

          "utf8"

        )

      );

    }catch{

      const value =
        this.defaults[
          name
        ] ?? {};

      fs.writeFileSync(

        file,

        JSON.stringify(

          value,

          null,

          2

        )

      );

      return structuredClone(
        value
      );

    }

  }

  save(

    name,

    data

  ){

    fs.writeFileSync(

      this.getFilePath(
        name
      ),

      JSON.stringify(

        data,

        null,

        2

      )

    );

  }

}

module.exports =
  new ConfigManager();