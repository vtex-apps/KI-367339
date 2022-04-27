$(document).ready(function () {
  const cartItems = document.querySelector("ul.cart-items");

  const observerCartItems = new MutationObserver((mutations, obsCI) => {
    if (document.contains(cartItems)) {
      const observer = new MutationObserver((mutationsList, observer) => {
        const items = cartItems.querySelectorAll("li");
        console.log("items", items.length);

        const uniqueItems = [];
        items.forEach((item) => {
          const itemId = item.getAttribute("data-sku");
          if (!uniqueItems.includes(itemId)) {
            uniqueItems.push(itemId);
          } else {
            item.remove();
          }
        });

        console.log("uniqueItems", uniqueItems.length);
      });

      observer.observe(cartItems, {
        attributes: true,
        childList: true,
        subtree: true,
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
