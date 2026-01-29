document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById("certModal");
    const imgCert = document.getElementById("imgCert");
    const pdfCert = document.getElementById("pdfCert");
    const captionText = document.getElementById("caption");
    const closeModal = document.querySelector(".close-modal");
    // Lấy lớp phủ nếu Đệ có đặt trong HTML
    const overlay = document.querySelector(".no-download-overlay");

    // 1. Xử lý mở Modal và giải phóng tương tác
    document.querySelectorAll(".view-cert").forEach(link => {
        link.addEventListener('click', function() {
            const src = this.getAttribute('data-src');
            const title = this.getAttribute('data-title');
            
            modal.style.display = "block";
            captionText.innerHTML = title;
            
            // Khóa cuộn trang nền để trình duyệt tập trung vào khung Modal
            document.body.style.overflow = "hidden";

            // Vô hiệu hóa lớp phủ chặn tương tác (nếu có) để chuột có thể chạm vào PDF/Ảnh
            if (overlay) overlay.style.pointerEvents = "none";

            if (src.toLowerCase().endsWith('.pdf')) {
                imgCert.style.display = "none";
                pdfCert.style.display = "block";
                // Bật scrollbar và căn lề tự động để dễ kéo
                pdfCert.src = src + "#toolbar=0&navpanes=0&scrollbar=1&view=FitH";
                pdfCert.style.pointerEvents = "auto";
            } else {
                pdfCert.style.display = "none";
                imgCert.style.display = "block";
                imgCert.src = src;
                imgCert.style.pointerEvents = "auto";
            }
        });
    });

    // 2. Logic đóng Modal
    const closeFunc = () => { 
        modal.style.display = "none"; 
        pdfCert.src = ""; 
        document.body.style.overflow = "auto"; // Trả lại quyền cuộn trang chính
    };

    closeModal.addEventListener('click', closeFunc);
    window.addEventListener('click', (e) => { if (e.target == modal) closeFunc(); });

    // 3. BẢO MẬT MỀM (Chặn chuột phải, cho phép chuột trái và cuộn)
    // Huynh chỉ chặn menu ngữ cảnh (chuột phải)
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    }, false);
    
    // Chặn các phím tắt tải xuống nhưng không chặn phím mũi tên điều hướng
    document.addEventListener('keydown', (e) => {
        if (e.key === "F12") e.preventDefault();
        if (e.ctrlKey && ['s', 'u', 'p'].includes(e.key.toLowerCase())) {
            e.preventDefault();
        }
    }, false);
});