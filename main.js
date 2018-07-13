const electron = require('electron');
const url = require('url');
const path = require('path');

const {app,BrowserWindow,Menu} = electron ;

let mainWindow ;

app.on('ready',function(){
    mainWindow = new BrowserWindow();
    mainWindow.loadURL(url.format({
        pathname : path.join(__dirname,'html/index.html'),
        protocol:'file',
        slashes :true
    }));

    //build the menu from template

    // const mainMenu= Menu.buildFromTemplate(mainMenuTemplate);
    // //Insert Menu
    // Menu.setApplicationMenu(mainMenu);
})

//create menu template


const mainMenuTemplate = [
    {
        label:'File',
        submenu:[
            {
                label:'Add Item',
                click(){
                    createAddWindow();
                }
            },
            {
                label:'Clear Item'
            },
            {
                label:'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q':'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
]

//Handle Add Window

function createAddWindow(){
    addWindow = new BrowserWindow({
        width:200,
        height:300,
        title:'Add Shopping List Item'
    });
    addWindow.loadURL(url.format({
        pathname : path.join(__dirname,'addwindow.html'),
        protocol:'file',
        slashes :true
    }));

}