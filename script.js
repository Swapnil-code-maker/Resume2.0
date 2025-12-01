document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Visitor Counter
    const viewDisplay = document.getElementById('view-count');
    fetch('https://api.countapi.xyz/hit/swapnil-vit-portfolio/visits')
        .then(response => response.json())
        .then(data => {
            if(viewDisplay) viewDisplay.innerText = data.value;
        })
        .catch(err => {
            if(viewDisplay) viewDisplay.innerText = "125+"; 
        });

    // 2. Typing Effect (Backend Engineer)
    const textElement = document.querySelector('.typing-text');
    const texts = ['Backend Developer', 'Java Specialist', 'Software Engineer'];
    let count = 0;
    let index = 0;
    let currentText = '';
    let letter = '';

    (function type() {
        if (!textElement) return;
        if (count === texts.length) { count = 0; }
        currentText = texts[count];
        letter = currentText.slice(0, ++index);
        
        textElement.textContent = letter;
        if (letter.length === currentText.length) {
            count++;
            index = 0;
            setTimeout(type, 2000);
        } else {
            setTimeout(type, 100);
        }
    })();

    // 3. Scroll Reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    });

    document.querySelectorAll('.scroll-reveal').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // 4. Modal
    const modal = document.getElementById('projectModal');
    const closeBtn = document.querySelector('.close-modal');
    const titleEl = document.getElementById('modalTitle');
    const detailsEl = document.getElementById('modalDetails');

    document.querySelectorAll('.details-link').forEach(btn => {
        btn.addEventListener('click', () => {
            titleEl.textContent = btn.getAttribute('data-title');
            detailsEl.textContent = btn.getAttribute('data-details');
            modal.classList.add('active');
        });
    });

    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    if(modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.remove('active');
        });
    }
});