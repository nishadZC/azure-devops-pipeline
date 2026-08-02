// =====================================================
//   CommuteShare — Premium JS with Animations
// =====================================================

/* ---- Particle System ---- */
(function initParticles() {
   const canvas = document.getElementById('particleCanvas');
   const ctx = canvas.getContext('2d');
   let particles = [];
   const PARTICLE_COUNT = 60;

   function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
   }

   class Particle {
      constructor() { this.reset(); }
      reset() {
         this.x = Math.random() * canvas.width;
         this.y = Math.random() * canvas.height;
         this.vx = (Math.random() - 0.5) * 0.4;
         this.vy = (Math.random() - 0.5) * 0.4;
         this.radius = Math.random() * 1.5 + 0.5;
         this.alpha = Math.random() * 0.5 + 0.1;
         this.color = Math.random() > 0.6
            ? `rgba(245,197,24,${this.alpha})`
            : `rgba(138,155,192,${this.alpha})`;
      }
      update() {
         this.x += this.vx;
         this.y += this.vy;
         if (this.x < 0 || this.x > canvas.width ||
             this.y < 0 || this.y > canvas.height) {
            this.reset();
         }
      }
      draw() {
         ctx.beginPath();
         ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
         ctx.fillStyle = this.color;
         ctx.fill();
      }
   }

   function connectParticles() {
      for (let i = 0; i < particles.length; i++) {
         for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
               const alpha = (1 - dist / 120) * 0.08;
               ctx.beginPath();
               ctx.strokeStyle = `rgba(245,197,24,${alpha})`;
               ctx.lineWidth = 0.5;
               ctx.moveTo(particles[i].x, particles[i].y);
               ctx.lineTo(particles[j].x, particles[j].y);
               ctx.stroke();
            }
         }
      }
   }

   function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => { p.update(); p.draw(); });
      connectParticles();
      requestAnimationFrame(animate);
   }

   resize();
   particles = Array.from({ length: PARTICLE_COUNT }, () => new Particle());
   animate();
   window.addEventListener('resize', resize);
})();


/* ---- Typewriter Effect ---- */
(function initTyped() {
   const words = ['Commute', 'Journey', 'Commute'];
   const el = document.getElementById('typedText');
   let wordIdx = 0, charIdx = 0, isDeleting = false;

   function type() {
      const current = words[wordIdx % words.length];
      if (isDeleting) {
         el.textContent = current.slice(0, charIdx--);
      } else {
         el.textContent = current.slice(0, charIdx++);
      }

      let delay = isDeleting ? 60 : 110;

      if (!isDeleting && charIdx > current.length) {
         delay = 1800;
         isDeleting = true;
      } else if (isDeleting && charIdx < 0) {
         isDeleting = false;
         wordIdx++;
         charIdx = 0;
         delay = 400;
      }

      setTimeout(type, delay);
   }
   setTimeout(type, 600);
})();


/* ---- Navbar Scroll Effect ---- */
(function initNavScroll() {
   const nav = document.getElementById('navbar');

   window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
         nav.classList.add('scrolled');
      } else {
         nav.classList.remove('scrolled');
      }
   }, { passive: true });
})();


/* ---- Hamburger Mobile Menu ---- */
(function initHamburger() {
   const hamburger = document.getElementById('hamburger');
   const mobileMenu = document.getElementById('mobileMenu');

   hamburger.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
   });

   // Close menu on link click
   document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
         mobileMenu.classList.remove('open');
      });
   });
})();


/* ---- Scroll Reveal ---- */
(function initReveal() {
   const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
         if (entry.isIntersecting) {
            // Stagger delay for siblings
            const siblings = entry.target.parentElement
               ? [...entry.target.parentElement.children].filter(el => el.classList.contains('reveal'))
               : [];
            const idx = siblings.indexOf(entry.target);
            const delay = idx >= 0 ? idx * 100 : 0;

            setTimeout(() => {
               entry.target.classList.add('visible');
            }, delay);

            observer.unobserve(entry.target);
         }
      });
   }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

   document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
})();


/* ---- Stats Counter Animation ---- */
(function initCounters() {
   const counters = document.querySelectorAll('.stat-number');

   const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
         if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseInt(el.dataset.target, 10);
            const duration = 1800;
            const step = target / (duration / 16);
            let current = 0;

            const tick = () => {
               current = Math.min(current + step, target);
               el.textContent = Math.floor(current);
               if (current < target) requestAnimationFrame(tick);
            };
            tick();
            counterObserver.unobserve(el);
         }
      });
   }, { threshold: 0.5 });

   counters.forEach(el => counterObserver.observe(el));
})();


/* ---- Hero CTA Button ---- */
document.getElementById('learnBtn').addEventListener('click', function () {
   document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});


/* ---- Card Interactive Shadow ---- */
document.querySelectorAll('.card').forEach(card => {
   card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      card.style.transform = `translateY(-8px) rotateX(${-y * 0.3}deg) rotateY(${x * 0.3}deg)`;
   });

   card.addEventListener('mouseleave', () => {
      card.style.transform = '';
   });
});


/* ---- Smooth Anchor Navigation ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         e.preventDefault();
         target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
   });
});


/* ---- Nav CTA smooth scroll ---- */
document.getElementById('navCta').addEventListener('click', function (e) {
   e.preventDefault();
   document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
});