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
    console.error("获取介绍数据失败:", e);}}