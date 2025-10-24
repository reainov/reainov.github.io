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
  if (window.location.host === 'reainov.github.io') {
    fetchPath = '/static/introductions.json';
  }
  try {
    const response = await fetch(fetchPath);
    const data = await response.json();
    console.log("获取到的数据:", data);
    return data[pageKey] || data["shark"];
  } catch (e) {
    console.error("获取介绍数据失败:", e);
    return null;
  }
}

async function insertDynamicContent() {
  const pageKey = getPageKeyFromUrl();
  const intro = await fetchIntroductionData(pageKey);
  console.log("页面key:", pageKey);
  console.log("intro内容:", intro);
  if (!intro) return;
//   document.getElementById('page-title-tag').textContent = intro.pageTitle;
  document.getElementById('page-title').textContent = intro.pageTitle;
  // document.title = intro.pageTitle;
  const videoBg = document.getElementById('video-bg');
  videoBg.src = intro.videoBgSrc;
  videoBg.alt = intro.videoBgAlt;
  const fishIcon = document.getElementById('fish-icon');
  fishIcon.src = intro.fishIconSrc;
  fishIcon.alt = intro.fishIconAlt;
  document.getElementById('bio-feature').textContent = intro.bioFeature;
  document.getElementById('habitat').textContent = intro.habitat;
  document.getElementById('behavior').textContent = intro.behavior;
  // 动态渲染长度、重量、深度
  const dataValues = document.querySelectorAll('.data-value');
  if (dataValues.length === 3) {
    dataValues[0].textContent = intro.length;
    dataValues[1].textContent = intro.weight;
    dataValues[2].textContent = intro.depth;
  }
}

document.addEventListener('DOMContentLoaded', function() {
  insertDynamicContent();
  
  // 视频播放控制逻辑
  const video = document.getElementById('video-bg');
  const playButton = document.getElementById('play-button');
  
  // 初始状态根据视频播放状态显示/隐藏按钮
  if (video.paused) {
    playButton.style.display = 'flex';
  } else {
    playButton.style.display = 'none';
  }
  
  // 视频开始播放时隐藏按钮
  video.addEventListener('play', () => {
    playButton.style.display = 'none';
  });
  
  // 视频暂停时显示按钮（自动播放被阻止时触发）
  video.addEventListener('pause', () => {
    playButton.style.display = 'flex';
  });
  
  // 点击播放按钮触发视频播放
  playButton.addEventListener('click', () => {
    video.play();
  });

  const tabItems = document.querySelectorAll('.tab-item');
  const tabContents = document.querySelectorAll('.content-block');
  tabItems.forEach(item => {
    item.addEventListener('click', function() {
      const tabId = this.getAttribute('data-tab');
      tabItems.forEach(tab => tab.classList.remove('active'));
      this.classList.add('active');
      tabContents.forEach(content => {
        content.classList.add('hidden');
      });
      document.getElementById(`tab-content-${tabId}`).classList.remove('hidden');
    });
  });
});