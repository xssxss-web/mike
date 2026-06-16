// nav-loader.js 全局公共导航加载&移动端菜单逻辑
document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.getElementById('global-nav');
  if (!navContainer) return;

  // 自动判断页面层级，适配根页面/子目录页面自动切换路径
  let navPath;
  if (location.pathname.split('/').filter(p=>p).length === 0 || location.pathname === '/') {
    // 首页根目录：index.html
    navPath = './nav.html';
  } else {
    // 子页面 /contact /blog 等
    navPath = '../nav.html';
  }

  // 拉取公共导航HTML
  fetch(navPath)
    .then(res => {
      if (!res.ok) throw new Error('nav.html 加载404');
      return res.text();
    })
    .then(html => {
      navContainer.innerHTML = html;
    })
    .catch(err => console.error('公共导航加载失败：', err));

  // 全局事件委托，处理移动端所有菜单点击
  navContainer.addEventListener('click', function(e) {
    // 汉堡总菜单
    const hamburger = e.target.closest('#mobileMenuBtn');
    if (hamburger) {
      const menuWrap = document.getElementById('mobileMenu');
      const arrow = hamburger.querySelector('svg');
      menuWrap.classList.toggle('hidden');
      arrow.classList.toggle('rotate-180');
      return;
    }
    // Products 二级菜单
    const prodToggle = e.target.closest('#mobileProdBtn');
    if (prodToggle) {
      const prodBox = document.getElementById('mobileProdMenu');
      const arrow = prodToggle.querySelector('svg');
      prodBox.classList.toggle('hidden');
      arrow.classList.toggle('rotate-180');
      return;
    }
    // Locks 三级菜单
    const lockToggle = e.target.closest('.mobileLockBtn');
    if (lockToggle) {
      const lockBox = lockToggle.nextElementSibling;
      const arrow = lockToggle.querySelector('.mobileLockIcon');
      lockBox.classList.toggle('rotate-180');
      lockBox.classList.toggle('hidden');
      return;
    }
  })
})