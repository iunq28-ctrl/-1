# GitHub Pages 发布检查清单

上传前：

- [ ] 已解压压缩包
- [ ] `index.html` 位于仓库根目录
- [ ] `assets` 文件夹完整上传
- [ ] 页面文件名全部为小写英文
- [ ] 没有把外层 `github-pages-package` 文件夹整体再套一层

发布设置：

- [ ] 仓库 `Settings` → `Pages`
- [ ] `Source` = `Deploy from a branch`
- [ ] `Branch` = `main`
- [ ] `Folder` = `/(root)`
- [ ] 点击 `Save`

发布后：

- [ ] 首页可以打开
- [ ] 顶部导航可切换全部页面
- [ ] 团队成果图表可显示
- [ ] CSV、Excel、DOCX、PDF、PNG、SVG 和 R 文件可下载
- [ ] 手机宽度下菜单可展开

如果出现 404，先检查仓库根目录能否直接看到文件名完全为小写的 `index.html`。
