const path =
  require(
    "path"
  );

const {
  app
} =
  require(
    "electron"
  );

const root =
  path.join(
    app.getPath(
      "userData"
    ),
    "Livestream Chat Hub"
  );

module.exports = {

  root,

  config:
    path.join(
      root,
      "config"
    ),

  emotes:
    path.join(
      root,
      "emotes"
    ),

  logs:
    path.join(
      root,
      "logs"
    )

};