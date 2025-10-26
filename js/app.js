// 获取视频和播放按钮元素
const video = document.getElementById('video-bg');
const playButton = document.getElementById('video-play-button');

// 点击按钮切换播放状态
function togglePlay() {
  if (video.paused) {
    video.play();
  } else {
    video.pause();
  }
}
playButton.addEventListener('click', togglePlay);

// 根据视频状态显示/隐藏按钮
video.addEventListener('play', () => {
  playButton.style.display = 'none';
});
video.addEventListener('pause', () => {
  playButton.style.display = 'block';
});

// 页面动态文字变量改为通过异步请求获取
function getPageKeyFromUrl() {
  // 优先从URL参数获取type
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  if (typeParam) {
    return typeParam;
  }
  // 否则根据路径获取介绍key，例如/shark.html => shark
  const path = window.location.pathname;
  const match = path.match(/([\w-]+)\.html$/);
  return match ? match[1] : "shark";
}

async function fetchIntroductionData(pageKey) {
  let fetchPath = 'static/introductions.json';
  try {
    const response = await fetch(fetchPath);
    const data = await response.json();
    console.log("获取到的数据:", data);
    return data[pageKey] || data["shark"];
  } catch (e) {
    console.error("获取介绍数据失败:", e);
  }
}

// 渲染介绍数据到页面
async function renderIntroduction() {
  const pageKey = getPageKeyFromUrl();
  const data = await fetchIntroductionData(pageKey);
  if (data) {
    // 渲染页面标题
    document.getElementById('page-title').textContent = data.pageTitle || '海洋生物介绍';
    
    // 渲染视频背景
    video.src = data.videoBgSrc || 'static/video/fish1.mp4';
    video.alt = data.videoBgAlt || '深海场景';
    
    // 渲染鱼类图标
    document.getElementById('fish-icon').src = data.fishIconSrc || 'static/images/fish1.png';
    document.getElementById('fish-icon').alt = data.fishIconAlt || '生物图标';
    
    // 渲染基本数据
    document.getElementById('fish-length').textContent = data.length || '未知';
    document.getElementById('fish-weight').textContent = data.weight || '未知';
    document.getElementById('fish-depth').textContent = data.depth || '未知';
    
    // 渲染详细特征
    document.getElementById('bio-feature').textContent = data.bioFeature || '暂无信息';
    document.getElementById('habitat').textContent = data.habitat || '暂无信息';
    document.getElementById('behavior').textContent = data.behavior || '暂无信息';
    // 可根据实际JSON结构扩展其他字段，如重量、描述等
  }
}

// 页面加载时执行渲染
window.addEventListener('DOMContentLoaded', renderIntroduction);

// 标签切换逻辑
const tabItems = document.querySelectorAll('.tab-item');
const contentBlocks = document.querySelectorAll('.content-block');

tabItems.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    // 移除所有标签的active类
    tabItems.forEach(item => item.classList.remove('active'));
    // 添加当前标签的active类
    tab.classList.add('active');
    // 隐藏所有内容块
    contentBlocks.forEach(block => block.classList.add('hidden'));
    // 显示对应内容块
    contentBlocks[index].classList.remove('hidden');
  });
});