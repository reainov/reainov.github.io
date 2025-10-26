document.addEventListener('DOMContentLoaded', function() {
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
          <div class="card-image">
            <img src="${item.fishIconSrc}" alt="${item.fishIconAlt}">
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