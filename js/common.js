/**
 * 公共脚本 - common.js
 * 包含：导航栏、移动端菜单、活动链接高亮等通用功能
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const navLinksItems = document.querySelectorAll('.nav-links a');

    // ====================
    // 导航栏滚动效果
    // ====================
    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    // 初始化检查
    handleNavbarScroll();

    // ====================
    // 移动端菜单切换
    // ====================
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // 点击导航链接后关闭菜单
        navLinksItems.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ====================
    // 活动链接高亮
    // ====================
    function updateActiveLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinksItems.forEach(link => {
            link.classList.remove('active');
            const linkPage = link.getAttribute('href');
            if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    updateActiveLink();

    // ====================
    // 数字计数动画
    // ====================
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    function animateCounter(counter) {
        const target = parseInt(counter.getAttribute('data-target'));
        const count = parseInt(counter.innerText);
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => animateCounter(counter), 20);
        } else {
            counter.innerText = target + '+';
        }
    }

    // 使用 Intersection Observer 触发动画
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                animateCounter(counter);
                counterObserver.unobserve(counter);
            }
        });
    }, observerOptions);

    counters.forEach(counter => counterObserver.observe(counter));

    // ====================
    // 滚动显示动画
    // ====================
    function initScrollAnimation() {
        const animatedElements = document.querySelectorAll('[data-aos]');
        
        const scrollAnimationObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.getAttribute('data-aos-delay') || 0;
                    
                    setTimeout(() => {
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, delay);
                    
                    scrollAnimationObserver.unobserve(element);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s ease';
            scrollAnimationObserver.observe(element);
        });
    }

    initScrollAnimation();

    // ====================
    // 页面加载动画
    // ====================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ====================
    // 防止链接默认行为（用于演示）
    // ====================
    document.querySelectorAll('.footer a[href="#"], .social-links a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            alert('此功能正在开发中');
        });
    });
});

/**
 * 工具函数
 */

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// 检测元素是否在视口内
function isInViewport(element, offset = 0) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= -offset &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}