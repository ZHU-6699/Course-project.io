// ===================================== 1. 商品图片切换 =====================================
// 获取所有商品缩略图
const smallImgs = document.querySelectorAll('#fj img');
// 获取商品主图
const mainImg = document.getElementById('big-img');

// 遍历所有缩略图，绑定点击事件
smallImgs.forEach(img => {
  img.onclick = function() {
    // 点击缩略图，直接把主图的路径换成缩略图的路径（一行搞定）
    mainImg.src = this.src;
  }
});

// ===================================== 2. 尺码/规格选中 =====================================
// 获取所有规格按钮
const specBtns = document.querySelectorAll('.btn0');

// 遍历按钮，绑定点击事件
specBtns.forEach(btn => {
  btn.onclick = function() {
    // 第一步：先把所有按钮的选中样式去掉（取消全部选中）
    specBtns.forEach(item => {
      item.classList.remove('active');
    });
    // 第二步：给当前点击的按钮添加选中样式（选中当前）
    this.classList.add('active');
  }
});

// ===================================== 3. 购买/购物车按钮悬浮特效=====================================
// 获取两个操作按钮
const cartBtn = document.querySelector('.btn1'); // 加入购物车
const buyBtn = document.querySelector('.btn2'); // 立即购买

// 购物车按钮：悬浮变浅一点，移出恢复（简单特效）
cartBtn.onmouseover = function() {
  this.style.backgroundColor = '#F9D888'; // 浅金色加深一点
}
cartBtn.onmouseout = function() {
  this.style.backgroundColor = '#F3CE71'; // 恢复默认浅金色
}

// 立即购买按钮：悬浮变深一点，移出恢复（简单特效）
buyBtn.onmouseover = function() {
  this.style.backgroundColor = '#192330'; // 深蓝色加深一点
}
buyBtn.onmouseout = function() {
  this.style.backgroundColor = '#212F40'; // 恢复默认深蓝色
}

