// ================================
// جلب السلة
// ================================
export const getCart = () => {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

// ================================
// حفظ السلة + إشعار التحديث
// ================================
const saveCart = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
  window.dispatchEvent(new Event("cartUpdated")); // 🔥
};

// ================================
// إضافة منتج
// ================================
export const addToCart = (product) => {
  const cart = getCart();
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
};

// ================================
// حذف منتج
// ================================
export const removeFromCart = (id) => {
  const cart = getCart().filter((item) => item.id !== id);
  saveCart(cart);
};

// ================================
// تفريغ السلة
// ================================
export const clearCart = () => {
  localStorage.removeItem("cart");
  window.dispatchEvent(new Event("cartUpdated"));
};

// ================================
// زيادة الكمية
// ================================
export const increaseQty = (id) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (item) {
    item.quantity += 1;
    saveCart(cart);
  }
};

// ================================
// إنقاص الكمية (❗ لا تنقص تحت 1)
// ================================
export const decreaseQty = (id) => {
  const cart = getCart();
  const item = cart.find((i) => i.id === id);

  if (!item) return;

  if (item.quantity > 1) {
    item.quantity -= 1;
    saveCart(cart);
  }
};