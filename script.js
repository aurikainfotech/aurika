 // Mobile Menu Toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            });
        });
        
        // Portfolio Filter
        function filterProjects(category) {
            const filterButtons = document.querySelectorAll('.filter-btn');
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-purple-600', 'text-white'));
            filterButtons.forEach(btn => {
                if (btn.textContent.toLowerCase() === category || (category === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('active', 'bg-purple-600', 'text-white');
                }
            });
            
            const projects = document.querySelectorAll('.project-item');
            projects.forEach(project => {
                if (category === 'all' || project.dataset.category === category) {
                    project.style.display = 'block';
                } else {
                    project.style.display = 'none';
                }
            });
        }
        
        // Form Submission
        const contactForm = document.getElementById('contact-form');
        const formSuccess = document.getElementById('form-success');
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally send the form data to the server
            this.reset();
            formSuccess.classList.remove('hidden');
            setTimeout(() => {
                formSuccess.classList.add('hidden');
            }, 5000);
        });
        
        // Back to Top Button
        const backToTopButton = document.getElementById('back-to-top');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.remove('opacity-0', 'invisible');
                backToTopButton.classList.add('opacity-100', 'visible');
            } else {
                backToTopButton.classList.remove('opacity-100', 'visible');
                backToTopButton.classList.add('opacity-0', 'invisible');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Animated Counter
        const counters = document.querySelectorAll('.countup');
        const speed = 200;
        
        function startCounter() {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(startCounter, 1);
                } else {
                    counter.innerText = target;
                }
            });
        }
        
        // Start counter when section is in view
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.gradient-bg');
        if (statsSection) {
            observer.observe(statsSection);
        }
