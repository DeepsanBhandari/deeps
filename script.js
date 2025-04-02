
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const header = document.querySelector('.header');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const themeToggle = document.querySelector('.theme-toggle');
    const skillBars = document.querySelectorAll('.skill-progress');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const typingText = document.getElementById('typing-text');
    const contactForm = document.getElementById('contactForm');
  
    // Typing Animation Function
    const roles = ['Java Developer', 'Full-Stack Developer', 'Software Engineer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
  
    function typeText() {
      const currentRole = roles[roleIndex];
      
      if (isDeleting) {
        // Deleting text
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        // Typing text
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }
  
      // If finished typing the word
      if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 1000; // Pause at the end
      }
  
      // If finished deleting the word
      if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
  
      setTimeout(typeText, typingSpeed);
    }
  
    // Start typing animation
    typeText();
  
    // Mobile Menu Toggle
    hamburger.addEventListener('click', function() {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });
  
    // Close mobile menu when a link is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  
    // Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId !== '#') {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth'
            });
          }
        }
      });
    });
  
    // Header Scroll Effect
    window.addEventListener('scroll', function() {
      if (window.scrollY > 100) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  
    // Active Navigation Link on Scroll
    function setActiveNavLink() {
      let current = '';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
          current = section.getAttribute('id');
        }
      });
      
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }
  
    // Scroll to Top Button Visibility
    function toggleScrollTopBtn() {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('active');
      } else {
        scrollTopBtn.classList.remove('active');
      }
    }
  
    // Scroll to Top Functionality
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  
    // Animate Skill Bars on Scroll
    const animateSkillBars = () => {
      skillBars.forEach(bar => {
        const barPosition = bar.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        
        if (barPosition < screenPosition) {
          const progress = bar.getAttribute('data-progress');
          bar.style.width = `${progress}%`;
        }
      });
    };
  
    // Theme Toggle Functionality
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      
      // Save theme preference to localStorage
      if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
    });
  
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  
    // Handle Contact Form Submission
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Simulate form submission (in a real app, you'd send this to a server)
        console.log('Form submitted:', { name, email, subject, message });
        
        // Show a success message
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Message Sent!';
        submitBtn.classList.add('success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.classList.remove('success');
        }, 3000);
      });
    }
  
    // Fade-in animation for elements when they enter the viewport
    const fadeInElements = document.querySelectorAll('.section-header, .about-content, .skills-content, .certificates-content, .project-card, .contact-content');
  
    const fadeInOnScroll = () => {
      fadeInElements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }
      });
    };
  
    // Initialize fade-in elements
    fadeInElements.forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
  
    // Add scroll event listeners
    window.addEventListener('scroll', function() {
      setActiveNavLink();
      toggleScrollTopBtn();
      animateSkillBars();
      fadeInOnScroll();
    });
  
    // Call these functions once on page load
    setActiveNavLink();
    toggleScrollTopBtn();
    animateSkillBars();
    fadeInOnScroll();
  });
  