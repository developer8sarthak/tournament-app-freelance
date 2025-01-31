// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    initializeDropdowns();
    initializeAnimations();
    initializeNavigation();
    updateMatchTimes();
});

// Dropdown functionality
function initializeDropdowns() {
    document.querySelectorAll('.dropdown-trigger').forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            const target = document.querySelector(trigger.dataset.target);
            if (!target) return;

            // Close other dropdowns
            document.querySelectorAll('.dropdown-content.active').forEach(dropdown => {
                if (dropdown !== target) {
                    dropdown.classList.remove('active');
                    dropdown.style.maxHeight = '0px';
                }
            });

            // Toggle current dropdown
            target.classList.toggle('active');
            if (target.classList.contains('active')) {
                target.style.maxHeight = target.scrollHeight + 'px';
            } else {
                target.style.maxHeight = '0px';
            }
        });
    });
}

// Smooth animations
function initializeAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.card').forEach(card => {
        observer.observe(card);
    });
}

// Navigation handling
function initializeNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const href = item.getAttribute('href');
            
            // Add transition animation
            document.body.style.opacity = '0';
            
            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
}

// Pull-to-refresh functionality
let touchStart = 0;
let touchEnd = 0;

document.addEventListener('touchstart', (e) => {
    touchStart = e.touches[0].clientY;
});

document.addEventListener('touchmove', (e) => {
    touchEnd = e.touches[0].clientY;
});

document.addEventListener('touchend', () => {
    if (touchStart - touchEnd > 150 && window.scrollY === 0) {
        location.reload();
    }
});

setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    slides.style.transform = `translateX(-${currentIndex * 100}%)`;
}, 3000);

function toggleDropdown(id) {
    var dropdown = document.getElementById(id);
    if (dropdown.style.display === "none" || dropdown.style.display === "") {
        dropdown.style.display = "block";
    } else {
        dropdown.style.display = "none";
    }
}

// Function to update match times
function updateMatchTimes() {
    const times = JSON.parse(localStorage.getItem('matchTimes') || '{}');
    
    document.querySelectorAll('.match-time').forEach(element => {
        const mode = element.dataset.mode;
        if (times[mode]) {
            // Convert 24-hour time to 12-hour format
            const [hours, minutes] = times[mode].split(':');
            const period = hours >= 12 ? 'PM' : 'AM';
            const displayHours = hours % 12 || 12;
            element.textContent = `${displayHours}:${minutes} ${period}`;
        }
    });
}