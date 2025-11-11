document.addEventListener('DOMContentLoaded', function() {
    // 搜索功能
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    
    // 保存当前页面状态
    function savePageState() {
        localStorage.setItem('galleryScrollPosition', window.scrollY);
        localStorage.setItem('gallerySearchQuery', searchInput.value);
        localStorage.setItem('galleryFromIndex', window.location.href.includes('index.html'));
    }
    
    // 在页面卸载前保存状态
    window.addEventListener('beforeunload', savePageState);
    
    // 恢复页面状态
    function restorePageState() {
        const savedPosition = localStorage.getItem('galleryScrollPosition');
        if (savedPosition) {
            window.scrollTo(0, parseInt(savedPosition));
            localStorage.removeItem('galleryScrollPosition');
        }
    }
    
    // 确保DOM完全加载后再恢复状态
    function checkDOMLoaded() {
        if (document.readyState === 'complete') {
            restorePageState();
        } else {
            window.addEventListener('load', restorePageState);
        }
    }
    
    // 延迟检查以确保所有元素已加载
    setTimeout(checkDOMLoaded, 100);
    
    // 清除临时标记
    if (localStorage.getItem('galleryFromIndex')) {
        localStorage.removeItem('galleryFromIndex');
    }
    
    // 恢复搜索状态
    if (localStorage.getItem('gallerySearchQuery')) {
        searchInput.value = localStorage.getItem('gallerySearchQuery');
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
              <img src="${item.fishIconSrc}" alt="${item.fishIconAlt}">
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