# 智能经济 · 数字经济研究网站

这是一套已经整理好的 GitHub Pages 静态网站源码。网站不需要数据库、Node.js、PHP 或服务器，上传到仓库后即可发布。

## 文件结构

```text
.
├── index.html                 # 网站首页（必须位于仓库根目录）
├── products.html             # 数字产品
├── product-detail.html       # 产品详情与示例数据下载
├── cases.html                # 数字化案例
├── insights.html             # AI 生态资讯
├── team.html                 # 团队成果
├── team-stats.html           # 成果统计详情
├── 404.html                  # 找不到页面时显示
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── data/                 # CSV、Excel、R、图片、DOCX、PDF
```

## GitHub Pages 部署（推荐：从 main 分支发布）

1. 在 GitHub 新建一个仓库，建议选择 `Public`。
2. 解压网站压缩包，把本目录中的全部内容上传到仓库根目录。不要只上传外层文件夹。
3. 确认仓库首页能直接看到小写文件名 `index.html`。
4. 打开仓库 `Settings` → `Pages`。
5. 在 `Build and deployment` 中，将 `Source` 选择为 `Deploy from a branch`。
6. 将分支选择为 `main`，文件夹选择为 `/(root)`，然后点击 `Save`。
7. 等待 GitHub 完成发布，网站地址通常为：`https://你的用户名.github.io/仓库名/`。

## 常见失败原因

- 入口文件仍叫 `index(2).html`，而不是根目录中的 `index.html`。
- 只上传了 HTML，没有上传 `assets` 文件夹。
- 文件名大小写不一致，例如页面写 `style.css`，仓库里却是 `Style.css`。
- Pages 发布源没有选择 `main / (root)`。
- 仓库根目录外面又套了一层文件夹，导致 GitHub 找不到 `index.html`。
- 修改后仍看到旧页面：等待几分钟后强制刷新浏览器。

## 数据说明

`assets/data/team/` 与 `assets/data/desi/` 中的数据均为虚构测试数据，只用于网页展示、下载功能和部署测试，不代表任何真实团队或研究结论。

## 本地查看

可直接双击 `index.html`。如果浏览器限制本地文件下载，可在此目录运行：

```bash
python3 -m http.server 8000
```

然后访问 `http://localhost:8000/`。
