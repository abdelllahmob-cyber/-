// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Mobile hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            const top = target.getBoundingClientRect().top + window.pageYOffset - 80;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// Scroll-triggered animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll(
        '.service-card, .step, .feature-item, .pricing-card, .visual-card'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-visible');
                    entry.target.classList.remove('animate-hidden');
                }, i * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    elements.forEach(el => {
        el.classList.add('animate-hidden');
        observer.observe(el);
    });
};

animateOnScroll();

// Active nav link highlight on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(section => {
        const top = section.offsetTop - 100;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (!link) return;
        if (scrollY >= top && scrollY < top + height) {
            link.style.color = 'var(--primary)';
            link.style.fontWeight = '700';
        } else {
            link.style.color = '';
            link.style.fontWeight = '';
        }
    });
});

// Animate WhatsApp messages loop
const animateMessages = () => {
    const msgs = document.querySelectorAll('.wp-msg');
    msgs.forEach(msg => {
        msg.style.opacity = '0';
        msg.style.animation = 'none';
    });
    setTimeout(() => {
        msgs.forEach(msg => {
            msg.style.animation = '';
        });
    }, 100);
};

// Re-animate WhatsApp messages every 8 seconds
setInterval(animateMessages, 8000);

// Chart bars hover interactivity
document.querySelectorAll('.chart-bar').forEach(bar => {
    bar.addEventListener('mouseenter', function () {
        document.querySelectorAll('.chart-bar').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// HLS Video Players (Bunny.net streams)
const initHLS = (videoId, src) => {
    const video = document.getElementById(videoId);
    if (!video) return;

    if (typeof Hls !== 'undefined' && Hls.isSupported()) {
        const hls = new Hls({
            startLevel: -1,
            enableWorker: false,
            xhrSetup: (xhr) => { xhr.withCredentials = false; }
        });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
            video.closest('.video-player-wrap, .video-glow-inner')
                ?.classList.add('video-ready');
        });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = src;
        video.load();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    initHLS(
        'site-demo-video',
        'https://vz-8d74ca40-f55.b-cdn.net/3383f005-7a67-40e0-9b9a-594be2924a05/playlist.m3u8'
    );
    initHLS(
        'results-video',
        'https://vz-8d74ca40-f55.b-cdn.net/ee2094b0-c5e8-492b-ba4c-b85438849d98/playlist.m3u8'
    );
});
