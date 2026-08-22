document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("detailModal");
  const imageContainer = document.getElementById("imageContainer");
  const captionText = document.getElementById("caption");
  const closeModal = document.querySelector(".close-modal");

  document.querySelectorAll(".view-detail-btn").forEach(btn => {
    btn.addEventListener('click', function() {
      const srcList = this.getAttribute('data-src').split(',');
      const title = this.getAttribute('data-title');
      
      modal.style.display = "block";
      captionText.innerHTML = title;
      document.body.style.overflow = "hidden";

      // Xóa nội dung ảnh cũ và load các trang mới vào
      imageContainer.innerHTML = "";
      srcList.forEach(src => {
        const img = document.createElement("img");
        img.src = src.trim();
        img.className = "modal-content";
        img.setAttribute("draggable", "false");
        img.style.cssText = "width: 100%; border-radius: 6px; border: 2px solid #fff; background: #fff; object-fit: contain; pointer-events: none;";
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
});