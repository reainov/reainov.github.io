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
  document.getElementById('page-title').textContent = intro.pageTitle;
  const videoBg = document.getElementById('video-bg');
  videoBg.src = intro.videoBgSrc;
  videoBg.alt = intro.videoBgAlt;
  const fishIcon = document.getElementById('fish-icon');
  fishIcon.src = intro.fishIconSrc;
  fishIcon.alt = intro.fishIconAlt;
  document.getElementById('bio-feature').textContent = intro.bioFeature;
  document.getElementById('habitat').textContent = intro.habitat;
  document.getElementById('behavior').textContent = intro.behavior;
}

document.addEventListener('DOMContentLoaded', function() {
  insertDynamicContent();
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