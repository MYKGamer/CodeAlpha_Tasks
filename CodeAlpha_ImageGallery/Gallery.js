// Sare elements select kar lete hain
const galleryItems = document.querySelectorAll('.image-card');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const btns = document.querySelectorAll('.btn');

let currentIndex = 0; // Current image track karne ke liye
let currentImagesList = []; // Filtered list store karne ke liye

// 1. FILTER FUNCTIONALITY
function filterImages(category) {
 
    btns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase() === category || (category === 'all' && btn.innerText === 'All')) {
            btn.classList.add('active');
        }
    });

    // Images ko hide/show karna
    galleryItems.forEach(item => {
        if (category === 'all' || item.getAttribute('data-category') === category) {
            item.classList.remove('hide');
        } else {
            item.classList.add('hide');
        }
    });
}

// 2. LIGHTBOX FUNCTIONALITY


galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => {
      
        currentImagesList = Array.from(document.querySelectorAll('.image-card:not(.hide)'));
        
       
        currentIndex = currentImagesList.indexOf(item);
        
        openLightbox(currentImagesList[currentIndex]);
    });
});

function openLightbox(element) {
    lightbox.style.display = "block";
    const img = element.querySelector('img');
    lightboxImg.src = img.src;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

// 3. NEXT / PREV BUTTONS
function changeSlide(n) {
    currentIndex += n;

  
    if (currentIndex >= currentImagesList.length) {
        currentIndex = 0;
    }
  
    if (currentIndex < 0) {
        currentIndex = currentImagesList.length - 1;
    }


    const newElement = currentImagesList[currentIndex];
    const newImg = newElement.querySelector('img');
    lightboxImg.src = newImg.src;
}

// Keyboard navigation 
document.addEventListener('keydown', function(event) {
    if (lightbox.style.display === "block") {
        if (event.key === "ArrowLeft") {
            changeSlide(-1);
        } else if (event.key === "ArrowRight") {
            changeSlide(1);
        } else if (event.key === "Escape") {
            closeLightbox();
        }
    }
});