document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("detailModal");
  const imageContainer = document.getElementById("imageContainer");
  const captionText = document.getElementById("caption");
  const closeModal = document.querySelector(".close-modal");

  // Modal image viewer
  document.querySelectorAll(".view-detail-btn").forEach(btn => {
    btn.addEventListener('click', function() {
      const srcList = this.getAttribute('data-src').split(',');
      const title = this.getAttribute('data-title');
      
      modal.style.display = "block";
      captionText.innerHTML = title;
      document.body.style.overflow = "hidden";

      imageContainer.innerHTML = "";
      srcList.forEach(src => {
        const img = document.createElement("img");
        img.src = src.trim();
        img.className = "modal-content";
        img.setAttribute("draggable", "false");
        img.style.cssText = "width: 100%; border-radius: 2px; border: 2px solid rgba(255,255,255,0.1); background: #fff; object-fit: contain; pointer-events: none;";
        imageContainer.appendChild(img);
      });
    });
  });

  const closeFunc = () => { 
    modal.style.display = "none"; 
    imageContainer.innerHTML = ""; 
    document.body.style.overflow = "auto"; 
  };

  closeModal.addEventListener('click', closeFunc);
  window.addEventListener('click', (e) => { if (e.target == modal) closeFunc(); });

  // Keyboard support: ESC to close modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
      closeFunc();
    }
  });

  // Smooth reveal animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Apply fade-in to sections
  document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(15px)';
    section.style.transition = `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s`;
    observer.observe(section);
  });
});
