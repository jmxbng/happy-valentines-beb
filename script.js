function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const lock = document.getElementById('lock-screen');
    const envelope = document.getElementById('envelope-overlay');
    const errorMsg = document.getElementById('error-msg');

    const correctDate = "08/15/21";
    const correctWord = "forever";

    // Reset error state only (para sa wrong attempts)
    errorMsg.style.display = 'none';

    if (input === correctDate || input.toLowerCase() === correctWord) {
        lock.style.opacity = "0";
        setTimeout(() => {
            lock.style.display = 'none';
            envelope.style.display = 'flex';
        }, 600);
        return;
    }

    // Custom error messages with proper order
    let errorText = "Sa kabet mo yan baliw...";

    if (input === "") {
        errorText = "sagutin mo muna to";
    }
    else if (/[a-zA-Z]/.test(input) && !/[0-9]/.test(input)) {
        // puro letters lang (walang number)
        errorText = "number ngaaaa";
    }
    else if (/[a-zA-Z]/.test(input) && /[0-9]/.test(input)) {
        // may letters at numbers (mix)
        errorText = "jusko be number nga lang";
    }
    else if (!input.includes("/")) {
        // may number pero walang slash
        errorText = "bobo lagyan mo ng backslash";
    }
    else if (/^[0-9/]+$/.test(input)) {
        // may slash + puro number/slash → date format pero mali
        errorText = "baliw sa kabet mo yan";
    }

    errorMsg.textContent = errorText;
    errorMsg.style.display = 'block';

    // Shake animation para sa error lang
    const card = document.querySelector('.glass-card');
    card.style.animation = 'shake 0.4s';
    setTimeout(() => {
        card.style.animation = '';
    }, 400);
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password-input');

togglePassword.addEventListener('click', function () {
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    
    this.style.opacity = type === 'password' ? '0.5' : '1';
});

function openEnvelope() {
    const envelope = document.getElementById('main-envelope');
    const overlay = document.getElementById('envelope-overlay');
    const content = document.getElementById('main-content-wrapper');

    envelope.classList.add('open');
    setTimeout(() => {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            content.style.display = "block";
            setInterval(createHeart, 400);

            // Start music pag binuksan na yung envelope
            const music = document.getElementById('bg-music');
            if (music) {
                music.currentTime = 40; // binago mo na sa 40 seconds
                music.volume = 0.25;
                music.play().catch(e => console.log("Play error:", e));
            }
        }, 800);
    }, 700);
}

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.moment').forEach(m => observer.observe(m));

function createHeart() {
    const heart = document.createElement('div');
    heart.innerHTML = '❤';
    heart.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        bottom: -20px;
        color: #9e001c;
        font-size: ${Math.random() * 20 + 10}px;
        z-index: 1000;
        pointer-events: none;
        filter: drop-shadow(0 0 5px rgba(158, 0, 28, 0.5));
        animation: floatUp 5s linear forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 5000);
}

const message = "Every second by your side is a memory I’ll keep forever. Thank you for being my quiet peace, my loudest joy, and my entire world. I promise to love you more today than yesterday. You are the greatest gift life has ever given me, and I am so lucky to call you mine. No matter where life takes us, my heart will always find its way back to you. You are my beginning, my middle, and my forever.";
let index = 0;
let hasTyped = false;

function typeWriter() {
    if (index < message.length) {
        document.getElementById("typing-text").innerHTML += message.charAt(index);
        index++;
        setTimeout(typeWriter, 35);
    }
}

const typingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasTyped) {
            hasTyped = true;
            typeWriter();
        }
    });
}, { threshold: 0.5 });

document.addEventListener("DOMContentLoaded", () => {
    const target = document.getElementById("typing-container");
    if (target) typingObserver.observe(target);

    // Music toggle button (kung may button ka sa HTML na id="music-toggle")
    const toggleBtn = document.getElementById('music-toggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            const music = document.getElementById('bg-music');
            if (music) {
                if (music.paused) {
                    music.play().catch(e => console.log("Resume failed:", e));
                    this.textContent = '🎵 On';
                } else {
                    music.pause();
                    this.textContent = '🎵 Mute';
                }
            }
        });
    }

    // Visibility change para mag-resume pag bumalik sa tab/page (mobile fix)
    document.addEventListener("visibilitychange", () => {
        const music = document.getElementById('bg-music');
        if (music) {
            if (document.visibilityState === "visible" && music.paused && music.currentTime > 0) {
                music.play().catch(e => console.log("Auto-resume failed:", e));
            }
        }
    });

    // Extra safety: Try resume pag scroll o touch (para hindi tumigil sa phone)
    window.addEventListener('scroll', () => {
        const music = document.getElementById('bg-music');
        if (music && music.paused && music.currentTime > 0) {
            music.play().catch(() => {});
        }
    }, { passive: true });

    document.addEventListener('touchstart', () => {
        const music = document.getElementById('bg-music');
        if (music && music.paused) {
            music.play().catch(() => {});
        }
    }, { once: true });
});

const styleSheet = document.createElement('style');
styleSheet.innerHTML = `@keyframes floatUp {
    0% { transform: translateY(0) rotate(0); opacity: 1; }
    100% { transform: translateY(-110vh) rotate(360deg); opacity: 0; }
}`;
document.head.appendChild(styleSheet);
