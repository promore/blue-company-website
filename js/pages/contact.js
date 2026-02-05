/**
 * 联系我们页脚本 - contact.js
 * 处理联系表单提交
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 获取表单数据
            const formData = {
                name: document.getElementById('name').value,
                phone: document.getElementById('phone').value,
                email: document.getElementById('email').value,
                service: document.getElementById('service').value,
                message: document.getElementById('message').value
            };

            // 表单验证
            if (!formData.name || !formData.phone || !formData.service) {
                alert('请填写必填项！');
                return;
            }

            // 模拟提交
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = '提交中...';
            submitBtn.disabled = true;

            // 模拟API调用延迟
            setTimeout(() => {
                console.log('表单数据:', formData);
                alert('感谢您的咨询！我们会尽快与您联系。');
                contactForm.reset();
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});