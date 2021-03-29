# React Demo App

Displays a button with you current IP address.
A click on the button copies the IP address into the clipboard.
A notification is displayed for 3 sec. if the operation worked successfully.

If your browser doesn't support clipboard operations, the notification will display the IP address and allow you to select and copy it manually.
You can close the notification afterwards.

The IP address detection might be blocked by you browser, if you use an adblock.
In this case, please disable the adblock to see the app working.

## Local Development

### Docker

Go to the repository root and run
```bash
sh dev.sh
```
This will run for you a docker environment.

Available commands:

```bash
install # - installs the dependencies before the first run
watch   # - build and run the app in watch mode
build   # - create a production build in the /build folder
test    # - run tests  
```

The application running in a watch mode available in your browser at the port 9092:
http://localhost:9092/
It updates the page automatically, once you saved your changes in the project files.

### No Docker

Install NodeJS.
Go to the repository root. Use the following commands:

```bash
npm install   # - installs the dependencies before the first run
npm run start # - build and run the app in watch mode
npm run build # - create a production build in the /build folder
npm run test  # - run tests  
```

The application running in a watch mode available in your browser at the port 3000:
http://localhost:3000/
It updates the page automatically, once you saved your changes in the project files.
