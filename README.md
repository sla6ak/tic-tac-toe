## разработка и тестирование на устройствах

sudo npm i -g @expo/ngrok@^4.1.0
npx expo start --tunnel
тунелирование для тестирования в интернете
What would you like your Android application id to be? … tictactoe.slabakxaker
подключив свое устройство и запустив expo client:install:androidиз каталога вашего проекта?

## доки по компиляции кода в приложение, тут же есть инфа как управлять ветками тестирования и продакшена и настроить автодеплой

https://docs.expo.dev/eas/
собраные ветки приложений видно в личном аккаунте
https://expo.dev/accounts/slabak

## eas build:configure

## eas build --platform android

важно скачать и хранить исходники сборки так как они удаляются на сервере через 30 суток!

## шаг к деплою

теперь когда у нас готовы исходники приложения
для управления обновлениями в гугл плей консоли нужно создать апи проект.
https://play.google.com/console/u/0/developers
Чтобы использовать Google Play Developer API, нужен проект Google Cloud. Он должен быть связан с вашим аккаунтом разработчика Play Console. Google Play Developer API принимают вызовы только от связанного проекта Google Cloud. Он должен отличаться от проекта, который используется для вызова API в ваших приложениях.

## сервисный аккаунт

тут настраиваем наш api
https://play.google.com/console/u/0/developers/5642153193345697947/api-access
а тут настраиваем ключи доступа к api это должен быть "сервис юзера" без ролей и описания, нам важен сам ключь доступа
https://console.cloud.google.com/iam-admin/serviceaccounts
slabakxaker
у сервисного аккаунта есть json ключь который нужен для доступа к акку он должен быть скачан на пк
настроив сервисный аккаунт мы должны вернуться в управления апишкой и пригласить наше новое приложение с сервисным аккаунтом по ссылке приглашению в нашу учетную запись гугл консоли (чтоб приложение могло само собой управлять)
доступ у приложения по умолчанию предустановлен к обновлениям и публикациям.

### дополнительная информация:

https://www.youtube.com/watch?v=oBWBDaqNuws

## описание игры

Tic Tac Toe vs Bot
shorts:
The Tic-Tac-Toe app has a complex bot. Have a nice game.
full:
Tic Tac Toe app has different game levels and complex bot
You can also make the game more difficult by choosing other board sizes, such as 4*4 or 5*5. If you do not lose to the bot, you can choose a timer, this will give the game new emotions! If you hesitate, the bot makes a move out of turn! Have a nice game.
