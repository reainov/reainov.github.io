document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.getElementById('back-button');
    
    // 保存当前页面状态
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
    
    // 恢复页面状态
    if (sessionStorage.getItem('scrollPosition')) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
    }
    
    backButton.addEventListener('click', () => {
        window.history.back();
    });
});