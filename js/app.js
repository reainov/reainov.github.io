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
  return match ? match[1] : "黄犁齿鲷";
}

async function fetchIntroductionData(pageKey) {
  let fetchPath = 'static/introductions.json';
  try {
    const response = await fetch(fetchPath);
    const data = await response.json();
    console.log("获取到的数据:", data);
    return data[pageKey] || data["黄犁齿鲷"];
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
    video.src = data.videoBgSrc || '';
    video.alt = data.videoBgAlt || '暂无视频';
    
    // 渲染鱼类图标
    document.getElementById('fish-icon').src = data.fishIconSrc || '';
    document.getElementById('fish-icon').alt = data.fishIconAlt || '生物图标';
    
    // 渲染基本数据
    document.getElementById('fish-length').textContent = data.length || '暂无信息';
    document.getElementById('fish-weight').textContent = data.weight || '暂无信息';
    document.getElementById('fish-depth').textContent = data.depth || '暂无信息';
    
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

document.getElementById('floating-window').addEventListener('click', function() {
  // 直接跳转到图鉴页面
  window.location.href = 'gallery.html';
});
document.getElementById('house-intro').addEventListener('click', function() {
  // 直接跳转到图鉴页面
  window.location.href = 'houseintro.html';
});

// 语音播放状态管理
let isAudioPlaying = false;
let currentAudio = null;

// 更新语音讲解图标
function updateAudioIcon() {
  const audioIcon = document.querySelector('#audio-guide .floating-icon i');
  audioIcon.className = isAudioPlaying ? 'fas fa-pause' : 'fas fa-volume-up';
}

// 停止当前语音播放
function stopAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
  isAudioPlaying = false;
  updateAudioIcon();
}

// 初始化语音讲解状态
function initAudioState() {
  stopAudio();
}

// 语音讲解点击事件
document.getElementById('audio-guide').addEventListener('click', function() {
  if (isAudioPlaying) {
    stopAudio();
    return;
  }

  const pageKey = getPageKeyFromUrl();
  const audioUrl = `static/audio/${pageKey}.mp3`;
  currentAudio = new Audio(audioUrl);
  
  currentAudio.play().then(() => {
    isAudioPlaying = true;
    updateAudioIcon();
    
    // 播放结束自动更新状态
    currentAudio.onended = function() {
      isAudioPlaying = false;
      updateAudioIcon();
    };
  }).catch(e => {
    alert('暂未添加语音讲解内容');
    console.error('播放语音失败:', e);
  });
});

// 页面加载时初始化语音状态
window.addEventListener('DOMContentLoaded', function() {
  initAudioState();
  renderIntroduction();
});

