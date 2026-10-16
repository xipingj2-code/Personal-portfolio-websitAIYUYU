# AIYUYU · 蒋希萍个人作品集

本次发布准备：2026-10-16。使用本地 index-v17.html 最新确认版本，包含 76px 首屏标题和品牌弹窗项目概览修订。

唯一目标仓库：https://github.com/xipingj2-code/Personal-portfolio-websitAIYUYU

启用 GitHub Pages 后的预计网址：https://xipingj2-code.github.io/Personal-portfolio-websitAIYUYU/

此处记录的是发布配置，不代表网站已经上线。发布状态需以 GitHub Pages 部署结果为准。

## 文件

- index.html：正式首页；index-v17.html 保留同版页面入口。
- 各 CSS / JS：目录、视频、光标、图片预览、品牌弹窗、细节样式及文字入场。
- assets/：本站引用的原始作品图片、静态图标、二维码及视频。
- vendor/gsap-3.13.0.min.js：本地动画库；运行不需要外部 CDN。

本站是无需构建的静态网站。媒体路径采用相对地址，支持仓库子路径部署。

## 发布设置

先将本目录内容提交到目标仓库 main 分支的根目录，再在仓库 Settings → Pages → Build and deployment 选择 Deploy from a branch，分支选择 main，目录选择 /(root)，保存并检查部署结果。

GitHub 官方说明：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 内容与交互

商业视觉、数字页面、原创 IP、AI 影像、品牌与活动五类作品；作品图片支持站内放大，品牌案例通过站内弹窗浏览。默认静音，支持减少动态效果设置。

概念广告和练习作品不代表品牌委托；功能、参数和睡眠效果不代表经过产品验证。联系方式为作品集作者提供的公开职业联系方式。

## 版本与回退

这是新仓库的首版网站，不依赖任何旧仓库或旧提交。发布后保留正常 Git 提交历史，后续需要回退时建立回退提交，不要强制覆盖历史。

## 发布排除项

不包含 Figma 捕获页面、临时图、工作日志、参考素材、绝对磁盘路径或账户凭据。
