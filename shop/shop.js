
// تعداد موقت هر محصول در صفحهٔ هوم
export const tempQuantities = {};

// تغییر تعداد موقت (➖ / ➕ در هوم)
export function changeTempQty(id, delta) {
  tempQuantities[id] = Math.max(1, (tempQuantities[id] || 1) + delta);
  const span = document.getElementById(`temp-qty-${id}`);
  if (span) span.textContent = tempQuantities[id];
}

// افزودن با تعداد انتخاب‌شده
export function addToCartWithQty(name, price, id) {
  const qty = tempQuantities[id] || 1;
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price, quantity: qty });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${qty} عدد از «${name}» به سبد خرید اضافه شد!`);
}

// شمارنده بالا (دایره قرمز)
export function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = cart.length;
}


export function renderCartItems() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const list = document.getElementById("cart-items");
  const totalEl = document.getElementById("total-price");
  if (!list || !totalEl) return;            // اگر صفحه هوم باشد

  list.innerHTML = "";
  if (cart.length === 0) {
    list.innerHTML = "<li>سبد خرید شما خالی است.</li>";
    totalEl.textContent = "مجموع: ۰";
    return;
  }

  let total = 0;
  cart.forEach((item, i) => {
    total += item.price * (item.quantity || 1);
    list.insertAdjacentHTML(
      "beforeend",
      `<li>
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span>${item.name}</span>
          <span>
            <button onclick="changeQty(${i},-1)">➖</button>
            <span id="qty-${i}">${item.quantity || 1}</span>
            <button onclick="changeQty(${i},1)">➕</button>
          </span>
          <span>${(item.price * (item.quantity || 1)).toLocaleString()} تومان</span>
          <button onclick="removeItemFromCart(${i})">❌</button>
        </div>
      </li>`
    );
  });
  totalEl.textContent = `مجموع: ${total.toLocaleString()} تومان`;
}

export function changeQty(idx, d) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart[idx].quantity = Math.max(1, (cart[idx].quantity || 1) + d);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

export function removeItemFromCart(idx) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(idx, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  renderCartItems();
}

// خالی‌کردن کل سبد (در cart.html)
document.addEventListener("DOMContentLoaded", () => {
  const clearBtn = document.getElementById("clear-cart");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      updateCartCount();
      renderCartItems();
    });
  }

  const payBtn = document.getElementById("checkout");
  if (payBtn) {
    payBtn.addEventListener("click", () => {
      alert("پرداخت با موفقیت انجام شد! 🧾");
      localStorage.removeItem("cart");
      updateCartCount();
      renderCartItems();
    });
  }

  renderCartItems();
});

window.changeTempQty = changeTempQty;
window.addToCartWithQty = addToCartWithQty;
window.updateCartCount = updateCartCount;
window.removeItemFromCart = removeItemFromCart;
window.changeQty = changeQty;
window.renderCartItems = renderCartItems;


