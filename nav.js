const menuBtn = document.getElementById("menuBtn");

const openMenu = () => {
  document.querySelector(".backdrop").className = "backdrop active";
  document.querySelector("aside").className = "active";
  menuBtn.classList.add("active");
};

const closeMenu = () => {
  document.querySelector(".backdrop").className = "backdrop";
  document.querySelector("aside").className = "";
  menuBtn.classList.remove("active");
};

menuBtn.onclick = (e) => {
  e.preventDefault();
  if (menuBtn.classList.contains("active")) {
    closeMenu();
  } else {
    openMenu();
  }
};

document.querySelector("aside button.close").onclick = (e) => {
  closeMenu();
};

document.querySelector(".asidelinksclose").onclick = (e) => {
  closeMenu();
};

document.querySelector(".backdrop").onclick = (e) => {
  closeMenu();
};
