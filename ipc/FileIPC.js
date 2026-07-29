const{
  ipcMain,
  dialog
}=require(
  "electron"
);

function registerFileIPC(){

  ipcMain.handle(

    "file:pick-gif",

    async()=>{

      const result=
        await dialog.showOpenDialog({

          title:
            "Select GIF",

          properties:[

            "openFile"

          ],

          filters:[

            {

              name:
                "GIF Images",

              extensions:[

                "gif"

              ]

            }

          ]

        });

      if(

        result.canceled

      ){

        return null;

      }

      return result.filePaths[
        0
      ];

    }

  );

}

module.exports=
  registerFileIPC;