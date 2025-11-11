document.addEventListener('DOMContentLoaded', function() {
    // const backButton = document.getElementById('back-button');
    const specimenCard = document.getElementById('specimen-card');
    const audioButton = document.getElementById('audio-button');
    const bgmButton = document.getElementById('bgm-button');
    const bgmContainer = document.getElementById('bgm-container');
    
    // 获取背景音乐元素（移到全局以确保可访问）
    const bgmAudio = document.getElementById('bgm-audio');
    let isBgmPlaying = false; // 背景音乐播放状态
    
    // 保存当前页面状态
    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('scrollPosition', window.scrollY);
    });
    
    // 恢复页面状态
    if (sessionStorage.getItem('scrollPosition')) {
        window.scrollTo(0, parseInt(sessionStorage.getItem('scrollPosition')));
    }
    
    // backButton.addEventListener('click', () => {
    //     window.history.back();
    // });
    
    // 标本馆卡片点击事件 - 跳转到图鉴页面
    if (specimenCard) {
        specimenCard.addEventListener('click', function() {
            // 平滑跳转到gallery.html页面
            window.location.href = 'gallery.html';
        });

    }
    
    // 蓝眼泪馆卡片点击事件 - 跳转到蓝眼泪页面
    const bluetearCard = document.getElementById('bluetear-card');
    if (bluetearCard) {
        bluetearCard.addEventListener('click', function() {
            // 平滑跳转到bluetear.html页面
            window.location.href = 'bluetear.html';
        });
    }
    
    // 中英切换功能
    const languageSwitch = document.querySelector('.language-switch');
    const langButtons = document.querySelectorAll('.lang-btn');
    const zhText = document.querySelector('.zh-text');
    const enText = document.querySelector('.en-text');
    
    // 从sessionStorage获取当前语言设置
    const currentLang = sessionStorage.getItem('currentLang') || 'zh';
    
    // 初始化语言显示
    function initLanguage() {
        if (currentLang === 'zh') {
            zhText.classList.add('active');
            enText.classList.remove('active');
            langButtons[0].classList.add('active');
            langButtons[1].classList.remove('active');
        } else {
            zhText.classList.remove('active');
            enText.classList.add('active');
            langButtons[0].classList.remove('active');
            langButtons[1].classList.add('active');
        }
    }
    
    // 语言切换事件
    langButtons.forEach(button => {
        button.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // 移除所有按钮的active类
            langButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的active类
            this.classList.add('active');
            
            // 切换文本显示
            if (lang === 'zh') {
                zhText.classList.add('active');
                enText.classList.remove('active');
            } else {
                zhText.classList.remove('active');
                enText.classList.add('active');
            }
            
            // 保存语言设置到sessionStorage
            sessionStorage.setItem('currentLang', lang);
        });
    });
    
    // 初始化语言
    initLanguage();
    
    // 初始化背景音乐文字元素的data-text属性
    const bgmText = document.getElementById('bgm-text');
    if (bgmText) {
        bgmText.setAttribute('data-text', bgmText.textContent);
    }
    
    // 更新背景音乐按钮和容器状态
    function updateBgmUI(playing) {
        isBgmPlaying = playing;
        if (playing) {
            bgmButton.classList.add('playing');
            bgmButton.classList.remove('muted');
            bgmButton.innerHTML = '<i class="fas fa-pause"></i>';
            bgmContainer.classList.add('playing');
        } else {
            bgmButton.classList.remove('playing');
            bgmButton.classList.add('muted');
            bgmButton.innerHTML = '<i class="fas fa-music"></i>';
            bgmContainer.classList.remove('playing');
        }
    }
    
    // 语音播放功能
    if (audioButton) {
        let currentAudio = null;
        audioButton.addEventListener('click', function() {
            // 获取当前语言
            const currentLang = sessionStorage.getItem('currentLang') || 'zh';
            // 根据当前语言选择音频文件
            const audioFile = currentLang === 'zh' 
                ? 'static/audio/科普馆介绍中文.mp3' 
                : 'static/audio/科普馆介绍英文.mp3';
            // 如果当前有音频正在播放，停止它
            if (currentAudio) {
                currentAudio.pause();
                currentAudio.currentTime = 0;
                audioButton.classList.remove('playing');
                currentAudio = null;
                return;
               
            }
            // 创建新的音频对象
            currentAudio = new Audio(audioFile);
            // 播放音频
            currentAudio.play().then(_ => {
                // 更新按钮状态（不更换图标）
                audioButton.classList.add('playing');
                
                // 语音播放时，同时触发背景音乐播放
                if (bgmAudio && !isBgmPlaying) {
                    bgmAudio.play()
                        .then(_ => {
                            updateBgmUI(true);
                        })
                        .catch(error => {
                            console.log('语音播放时触发背景音乐失败:', error);
                        });
                }
            }).catch(error => {
                console.error('音频播放失败:', error);
                alert('音频文件加载失败，请检查文件路径或网络连接。');
            });
            
            // 音频播放结束事件
            currentAudio.addEventListener('ended', function() {
                audioButton.classList.remove('playing');
                currentAudio = null;
                // 语音播放结束时，背景音乐保持播放状态
            });
            
            // 音频播放错误事件
            currentAudio.addEventListener('error', function() {
                console.error('音频播放失败:', audioFile);
                audioButton.classList.remove('playing');
                alert('音频文件加载失败，请检查文件路径或网络连接。');
                currentAudio = null;
            });
        });
        
        // 监听语言切换事件，如果音频正在播放，停止播放
        langButtons.forEach(button => {
            button.addEventListener('click', function() {
                if (currentAudio) {
                    currentAudio.pause();
                    currentAudio.currentTime = 0;
                    audioButton.classList.remove('playing');
                    currentAudio = null;
                }
            });
        });
    }
    
    // 背景音乐功能
    if (bgmButton) {
        bgmAudio.volume = 0.5; // 设置音量（0.0到1.0）
        let hasUserInteracted = false;
        
        // 检测是否在微信浏览器中
        function isWeChatBrowser() {
            return /micromessenger/i.test(navigator.userAgent);
        }
        
        // 尝试自动播放背景音乐（处理浏览器自动播放策略）
        function attemptAutoPlay() {
            // 如果已经播放过，不再尝试
            if (isBgmPlaying) return;
            
            // 在微信浏览器中，需要等待用户交互
            if (isWeChatBrowser() && !hasUserInteracted) {
                console.log('微信浏览器检测到，等待用户交互后播放背景音乐');
                return;
            }
            
            const playPromise = bgmAudio.play();
            
            if (playPromise !== undefined) {
                playPromise.then(_ => {
                    // 自动播放成功
                    updateBgmUI(true);
                    console.log('背景音乐自动播放成功');
                })
                .catch(error => {
                    // 自动播放被阻止，等待用户交互
                    console.log('背景音乐自动播放被阻止，等待用户交互:', error);
                });
            }
        }
        
        // 页面加载完成后尝试自动播放
        // 对于微信浏览器，延迟时间更长一些
        const autoPlayDelay = isWeChatBrowser() ? 2000 : 1000;
        setTimeout(attemptAutoPlay, autoPlayDelay);
        
        // 监听用户交互事件
        function enableAudioAfterInteraction() {
            hasUserInteracted = true;
            // 如果音乐还没播放，尝试播放
            if (!isBgmPlaying) {
                attemptAutoPlay();
            }
            // 移除事件监听器，避免重复触发
            document.removeEventListener('touchstart', enableAudioAfterInteraction);
            document.removeEventListener('click', enableAudioAfterInteraction);
            document.removeEventListener('keydown', enableAudioAfterInteraction);
        }
        
        // 添加用户交互事件监听器
        document.addEventListener('touchstart', enableAudioAfterInteraction, { once: true });
        document.addEventListener('click', enableAudioAfterInteraction, { once: true });
        document.addEventListener('keydown', enableAudioAfterInteraction, { once: true });
        
        // 背景音乐按钮点击事件
        bgmButton.addEventListener('click', function(e) {
            // 阻止事件冒泡
            e.stopPropagation();
            
            // 标记用户已交互
            hasUserInteracted = true;
            
            if (isBgmPlaying) {
                // 暂停背景音乐
                bgmAudio.pause();
                updateBgmUI(false);
            } else {
                // 播放背景音乐
                bgmAudio.play()
                    .then(_ => {
                        updateBgmUI(true);
                    })
                    .catch(error => {
                        console.error('背景音乐播放失败:', error);
                        // 在微信浏览器中，可能需要创建一个临时的音频元素来触发播放
                        if (isWeChatBrowser()) {
                            // 创建一个临时的音频元素，播放一次后删除
                            const tempAudio = new Audio();
                            tempAudio.src = 'static/audio/展馆背景音乐.mp3';
                            tempAudio.volume = 0;
                            tempAudio.play().then(() => {
                                tempAudio.pause();
                                tempAudio.src = '';
                                // 再次尝试播放背景音乐
                                bgmAudio.play().then(_ => {
                                    updateBgmUI(true);
                                }).catch(err => {
                                    console.error('微信浏览器背景音乐播放仍然失败:', err);
                                    alert('背景音乐播放失败，请点击播放按钮重试。');
                                });
                            }).catch(err => {
                                console.error('微信浏览器音频初始化失败:', err);
                                alert('背景音乐播放失败，请点击播放按钮重试。');
                            });
                        } else {
                            alert('背景音乐播放失败，请检查音频文件或网络连接。');
                        }
                    });
            }
        });
        
        // 背景音乐播放结束事件（循环播放时不会触发）
        bgmAudio.addEventListener('ended', function() {
            // 如果不是循环播放，这里可以处理结束事件
            if (!bgmAudio.loop) {
                updateBgmUI(false);
            }
        });
        
        // 背景音乐播放错误事件
        bgmAudio.addEventListener('error', function() {
            console.error('背景音乐加载失败:', 'static/audio/展馆背景音乐.mp3');
            bgmButton.classList.add('muted');
            bgmContainer.classList.remove('playing');
            bgmButton.innerHTML = '<i class="fas fa-music"></i>';
        });
        
        // 当语音播放时，降低背景音乐音量
        if (audioButton) {
            const originalBgmVolume = bgmAudio.volume;
            
            // 监听语音播放状态变化
            const observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutation) {
                    if (mutation.attributeName === 'class') {
                        if (audioButton.classList.contains('playing')) {
                            // 语音播放时，降低背景音乐音量
                            bgmAudio.volume = originalBgmVolume * 0.3;
                        } else {
                            // 语音停止时，恢复背景音乐音量
                            bgmAudio.volume = originalBgmVolume;
                        }
                    }
                });
            });
            
            // 开始观察语音按钮的class属性变化
            observer.observe(audioButton, { attributes: true });
        }
    }
});