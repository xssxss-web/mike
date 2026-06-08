/* ==========================================
   MIKEOK GLOBAL HEADER & FOOTER LOADER
   Version 1.0
========================================== */

document.addEventListener('DOMContentLoaded', function () {

    /* ---------- HEADER ---------- */

    fetch('/includes/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-container').innerHTML = data;
        });

    /* ---------- FOOTER ---------- */

    fetch('/includes/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-container').innerHTML = data;
        });

});