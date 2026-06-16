// nav-loader.js 唯一作用：处理移动端菜单点击，电脑下拉完全由nav.html内置CSS控制
document.addEventListener('DOMContentLoaded', () => {
  const navWrap = document.getElementById('global-nav');
  if (!navWrap) return;

  // 拉取导航HTML（统一根路径，所有页面通用无404）
  fetch('/nav.html')
    .then(res => {
      if (!res.ok) throw new Error(`导航文件加载失败 状态${res.status}`);
      return res.text();
    })
    .then(html => navWrap.innerHTML = html)
    .catch(err => console.error('导航加载异常：', err));

  // 事件委托统一处理移动端所有点击，无需等待DOM渲染完成
  navWrap.addEventListener('click', function (e) {
    // 1. 汉堡总菜单开关
    const hamburgerBtn = e.target.closest('#mobileMenuBtn');
    if (hamburgerBtn) {
      const mobileMenu = document.getElementById('mobileMenu');
      const icon = hamburgerBtn.querySelector('svg');
      mobileMenu.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
      return;
    }
    // 2. Products二级菜单开关
    const prodBtn = e.target.closest('#mobileProdBtn');
    if (prodBtn) {
      const prodBox = document.getElementById('mobileProdMenu');
      const icon = prodBtn.querySelector('.mobileProdIcon');
      prodBox.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
      return;
    }
    // 3. Locks三级子菜单开关
    const lockBtn = e.target.closest('.mobileLockBtn');
    if (lockBtn) {
      const lockBox = lockBtn.nextElementSibling;
      const icon = lockBtn.querySelector('.mobileLockIcon');
      lockBox.classList.toggle('hidden');
      icon.classList.toggle('rotate-180');
      return;
    }
  })
})
