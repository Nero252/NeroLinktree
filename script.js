document.addEventListener("DOMContentLoaded", () => {
  const linkButtons = document.querySelectorAll(".link-btn");

  // Deteksi apakah perangkat pengguna adalah Mobile / Tablet
  const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

  linkButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();

      const webUrl = btn.getAttribute("data-web");
      const appUri = btn.getAttribute("data-app");

      if (!isMobile) {
        // PERANGKAT DESKTOP / PC: Langsung buka link Web di tab baru
        window.open(webUrl, "_blank");
        return;
      }

      // PERANGKAT MOBILE / TABLET:
      // Coba buka aplikasi native lewat URI scheme
      let appOpened = false;

      // Listener untuk mengetahui apakah browser kehilangan fokus (berhasil pindah ke aplikasi)
      const handleBlur = () => {
        appOpened = true;
      };

      window.addEventListener("blur", handleBlur);

      const startTime = Date.now();
      window.location.href = appUri;

      // Fallback: Jika dalam 1.5 detik aplikasi tidak terbuka, buka link web
      setTimeout(() => {
        window.removeEventListener("blur", handleBlur);

        // Jika browser tidak kehilangan fokus dan selisih waktu wajar (aplikasi tidak ada)
        if (!appOpened && Date.now() - startTime < 2000) {
          window.open(webUrl, "_blank");
        }
      }, 1500);
    });
  });
});