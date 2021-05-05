## Todoアプリ: ToMaytoMe

* Djangoでポモドーロテクニックのアプリを作りたい

![images](http://www.rinsymbol.sakura.ne.jp/github_images/tomaytome/tomaytome_01.png)


![images](http://www.rinsymbol.sakura.ne.jp/github_images/tomaytome/tomaytome_02.png)

## 利用までの手順

* 環境構築

```sh
$ docker-compose up -d
# or
# $ docker compose up -d
```

* アプリ実行

```sh
$ cd backend
# pipenvを導入する場合
# pip install pipenv 
$ pipenv install
$ pipenv shell
$ python manage.py loaddata todo/fixtures/todo_init.json
$ python manage.py runserver
```

* 以下のURLにアクセス

http://localhost:8000/todo


|ユーザID|パスワード|
|----|----|
|admin|admin|


## 環境情報

* DB: postgresql
* セッションエンジン: REDIS
