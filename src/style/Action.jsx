const Action = () => {
  const pageTurnBtn = document.querySelectorAll(".nextprev-btn");
  pageTurnBtn.forEach((item, index) => {
    item.onclick = () => {
      const pageTurnId = item.getAttribute("data-page");
      const pageTurn = document.getElementById(pageTurnId);

      if (pageTurn.classList.contains("turn")) {
        pageTurn.classList.remove("turn");
        setTimeout(() => {
          pageTurn.style.zIndex = 20 - index;
        }, 500);
      } else {
        pageTurn.classList.add("turn");
        setTimeout(() => {
          pageTurn.style.zIndex = 20 + index;
        }, 500);
      }
    };
  });

  const pages = document.querySelectorAll(".book-page.page-right");
  const contactMe = document.querySelector(".contact-me");
  contactMe.onclick = () => {
    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add("turn");
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, 500);
      }, (index + 1) * 200 + 100);
    });
  };

  let totalPages = pages.length;
  let pageNumber = 0;

  function reverseIndex() {
    pageNumber--;
    if (pageNumber < 0) {
      // set pagenumber => index pages decrease
      pageNumber = totalPages - 1;
    }
  }
  const backProfile = document.querySelector(".back-home");

  backProfile.onclick = () => {
    pages.forEach((_, index) => {
      setTimeout(() => {
        // Set pagenumber remove turn
        reverseIndex();
        pages[pageNumber].classList.remove("turn");
        setTimeout(() => {
          // Set pagenumber up z-index
          reverseIndex();
          pages[pageNumber].style.zIndex = 10 + index;
        }, 500);
      }, (index + 1) * 200 + 100);
    });
  };

  const coverRight = document.querySelector(".content.content-right");
  setTimeout(() => {
    coverRight.classList.add("turn");
  }, 2100);

  setTimeout(() => {
    coverRight.style.zIndex = -1;
  }, 2800);

  pages.forEach((_, index) => {
    setTimeout(() => {
      // Set pagenumber remove turn
      reverseIndex();
      pages[pageNumber].classList.remove("turn");
      setTimeout(() => {
        // Set pagenumber up z-index
        reverseIndex();
        pages[pageNumber].style.zIndex = 10 + index;
      }, 500);
    }, (index + 1) * 200 + 2100);
  });
};

export default Action;
