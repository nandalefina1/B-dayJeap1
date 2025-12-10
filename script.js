document.addEventListener('DOMContentLoaded', () => {
    const music = document.getElementById('bday-music');
    const card = document.getElementById('birthday-card');
    
    // Flag untuk melacak apakah musik sudah dicoba putar oleh script (Mencegah pemanggilan berulang)
    let attemptedPlay = false;

    // --- 1. Fungsionalitas 3D Card Flip ---
    card.addEventListener('click', () => {
        card.classList.toggle('flipped'); 
        
        const playBtn = document.getElementById('play-btn');
        if (playBtn) {
             // Tampilkan/sembunyikan tombol saat kartu terbalik
             // Sembunyikan tombol play jika kartu terbalik, asumsikan tombol ada di card
             playBtn.style.display = card.classList.contains('flipped') ? 'none' : 'block';
        }
    });

    // --- 2. Fungsionalitas Play/Pause Musik ---
    
    // Fungsi untuk membuat dan menampilkan tombol putar musik jika autoplay gagal
    function showPlayButton() {
        if (!document.getElementById('play-btn')) { 
            const playButton = document.createElement('button');
            playButton.id = 'play-btn';
            playButton.className = 'play-button';
            playButton.textContent = '🔊 Klik untuk Putar Lagu Bahagia!';
            
            // Tambahkan styling dasar untuk tombol
            playButton.style.cssText = `
                margin-top: 20px;
                padding: 10px 20px;
                cursor: pointer;
                background-color: #ff007f;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 1.1em;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                transition: all 0.3s;
            `;
            
            // Efek hover
            playButton.onmouseover = () => playButton.style.backgroundColor = '#ff45a0';
            playButton.onmouseout = () => playButton.style.backgroundColor = '#ff007f';

            playButton.onclick = () => {
                music.play();
                playButton.textContent = '🎶 Musik Berjalan! 🥳';
                // Hapus tombol setelah 3 detik
                setTimeout(() => playButton.remove(), 3000); 
            };
            card.appendChild(playButton);
        }
    }
    
    // Fungsi utama untuk mencoba memutar musik
    function tryToPlayMusic() {
        // Hentikan jika sudah pernah dicoba putar oleh script
        if (attemptedPlay) return; 
        attemptedPlay = true;

        // Coba putar. Akan gagal jika diblokir oleh browser.
        music.play().catch(error => {
            console.error("Autoplay diblokir:", error);
            showPlayButton(); // Tampilkan tombol manual jika gagal
        });
    }

    // LISTENER PERBAIKAN: Gunakan fungsi berlabel untuk bisa dihapus (mencegah loop)
    const musicReadyHandler = () => {
        tryToPlayMusic();
        // Hapus listener setelah sukses dipanggil agar tidak ada pemanggilan berulang
        music.removeEventListener('canplaythrough', musicReadyHandler); 
    };

    // Tambahkan event listener cadangan
    music.addEventListener('canplaythrough', musicReadyHandler);

    // Coba putar segera saat DOM dimuat
    tryToPlayMusic();
});
