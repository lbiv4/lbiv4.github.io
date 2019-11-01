//Helper functions
const changeActive = (activeSelector, itemToSetActive) => {
  let active = document.querySelectorAll(activeSelector);
  for (let j = 0; j < active.length; j++) {
    active.item(j).className = active.item(j).className.replace("active", "");
  }
  itemToSetActive.className += " active";
};

//The following is wrapped in a listener for the DOM to be loaded since otherwise odd values can be returned
//concept from: https://stackoverflow.com/questions/30211605/javascript-html-collection-showing-as-0-length
document.addEventListener("DOMContentLoaded", () => {
  //Functionality for changing pages
  let pageLinks = document.getElementsByClassName("navPageLink");
  let subLinks = document.getElementsByClassName("navSubLink");
  for (let i = 0; i < pageLinks.length; i++) {
    pageLinks.item(i).addEventListener("click", () => {
      changeActive("a.active", pageLinks.item(i));
    });
  }

  //Functionality for changing subLists
  window.addEventListener("scroll", () => {
    for (let i = 0; i < subLinks.length; i++) {
      let divId = subLinks.item(i).attributes["href"].value.split("#")[1];
      let subLink = document.getElementById(divId);
      let linkTop = subLink.getBoundingClientRect().top;
      if (linkTop >= 0 && linkTop < 100) {
        changeActive("a.navSubLink.active", subLinks.item(i));
      }
    }
  });

  //Functionality for resizing images when screen shrinks. Not accounting for vertical shrink at this time
  window.addEventListener("resize", () => {
    const content = $("#contentDiv");
    const contentWidth =
      parseInt(content.css("width")) -
      parseInt(content.css("padding-left")) -
      parseInt(content.css("padding-right"));
    console.log(contentWidth);
    const midWidth = contentWidth / 2;
    const images = document.querySelectorAll(".photoRight, .photoLeft");
    for (let i = 0; i < images.length; i++) {
      if (images[i].naturalWidth > midWidth) {
        const multipler = midWidth / images[i].naturalWidth;
        images[i].width = multipler * images[i].naturalWidth;
        images[i].height = multipler * images[i].naturalHeight;
      } else {
        images[i].width = images[i].naturalWidth;
        images[i].height = images[i].naturalHeight;
      }
    }
  });

  //Simple action to update my current age in intro paragraph over time
  const introParagraph = document.getElementById("aboutMe");
  if (introParagraph != null) {
    const currentAge =
      new Date(new Date() - new Date("10/17/1993")).getFullYear() - 1970;
    introParagraph.innerHTML = introParagraph.innerHTML.replace(
      "CURRENT_AGE",
      currentAge.toString()
    );
  }
});
