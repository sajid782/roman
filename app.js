   // Intersection Observer for scroll animations
   const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all sections
document.querySelectorAll('.sajid-section').forEach(section => {
    observer.observe(section);
});


 // Mobile menu toggle
 const hamburger = document.querySelector('.hamburger');
 const navLinks = document.querySelector('.nav-links');
 const menuIcon = hamburger.querySelector('svg');

 hamburger.addEventListener('click', () => {
     navLinks.classList.toggle('active');
     if (navLinks.classList.contains('active')) {
         menuIcon.innerHTML = `
             <path d="M18 6L6 18M6 6l12 12"/>
         `;
     } else {
         menuIcon.innerHTML = `
             <path d="M3 12h18M3 6h18M3 18h18"/>
         `;
     }
 });

 // Form submission
 document.getElementById('contactForm').addEventListener('submit', (e) => {
     e.preventDefault();
     alert('Thank you for your message! We will get back to you soon.');
     e.target.reset();
 });

 // Header scroll effect
 let lastScroll = 0;
 window.addEventListener('scroll', () => {
     const currentScroll = window.pageYOffset;
     const header = document.querySelector('.header');
     
     if (currentScroll <= 0) {
         header.style.transform = 'translateY(0)';
         return;
     }
     
     if (currentScroll > lastScroll) {
         header.style.transform = 'translateY(-100%)';
     } else {
         header.style.transform = 'translateY(0)';
     }
     
     lastScroll = currentScroll;
 });

 



 const phone = document.querySelector('.phone');
 const container = document.querySelector('.phone-container');

 container.addEventListener('mousemove', (e) => {
     const { left, top, width, height } = container.getBoundingClientRect();
     const centerX = left + width / 2;
     const centerY = top + height / 2;
     const mouseX = e.clientX;
     const mouseY = e.clientY;

     const rotateY = ((mouseX - centerX) / width) * 20;
     const rotateX = ((centerY - mouseY) / height) * 20;

     phone.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
 });

 container.addEventListener('mouseleave', () => {
     phone.style.transform = 'rotateX(0) rotateY(0)';
 });

   // Add smooth scroll behavior
   document.querySelectorAll('a[href^="#"]').forEach(anchor => {
     anchor.addEventListener('click', function (e) {
         e.preventDefault();
         document.querySelector(this.getAttribute('href')).scrollIntoView({
             behavior: 'smooth'
         });
     });
 });

 // Optional: Add intersection observer for animation on scroll
 document.addEventListener('DOMContentLoaded', (event) => {
     const boxes = document.querySelectorAll('.thesis-box');
     
     const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.style.opacity = 1;
                 entry.target.style.transform = 'translateY(0)';
             }
         });
     }, {
         threshold: 0.1
     });

     boxes.forEach(box => {
         box.style.opacity = 0;
         box.style.transform = 'translateY(20px)';
         box.style.transition = 'all 0.5s ease-out';
         observer.observe(box);
     });
 });

 document.addEventListener('DOMContentLoaded', () => {
     const playButton = document.querySelector('.play-button');
     
     playButton.addEventListener('click', () => {
         // In a real implementation, you would trigger the video playback here
         alert('Video playback would start here!');
     });

     // Add animation to steps when they come into view
     const steps = document.querySelectorAll('.step');
     const options = {
         root: null,
         rootMargin: '0px',
         threshold: 0.1
     };

     const observer = new IntersectionObserver((entries, observer) => {
         entries.forEach(entry => {
             if (entry.isIntersecting) {
                 entry.target.style.opacity = '1';
                 entry.target.style.transform = 'translateY(0)';
                 observer.unobserve(entry.target);
             }
         });
     }, options);

     steps.forEach(step => {
         step.style.opacity = '0';
         step.style.transform = 'translateY(20px)';
         step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
         observer.observe(step);
     });
 });



   // Enhanced FAQ Functionality with smooth animations
   document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = question.classList.contains('active');
        
        // Smooth close other answers
        document.querySelectorAll('.faq-question').forEach(q => {
            if (q !== question) {
                q.classList.remove('active');
                q.nextElementSibling.classList.remove('active');
            }
        });

        // Toggle current answer with animation
        question.classList.toggle('active');
        answer.classList.toggle('active');

        // Add ripple effect
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.backgroundColor = 'rgba(0,123,255,0.2)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        question.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Enhanced Form Validation and Submission
const form = document.getElementById('contactForm');
const spinner = document.querySelector('.spinner');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Reset previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
        group.querySelector('.error-message').style.display = 'none';
    });

    // Validate fields
    let isValid = true;
    const fields = ['name', 'email', 'subject', 'message'];
    
    fields.forEach(field => {
        const input = document.getElementById(field);
        const group = input.parentElement;
        
        if (!input.value.trim()) {
            isValid = false;
            group.classList.add('error');
            group.querySelector('.error-message').style.display = 'block';
        }
        
        if (field === 'email' && !validateEmail(input.value)) {
            isValid = false;
            group.classList.add('error');
            group.querySelector('.error-message').style.display = 'block';
        }
    });

    if (!isValid) return;

    // Show loading state
    const button = form.querySelector('button');
    button.disabled = true;
    spinner.style.display = 'block';
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Show success message
    const successMessage = form.querySelector('.success-message');
    successMessage.style.display = 'block';
    
    // Reset form
    form.reset();
    
    // Reset button state
    button.disabled = false;
    spinner.style.display = 'none';
    
    // Hide success message after delay
    setTimeout(() => {
        successMessage.style.display = 'none';
    }, 3000);
});

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Input animations
document.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.classList.remove('focused');
    });
});

   // Fade in animation on scroll
   function revealElements() {
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

// Social icons hover effect
const socialIcons = document.querySelectorAll('.social-icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseover', function() {
        this.style.transform = 'translateY(-5px)';
    });
    
    icon.addEventListener('mouseout', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Initialize animations
window.addEventListener('scroll', revealElements);
window.addEventListener('load', revealElements);

// Add ripple effect to contact items
const contactItems = document.querySelectorAll('.contact-item');
contactItems.forEach(item => {
    item.addEventListener('click', function(e) {
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    });
});

  // WhatsApp button click handler
  document.querySelector('.whatsapp-btn').addEventListener('click', function() {
    // Replace with your WhatsApp number
    window.open('https://wa.me/1234567890', '_blank');
});

// Call button click handler
document.querySelector('.call-btn').addEventListener('click', function() {
    // Replace with your phone number
    window.location.href = 'tel:1234567890';
});

// Scroll to top functionality
const scrollBtn = document.querySelector('.scroll-top');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollBtn.classList.add('visible');
    } else {
        scrollBtn.classList.remove('visible');
    }
});

scrollBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

 // Animate progress bars on scroll
 function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.parentElement.dataset.progress || '90%';
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => observer.observe(bar));
}

// Smooth scroll animation for buttons
document.querySelectorAll('.contact-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const ripple = document.createElement('div');
        ripple.classList.add('ripple');
        this.appendChild(ripple);

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = `${size}px`;

        const x = e.clientX - rect.left - size/2;
        const y = e.clientY - rect.top - size/2;
        
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;

        setTimeout(() => ripple.remove(), 600);
    });
});

// Initialize animations
document.addEventListener('DOMContentLoaded', function() {
    animateProgressBars();
});

// Parallax effect for service image
document.addEventListener('mousemove', function(e) {
    const image = document.querySelector('.service-image');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    if (window.innerWidth > 992) {
        image.style.transform = `translate(${mouseX * 20}px, ${mouseY * 20}px)`;
    }
});

// Smooth scroll for mobile
if ('scrollBehavior' in document.documentElement.style) {
    document.addEventListener('touchstart', function() {}, true);
}



document.addEventListener('DOMContentLoaded', () => {
    // Right container expandable boxes
    const expandableBoxes = document.querySelectorAll('.faiz-expandable-box');
    expandableBoxes.forEach(box => {
        const header = box.querySelector('.faiz-expandable-header');
        header.addEventListener('click', () => {
            box.classList.toggle('faiz-active');
            const isExpanded = box.classList.contains('faiz-active');
            header.setAttribute('aria-expanded', isExpanded);
        });

        // Keyboard accessibility
        header.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
    });
});