# <img src="extension/icon-128.png" width="30"> Mercos Login (Chrome Extension)

Extensão para ajudar a logar no sistema.

Baseado nos projetos:

- [GitHub Notifier](https://github.com/sindresorhus/github-notifier-chrome)
- [Web Components](https://github.com/webcomponents/chrome-webcomponents-extension)

## Getting Started
- Clone the project.
- Update the sub-module: `git submodule update --init --recursive`.
- Open the [Chrome extensions page](chrome://extensions/), click on `load unpacked` and select the `extension` folder of the repo.
- Enable the extension to work on the incognito mode.
- Go to the extension options and add the correct data.
- Start developing it.

## Deploying
- Update the extension version on the `manifest.json` file.
- Create a zip file with the content of the `extension` folder and upload it to the [Chrome Web Store](https://chrome.google.com/webstore/devconsole).

```
git submodule update --init --recursive
zip -r extension{.zip,}
```
