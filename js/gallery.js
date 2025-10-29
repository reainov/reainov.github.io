document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // 保存当前页面状态
    function savePageState() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
        sessionStorage.setItem('gallerySearchQuery', searchInput.value);
        sessionStorage.setItem('galleryFromIndex', window.location.href.includes('index.html'));
    }
    
    // 在页面卸载前保存状态
    window.addEventListener('beforeunload', savePageState);
    
    // 恢复页面状态
    if (sessionStorage.getItem('scrollPosition')) {
        window.addEventListener('load', function() {
            setTimeout(() => {
                window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
            }, 100);
        });
    }
    
    // 清除临时标记
    if (sessionStorage.getItem('galleryFromIndex')) {
        sessionStorage.removeItem('galleryFromIndex');
    }
    
    // 恢复搜索状态
    if (sessionStorage.getItem('gallerySearchQuery')) {
        searchInput.value = sessionStorage.getItem('gallerySearchQuery');
        performSearch(searchInput.value);
    }

  // 搜索功
  
  function performSearch(query) {
    if (query.length === 0) {
      searchResults.style.display = 'none';
      return;
    }
    
    fetch('static/introductions.json')
      .then(response => response.json())
      .then(data => {
        const matches = Object.entries(data).filter(([key, item]) => 
          item.pageTitle.includes(query)
        );
        
        searchResults.innerHTML = '';
        matches.forEach(([key, item]) => {
          const resultItem = document.createElement('div');
          resultItem.textContent = item.pageTitle;
          resultItem.addEventListener('click', () => {
            window.location.href = `index.html?type=${key}`;
          });
          searchResults.appendChild(resultItem);
        });
        
        searchResults.style.display = matches.length ? 'block' : 'none';
      });
  }
  
  searchInput.addEventListener('input', function() {
    performSearch(this.value);
  });
  
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      performSearch(this.value);
    }
  });
  
  // 获取JSON数据
  fetch('static/introductions.json')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('gallery-container');
      let index = 1;
      
      // 遍历JSON数据创建卡片
      for (const [key, item] of Object.entries(data)) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.innerHTML = `
          <div class="card-image-container">
            <div class="card-image">
              <img src="${item.fishIconSrc}" alt="${item.fishIconAlt}" onerror="this.style.display='none';">
            </div>
          </div>
          <div class="card-footer">
            <span class="card-index">${index}</span>
            <span class="card-title">${item.pageTitle}</span>
          </div>
        `;
        
        // 添加点击事件
        card.addEventListener('click', () => {
          window.location.href = `index.html?type=${key}`;
        });
        
        container.appendChild(card);
        index++;
      }
    })
    .catch(error => console.error('Error loading JSON:', error));

  // 返回按钮事件
  document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
  });
});