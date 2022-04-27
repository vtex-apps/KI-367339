function observeChangesOnCartItems(oldItems) {
  const cartItems = document.querySelector("ul.cart-items");

  const observer = new MutationObserver((mutationsList, observer) => {
    const items = cartItems.querySelectorAll("li");
    //console.log(oldItems);
    //console.log("items", items.length);
    if (oldItems != items.length) {
      const uniqueItems = [];
      items.forEach((item) => {
        const itemId = item.getAttribute("data-sku");
        if (!uniqueItems.includes(itemId)) {
          uniqueItems.push(itemId);
        } else {
          item.remove();
        }
      });
      oldItems = uniqueItems.length;
      //console.log("uniqueItems", uniqueItems.length);
    }
    
  });

  observer.observe(cartItems, {
    attributes: true,
    childList: true,
    subtree: true,
  });
}

$(document).ready(function () {
  let oldItems = -1
  const cartItems = document.querySelector("ul.cart-items");

  const observerCartItems = new MutationObserver((mutations, obsCI) => {
    if (document.contains(cartItems)) {
      observeChangesOnCartItems(oldItems);
      window.addEventListener("hashchange", () => {
        observeChangesOnCartItems(oldItems);
      });
      obsCI.disconnect();
      return;
    }
  });

  observerCartItems.observe(document, {
    childList: true,
    subtree: true,
  });
});
