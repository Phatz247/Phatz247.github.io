function showProductInfo(productId, imgSrc, title, price) {
  const img = document.getElementById("main-img-" + productId);
  img.style.opacity = 0.3;
  setTimeout(() => {
    img.src = imgSrc;
    img.style.opacity = 1;
  }, 150);
  document.getElementById("product-title-" + productId).textContent = title;
  document.getElementById(
    "product-price-" + productId
  ).innerHTML = `<span class="new-price">${price}</span>`;
}

// Banner Carousel Script
document.addEventListener("DOMContentLoaded", function () {
  const carouselTrack = document.querySelector(".carousel-track");
  const images = document.querySelectorAll(".carousel-img");
  const dotsContainer = document.querySelector(".carousel-dots");
  const prevBtn = document.querySelector(".carousel-btn.prev");
  const nextBtn = document.querySelector(".carousel-btn.next");
  let currentSlide = 0;
  let slideInterval;

  // Create dots dynamically if not already present
  if (dotsContainer && dotsContainer.children.length === 0) {
    images.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.classList.add("dot");
      dot.dataset.slide = index;
      dotsContainer.appendChild(dot);
    });
  }
  const dots = document.querySelectorAll(".carousel-dots .dot");

  function showSlide(index) {
    if (index >= images.length) {
      currentSlide = 0;
    } else if (index < 0) {
      currentSlide = images.length - 1;
    } else {
      currentSlide = index;
    }

    carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;

    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === currentSlide);
    });
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
  }

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 4000); // Change slide every 4 seconds
  }

  function stopAutoSlide() {
    clearInterval(slideInterval);
  }

  // Event Listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    stopAutoSlide();
    startAutoSlide(); // Restart timer after manual interaction
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    stopAutoSlide();
    startAutoSlide(); // Restart timer after manual interaction
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const slideIndex = parseInt(e.target.dataset.slide);
      showSlide(slideIndex);
      stopAutoSlide();
      startAutoSlide(); // Restart timer after manual interaction
    });
  });

  // Initial display and start auto-slide
  showSlide(currentSlide);
  startAutoSlide();
});

// Hiển thị tên người dùng nếu đã đăng nhập
document.addEventListener("DOMContentLoaded", function () {
  const loggedInUser = localStorage.getItem("loggedInUser");
  // Find the account link in the new header structure
  const accountLink = document
    .querySelector(".header-icon-item i.fa-user")
    .closest(".header-icon-item");

  if (loggedInUser) {
    if (accountLink) {
      accountLink.querySelector("span").textContent = loggedInUser;
      // You might want to change the icon or add a dropdown for logout here
      // For simplicity, we'll just change the text.
    }

    // Add a logout option to the account link's functionality
    if (accountLink) {
      accountLink.addEventListener("click", function (e) {
        e.preventDefault(); // Prevent default link behavior
        if (confirm("Bạn có muốn đăng xuất không?")) {
          localStorage.removeItem("loggedInUser");
          window.location.reload();
        }
      });
    }
  } else {
    // If not logged in, ensure the account link points to login/register
    if (accountLink) {
      accountLink.querySelector("span").textContent = "Tài khoản";
      accountLink.href = "dangnhap.html"; // Or a page with login/register options
    }
  }
});

// THANH TOAN
// Hàm này sẽ được gọi khi người dùng click vào nút "Mua Ngay" của sản phẩm
// Nó sẽ lưu thông tin sản phẩm vào localStorage và chuyển hướng đến trang thanh toán
function goToDetail(title, image, price, colors, type = []) {
  const product = {
    title: title,
    image: image,
    price: price,
    colors: colors,
    type: type,
  };
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "pay.html";
}

document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const productCards = document.querySelectorAll(".product-card");

  searchInput.addEventListener("input", function () {
    const keyword = this.value.trim().toLowerCase();
    productCards.forEach((card) => {
      const title = card
        .querySelector(".product-title")
        .textContent.toLowerCase();
      card.style.display = title.includes(keyword) ? "inline-block" : "none";
    });
  });
});
