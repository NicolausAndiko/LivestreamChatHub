const tmi=
  require(
    "tmi.js"
  );

const Logger=
  require(
    "../../core/logger/Logger"
  );

function buildRuns(
  message,
  emotes
){

  if(

    !emotes

  ){

    return[

      {

        text:
          message

      }

    ];

  }

  const ranges=
    [];

  for(

    const[
      id,
      positions

    ]

    of Object.entries(

      emotes

    )

  ){

    for(

      const position

      of positions

    ){

      const[
        start,
        end

      ]=

        position
          .split(
            "-"
          )
          .map(
            Number
          );

      ranges.push({

        id,

        start,

        end

      });

    }

  }

  ranges.sort(

    (
      a,
      b

    )=>

      a.start-
      b.start

  );

  const runs=
    [];

  let cursor=
    0;

  for(

    const emote

    of ranges

  ){

    if(

      emote.start>

      cursor

    ){

      runs.push({

        text:

          message.slice(

            cursor,

            emote.start

          )

      });

    }

    runs.push({

      twitchEmote:{

        id:
          emote.id

      }

    });

    cursor=

      emote.end+

      1;

  }

  if(

    cursor<

    message.length

  ){

    runs.push({

      text:

        message.slice(

          cursor

        )

    });

  }

  return runs;

}

async function connect(
  context
){

  let client=
    null;

  try{

    client=

      new tmi.Client({

        channels:[

          context.channel

        ]

      });

    client.on(

      "connected",

      ()=>{

        Logger.success(

          `[TWITCH] Connected to ${context.channel}.`

        );

      }

    );

    client.on(

      "message",

      (

        channel,

        tags,

        message,

        self

      )=>{

        if(

          self

        ){

          return;

        }
        Logger.chat({

          platform:
            "twitch",

          channel:
            context.channel,

          streamTitle:
            null,

          id:

            tags.id??

            null,

          username:

            tags[
              "display-name"
            ]??

            tags.username,

          message,

          runs:

            buildRuns(

              message,

              tags.emotes

            ),

          avatar:
            null,

          badges:{

            broadcaster:

              !!tags.badges
                ?.broadcaster,

            moderator:

              !!tags.badges
                ?.moderator,

            vip:

              !!tags.badges
                ?.vip,

            subscriber:

              !!tags.badges
                ?.subscriber

          }

        });

      }

    );

    client.on(

      "disconnected",

      ()=>{

        Logger.warning(

          `[TWITCH] Disconnected from ${context.channel}.`

        );

      }

    );

    await client.connect();

    return{

      context,

      client

    };

  }

  catch(

    error

  ){

    Logger.error(

      `[TWITCH] ${error.message}`

    );

    return null;

  }

}

module.exports=
  connect;