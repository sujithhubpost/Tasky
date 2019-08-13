const path = require('path')
const electron = require('electron');
const { app, BrowserWindow, Tray, ipcMain } = electron;

let mainWindow;
let tray;
app.on('ready', () => {

    mainWindow = new BrowserWindow({
        width: 260,
        height: 470,
        frame: false,
        resizable: false,
        show: false,
        skipTaskbar: true,
        webPreferences : {
            backgroundThrottling: false
        }
    });
    mainWindow.loadURL(`file:///${__dirname}/src/index.html`);


    const iconName = 'iconTemplate44.png';
    const iconPath = path.join(__dirname, `./src/assets/${iconName}`);

    mainWindow.on('blur', () => {
        tray.setToolTip('Open Timer App');
        mainWindow.hide()
    });

    tray = new Tray(iconPath);
    tray.setToolTip('Open Timer App');
    tray.on('click', (event, bounds) => {
        const { x, y } = bounds;
        const { width, height } = mainWindow.getBounds();

        if (mainWindow.isVisible()) {
            mainWindow.hide();
            tray.setToolTip('Open Timer App');
        }
        else {

            mainWindow.setBounds({
                x: 930,
                y: y,
                width: width,
                height: height
            });
            mainWindow.show();
            tray.setToolTip('Close Timer App');

        }
    });
    
});
