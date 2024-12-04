# honoとnextjsを使ったクイズ

## プロジェクトの起動

**準備**
discordとgoogleのoauthに必要な`CLIENT_ID`と`CLIENT_SECRET`をそれぞれ取得する

**docker**での起動

```bash
docker compose up
```

**node**のみでの起動

1. opensslの鍵を生成

   ```bash
   npm run create:cert
   ```

2. prismaのセットアップ

   ```bash
   npx prisma generate
   ```

   - migrate devの場合

     ```bash
     npx prisma migrate dev --name --init
     ```

   - migrate deployの場合

     ```bash
     npx prisma migrate deploy
     ```

3. 起動

   ```bash
   npm run dev
   ```

## ブランチのルール

### ブランチの種類(リモートで重要なもの)

- `main`: 実際にビルドして動かせるもの
- `develop`: mainに渡す一段階前
- `front`: フロントエンド側の新機能
- `server`: バックエンド側の新機能
- `public`: 共通で使う変更
- `~/~`: それぞれの細かい機能のブランチ(詳しくは[共通のルール](#共通のルール))

#### フロントエンド側

`front`というブランチにPRを必ず出す(小さい開発での`main`や`master`の代わり)

#### バックエンド側

`server`というブランチにPRを必ず出す(小さい開発での`main`や`master`の代わり)

#### 共通のルール

- `feat/~` : 新規機能
- `test/~` : 新規機能で実装するユニットテストなどとは別で、e2eや群体テストなどを分けて書きたい時用
- `build/~` : システムまたは外部依存関係に影響する変更
- `docs/~` : ドキュメント周りのことについて

### ブランチのそれぞれのPR先

- `~/~` : そのブランチの派生元(`front`,`server`,`public`,`develop`のどれか)
- `front` : `develop`にPRを出して、`main`か、`develop`からブランチを切る
- `server` : `develop`にPRを出して、`main`か、`develop`からブランチを切る
- `develop` : `main`にPRを出して、`main`からブランチを切る
- `main` : 動くものが常にある状態にする

## コミットのルール

### コミットの種類

#### 基本的に[Gitコミットメッセージの規約](https://app.path.progate.com/articles/commit-message-convention)に乗っ取った形にする

```bash
<type>: 説明
```

#### 例

```bash
feat: add login/google endpoint
```

#### commitのタイプ

- `fix:`
  バグ修正
- `feat:`
  新機能の追加
- `build:`
  システムまたは外部依存関係に影響する変更
- `ci:`
  構成ファイルとスクリプトへの変更
- `docs:`
  ドキュメントのみの変更
- `style:`
  コードの意味に影響を与えない変更
- `refactor:`
  バグ修正も機能追加も行わないコード変更
- `perf:`
  パフォーマンスを向上させるコード変更
- `test:`
  不足しているテストの追加または既存のテストの修正

## ソースコードのルール

### [単一責任の原則](https://zenn.dev/nakurei/books/solid-principle-kanzen-rikai/viewer/single-responsibility-principle)

- 関数やクラスは基本的に一つの機能だけを持たせる
- ユーザーのデータをDBからアクセスするなら、ユーザーのみにしかアクセスしない

### [命名規則](https://zenn.dev/riya_amemiya/articles/a596cb578cff82)

- 変数名などは、きちんと意味を持たす
- 変数や通常の関数は、`キャメルケース`で書き、Reactの`default export function ~`やクラスは`パスカルケース`でかく
  キャメルケース(一文字目は小文字で、単語の区切りを大文字にする)

  ```typescript
  function isLogin();
  ```

  パスカルケース(一文字目も大文字で、単語の区切りを大文字にする)

  ```typescript
  export default function QuizPage();
  ```

### Nextjs側のルール

この[ディレクトリ構造](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md)を参考にしている

```sh
public/               # Nextjs内から参照する写真など
|
src/                  # Nextjsの本体
|
+-- app/
|   |
|   +-- layout.tsx    # プロジェクト全体のレイアウト
|   +-- page.tsx      # ルートのファイル (/)
|   +-- favicon.ico   # ファビコン ブラウザで上の方に表示されている小さいアイコン
|   +-- api/          # ここは半分バックエンドなので、基本的に触らなくて良い
|   +-- ~             # ここから色々配置していく
|
+-- components/       # 投稿フィールドやクイズのフィールドなどのreactから直接使える機能
|
+-- config/           # 全体で使う変数や設定など ex) クイズの取得件数
|
+-- features/         # 投稿や、ログインなどの特定の代表した機能
|
+-- lib/              # ライブラリの機能を使いやすくしたもの
|
+-- testing/          # テストやモックなど
|
+-- types/            # ユーザーの型やクイズの管理する時に全体で使う型
|
+-- utils/            # 日付の取得や、計算などのどこからでも再利用できるもの
```

#### 細かいルール(Next)

- `1ファイル1コンポーネント`
- `utils`,`lib`,`types`,`config`など以外は、基本的に`export`,`default export`する関数などは`1つ`
- `components/`と`app/`の`export`や`default export`する関数は全て`大文字`で始めること
- `export`しない内部で使う関数はいくつ作っても良いが、再利用しやすいように、`utils`,`lib`,`features`などに配置できないか考える

### Hono側のルール

[このディレクトリ構成](https://qiita.com/MotohiroSiobara/items/b672b22ce0505e5e17de)と[このアーキテクチャ](https://nrslib.com/adop/)を参考にしている

```sh
server/
|
+-- config/           # 全体で使う変数や設定など ex) クイズの取得件数
|
+-- controller/       # リクエストを受け取る部分
|
+-- domain/           # 一番アプリケーションの内側のデータの構造やinfraでの機能の定義
|   |
|   +-- entity/       # アプリケーション内で使うデータの型ともしかしたらクラスとかも
|   |   |
|   |   +-- ~.entity.ts
|   |
|   +-- interface/    # infraなどでどのような機能を持たせるかというinterfaceが入る
|       |
|       +-- ~.interface.ts
|
+-- infra/            # prismaへの直接のアクセスや直接のfetchなど、外部に最も依存する部分(classを使う)
|   |
|   +-- client/       # client側でのアクセス(cookieやもしかしたらipなども)
|   |   |
|   |   +-- ~.client.ts
|   |
|   +-- repository/   # dbへのアクセス
|   |   |
|   |   +-- ~.repository.ts
|   .
|   .
|   .
|
+-- index.ts          # サーバーの起動や他の場所からの呼び出しなどを行う場所
|
+-- response/         # zodなどを使いレスポンスの型やレスポンスの定義をする
|
+-- testing/          # テストやモックなど
|
+-- usecase/          # アクター(ユーザー)からみた時の動き(ログインや、クイズの登録)
|
+-- utils/            # 日付の取得や、計算などのどこからでも再利用できるもの
```

#### それぞれの依存関係(Hono)

- どこからでも呼び出せる: `utils`,`config`,`domain/entity`
- `controller`が呼び出せる: `response`,`usecase`,どこからでも呼び出せるもの
- `usecase`が呼び出せる: `domain/interface`,`infra`,どこからでも呼び出せるもの
- `infra`が呼び出せる: どこからでも呼び出せるもの

※ **同階層のものは基本的にどこからでも呼び出せるもの以外は呼び出せない**

#### Usecaseについて(Hono)

usecaseでは、`exec`意外に関数を持たない

```typescript
export class ~UseCase{
  constructor(
    private readonly addId:IAddId = new AddId()
  ){}
  exec(id){
    this.addId.checkId(id)
    this.addId.setId(id)
  }
}
```

#### ファイルとクラスの命名(Hono)

- `interface`の場合は、`~.interface.ts`とする `interface`での`~`は、これの拡張先のクラス(`infra/`以下)
- `usecase/`以下のファイルは`~.usecase.ts`とする
- `entity/`以下のフィアルは、`~.entity.ts`
- `infra/`以下のファイルは、その中の親のフォルダの名前を使う

  **(例)**

  - `/infra/client/`の場合
    ~.client.ts

  - `/infra/repository`の場合、

    ~.repository.ts

  - また、これに伴い以下のインターフェースのファイルが作られうことになる

    ```bash
    ~.client.interface.ts
    ~.repository.interface.ts
    ```

- ファイルの単語の区切りは`-`を使って、区切る

  ```bash
  session-cookie.client.interface.ts
  login.usecase.ts
  ```

- クラス名やインスタンス名は先ほどのファイルと同じようにするが、インターフェースだけは、`I`から始めて、`~Interface`とはしない

  ```typescript
  export interface ISessionCookieClient{ ... }
  ```

  ```typescript
  export class LoginUseCase{ ... }
  ```

- 関数などは複数配置する場合が多いと思うため、このルールは適応しなくて良い
