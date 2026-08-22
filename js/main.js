document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById("detailModal");
  const imgViewer = document.getElementById("imgViewer");
  const pdfViewer = document.getElementById("pdfViewer");
  const captionText = document.getElementById("caption");
  const closeModal = document.querySelector(".close-modal");

  document.querySelectorAll(".view-detail-btn").forEach(btn => {
    btn.addEventListener('click', function() {
      const src = this.getAttribute('data-src');
      const title = this.getAttribute('data-title');
      
      modal.style.display = "block";
      captionText.innerHTML = title;
      document.body.style.overflow = "hidden";

      if (src.toLowerCase().endsWith('.pdf')) {
        imgViewer.style.display = "none";
        pdfViewer.style.display = "block";
        pdfViewer.src = src + "#toolbar=0&navpanes=0&scrollbar=1&view=FitH";
      } else {
        pdfViewer.style.display = "none";
        imgViewer.style.display = "block";
        imgViewer.src = src;
      }
    });
  });

  const closeFunc = () => { 
    modal.style.display = "none"; 
    pdfViewer.src = ""; 
    document.body.style.overflow = "auto"; 
  };

  closeModal.addEventListener('click', closeFunc);
  window.addEventListener('click', (e) => { if (e.target == modal) closeFunc(); });
});