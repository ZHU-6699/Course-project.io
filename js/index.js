// 页面加载完成事件：当整个HTML页面及其外部资源（图片、音频等）加载完毕后，执行内部逻辑
window.onload = function() {

    window.addEventListener('click', e => {
        audio.play();
    });
};
