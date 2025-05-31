// Navigation active state handler
document.addEventListener('DOMContentLoaded', function() {
    // Function to update active navigation
    function updateActiveNav() {
        // Get all sections and nav links
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        // Get current scroll position
        const scrollPosition = window.scrollY + 100; // Add offset for header
        
        // Check which section is in viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Add active class to corresponding nav link
                const activeLink = document.querySelector(`nav a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Update active nav on scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Update active nav on page load
    updateActiveNav();
    
    // Update active nav when clicking a link
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');
        });
    });
});

// Modal functionality 
function openHireModal() {
    document.getElementById('hireModal').style.display = 'block';
}

// Close modal when clicking X
document.querySelector('.close').onclick = function() {
    document.getElementById('hireModal').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('hireModal');
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Create hamburger menu
    const hamburger = document.createElement('div');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<span></span><span></span><span></span>';
    header.appendChild(hamburger);
    
    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        nav.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!header.contains(e.target)) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});

// Achievement Section - Glassmorphism Cards Click to Flip
document.addEventListener('DOMContentLoaded', function() {
    const glassCards = document.querySelectorAll('.glass-card');
    
    // Add staggered entrance animation
    glassCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.style.animation = 'slideInUp 0.8s ease forwards';
    });
    
    // Function to handle card flip
    function flipCard(card) {
        // Toggle flipped class - this allows flip back when clicked again
        card.classList.toggle('flipped');
        
        // Check scroll after flip animation
        if (card.classList.contains('flipped')) {
            setTimeout(() => {
                checkScroll(card);
            }, 800);
        }
    }
    
    // Click to flip functionality for desktop
    glassCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't flip if clicking on scrollable content
            if (e.target.closest('.card-content')) {
                return;
            }
            
            flipCard(this);
        });
    });
    
    // Touch handler for mobile devices
    glassCards.forEach(card => {
        let touchStartTime = 0;
        let touchEndTime = 0;
        let touchStartX = 0;
        let touchStartY = 0;
        
        card.addEventListener('touchstart', function(e) {
            touchStartTime = new Date().getTime();
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        }, { passive: true });
        
        card.addEventListener('touchend', function(e) {
            touchEndTime = new Date().getTime();
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            
            // Calculate touch distance
            const touchDistanceX = Math.abs(touchEndX - touchStartX);
            const touchDistanceY = Math.abs(touchEndY - touchStartY);
            
            // Check if it's a tap (not a swipe or long press)
            if (touchEndTime - touchStartTime < 500 && touchDistanceX < 30 && touchDistanceY < 30) {
                // Don't flip if touching scrollable content
                if (e.target.closest('.card-content')) {
                    return;
                }
                
                // Prevent any default behavior
                e.preventDefault();
                
                // Flip the card
                flipCard(this);
            }
        });
    });
    
    // Check if content is scrollable and add indicator
    function checkScroll(card) {
        const cardContent = card.querySelector('.card-content');
        const cardBack = card.querySelector('.card-back');
        
        if (cardContent && cardBack) {
            if (cardContent.scrollHeight > cardContent.clientHeight) {
                cardBack.classList.add('has-scroll');
            } else {
                cardBack.classList.remove('has-scroll');
            }
        }
    }
    
    // Prevent accidental flips when scrolling
    document.querySelectorAll('.card-content').forEach(content => {
        // Prevent touch events from bubbling up
        ['touchstart', 'touchend', 'touchmove', 'click'].forEach(eventType => {
            content.addEventListener(eventType, function(e) {
                e.stopPropagation();
            });
        });
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        glassCards.forEach(card => {
            if (card.classList.contains('flipped')) {
                checkScroll(card);
            }
        });
    });
});

// Add entrance animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Add iOS specific fixes
if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.querySelectorAll('.card-inner').forEach(inner => {
        inner.style.webkitTransformStyle = 'preserve-3d';
        inner.style.webkitTransition = '-webkit-transform 0.8s';
    });
    
    document.querySelectorAll('.card-front, .card-back').forEach(face => {
        face.style.webkitBackfaceVisibility = 'hidden';
    });
}

// NEW CODE ADDITIONS START HERE

// Typing animation
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-text span');
    const words = ["Software Developer", "Backend Developer", "Gen AI Developer", "Cybersecurity Analyst", "Cloud Enthusiast"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeWords() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Pause before new word
        }

        setTimeout(typeWords, typingSpeed);
    }

    // Start typing animation
    typeWords();
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        // Skip if it's just "#" (logo) or empty
        if (href === '#' || !href) {
            e.preventDefault();
            // Scroll to top for logo click
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        // Handle normal anchor links
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animate skill bars when they come into view
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
};

const skillObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-progress');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// Hide loader when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1000); // Show loader for at least 1 second
});

// Alternative: Hide loader when all resources are loaded
window.addEventListener('load', function() {
    setTimeout(function() {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.classList.add('hidden');
        }
    }, 1500); // Adjust timing as needed
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide scroll to top button
window.addEventListener('scroll', function() {
    const scrollTop = document.querySelector('.scroll-top');
    if (scrollTop) {
        if (window.pageYOffset > 300) {
            scrollTop.classList.add('active');
        } else {
            scrollTop.classList.remove('active');
        }
    }
});

// Section visibility animation
const sections = document.querySelectorAll('section');
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    },
    { threshold: 0.1 }
);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Set current year in footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});