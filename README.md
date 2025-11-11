# 平潭海洋科普馆 - 海洋生物标本介绍网站

一个展示平潭海洋生物标本的响应式网站，包含多种海洋生物的介绍、图片和视频展示。

## 🌊 项目特色

- **响应式设计**：适配各种设备屏幕尺寸
- **多媒体展示**：支持图片、视频、音频等多种媒体格式
- **交互式体验**：轮播图、模态框、动态内容加载
- **现代化UI**：使用Tailwind CSS和Swiper.js构建美观界面

## 📁 项目结构

```
海洋生物标本介绍页面/
├── index.html          # 首页
├── bluetear.html      # 蓝眼泪专题页面
├── gallery.html       # 图片画廊
├── houseintro.html    # 展馆介绍
├── css/               # 样式文件
│   ├── main.css
│   └── houseintro.css
├── js/                # JavaScript文件
│   ├── app.js
│   ├── gallery.js
│   └── houseintro.js
└── static/            # 静态资源
    ├── audio/         # 音频文件
    ├── images/        # 图片文件
    ├── video/         # 视频文件
    └── *.json         # 配置文件
```

## 🚀 快速开始

### 本地运行

1. 克隆项目到本地
```bash
git clone git@github.com:reainov/reainov.github.io.git
cd 海洋生物标本介绍页面
```

2. 启动本地服务器
```bash
# 使用Python
python -m http.server 8000

# 或使用Node.js（需要安装http-server）
npx http-server -p 8000
```

3. 在浏览器中访问 `http://localhost:8000`

### GitHub Pages部署

本项目已配置为GitHub Pages，访问：
https://reainov.github.io

## 🛠️ 技术栈

- **前端框架**：HTML5 + CSS3 + JavaScript
- **样式框架**：Tailwind CSS
- **轮播组件**：Swiper.js
- **图标库**：Font Awesome
- **字体**：Google Fonts (Pacifico)

## 📱 页面功能

### 首页 (index.html)
- 网站导航和介绍
- 快速访问各功能页面

### 蓝眼泪专题 (bluetear.html)
- 视频轮播展示
- 科学知识介绍
- 图片画廊
- 交互式模态框

### 图片画廊 (gallery.html)
- 海洋生物图片展示
- 分类浏览功能

### 展馆介绍 (houseintro.html)
- 展馆详细信息
- 标本分类展示

## 🔧 自定义配置

### JSON配置文件
项目使用JSON文件管理资源：
- `static/bluetear_img.json` - 蓝眼泪页面图片配置
- `static/blueter_vedio.json` - 蓝眼泪页面视频配置
- `static/introductions.json` - 生物介绍配置

### 添加新内容
1. 在对应目录添加媒体文件
2. 更新对应的JSON配置文件
3. 页面将自动加载新内容

## 🌟 特色功能

1. **动态内容加载**：通过JavaScript动态加载JSON配置
2. **视频播放控制**：智能视频播放/暂停管理
3. **响应式布局**：完美适配移动端和桌面端
4. **无障碍访问**：支持键盘导航和屏幕阅读器

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request来改进项目！

## 📞 联系信息

- 项目主页：https://reainov.github.io
- GitHub仓库：git@github.com:reainov/reainov.github.io.git