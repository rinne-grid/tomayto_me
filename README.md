## Todo アプリ: ToMaytoMe

- Django でポモドーロテクニックのアプリを作りたい

![images](http://www.rinsymbol.sakura.ne.jp/github_images/tomaytome/tomaytome_01.png)

![images](http://www.rinsymbol.sakura.ne.jp/github_images/tomaytome/tomaytome_04.png)

## 利用までの手順

- 環境構築

```sh
$ docker-compose up -d
# or
# $ docker compose up -d
```

- アプリ実行

```sh
$ cd backend
# pipenvを導入する場合
# pip install pipenv
$ pipenv install
$ pipenv shell
$ python manage.py migrate
$ python manage.py loaddata todo/fixtures/todo_init.json
$ python manage.py runserver
```

- 以下の URL にアクセス

http://localhost:8000/todo

| ユーザ ID | パスワード |
| --------- | ---------- |
| admin     | admin      |

## TypeScript to JS ビルド

```sh
$ cd frontend
$ yarn install
$ npx webpack -w
# or
# yarn start
# or
# yarn build
# frontend/src配下のTypeScriptがトランスパイルされ、
# backend/todo/static/distに配置される
```

## 環境情報

- DB: postgresql
- セッションエンジン: REDIS

## ステージング用 AP サーバーと Web を利用する場合

```shell
# [1] 必要に応じて、サンプルファイルを元に.envを配置する
$ mv ap/backend/.env.sample .env
# [2] DATABASE_URLを書き換える

# [3] シークレットキーを生成し、ap/backend/.envに追記
$ python manage.py shell -c "from django.core.management import utils; print(utils.get_random_secret_key())"
# SECRET_KEY=

# [4] 鍵ファイルを生成。APサーバに秘密鍵を配置、Webサーバーに公開鍵を配置するため、フォルダ移動
$ ssh-keygen -t ed25519 -f ./ap/fabric_settings/ssh/id_ed25519
$ mv ./ap/fabric_settings/ssh/id_ed25519.pub ./web/ssh

# [5] APサーバーからWebサーバーに静的ファイルを配信する
# docker exec tomayto_me_ap_staging_1 pipenv run fab test -f fabric_settings/fabfile.py
#$ docker compose exec ap_staging pipenv run fab collectstatic -f fabric_settings/fabfile.py
$ docker compose exec ap_staging pipenv run collectstatic
```
