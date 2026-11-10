# 婚禮桌次查詢

React + SCSS + React Router 的純前端網站，名單直接使用 `data/guests.json`，不需要後端或資料庫服務。建議使用 Node.js 22。

## 開發

```sh
npm install
npm run dev
```

開啟終端機顯示的網址（預設 http://127.0.0.1:5173）。

## 修改賓客名單

直接編輯 `data/guests.json`，每筆格式如下：

```json
{ "name": "王小明", "tableNumber": 3, "partySize": 2 }
```

- `name`：完整姓名。
- `tableNumber`：桌次，可使用數字或文字，例如 `"主桌"`、`"1、2"`、`"主桌、8"`。跨桌的 `partySize` 為各桌人數加總。
- `partySize`：該姓名所代表的整組出席人數，使用正整數。

輸入姓名只要包含名單中的 `name` 即可匹配（例如名單為「小明」，輸入「王小明」也能查到），忽略空白及全半形差異。反向不匹配：名單為「王小明」時，僅輸入「小明」不會查到。完全相同的姓名優先；沒有完全相符的姓名時才進行包含比對，符合多筆時提示洽詢接待人員，不任意選取其中一筆。開發期間修改名單即會更新；線上版本需重新建置並部署。

**完整名單會被打包到前端，任何可開啟網站的人都可以查看。** 即使 GitHub 儲存庫為 Private，也不會隱藏網站提供的名單。

舊版 `data/wedding.sqlite` 如仍存在，已不再使用，保留檔案不影響新版本。

## 測試與建置

```sh
npm test
npm run build
npm start
```

建置結果位於 `dist/`；`npm start` 預覽建置結果，預設 http://127.0.0.1:4173。

## GitHub Pages

本專案可以部署至靜態網站服務，將 `dist/` 內容作為網站發布目錄即可。尚未替此專案設定 GitHub Actions 或執行部署。

Vite 使用相對資源路徑 `base: './'`，React Router 使用 `HashRouter`，因此可放在 GitHub Pages 的儲存庫子路徑，例如：

```text
https://你的帳號.github.io/weddingweb/#/seating
```

`#` 後方為前端路由，重新整理內頁不需要伺服器的路由重寫設定。

## 路由與擴充

- `/`：目前轉至 `/seating`，日後在 `src/main.jsx` 替換成首頁元件即可。
- `/seating`：桌次查詢內頁。
- 其他路徑：找不到頁面提示。

以上路由皆位於網址的 `#` 後方。新增頁面時使用 React Router 的 `Link` 連結。

主要頁面位於 `src/pages/TableLookup.jsx`；查詢邏輯位於 `src/lib/guests.js`；SCSS 位於 `src/styles.scss`；插圖是可編輯 SVG 元件。日期依參考圖暫設為 2026.12.06，文字可在頁面元件修改。字體使用 Google Fonts，無網路時會回退至系統字體。
