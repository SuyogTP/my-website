(function () {
  const GOOGLE_APP_URL = "https://script.google.com/macros/s/AKfycbzSxXv2HIbNu_3irqRuNyNEajl3aBMWPCfg0MNLvji9_OxRB088pc-F3RXCjsGcrRIW/exec";
  const MAX_QUANTITY = 99;
  const MAX_RATE = 1000000;

  const form = document.getElementById('gasForm');
  const directFields = document.getElementById('directOrderFields');
  const bookingFields = document.getElementById('bookingFields');
  const viewTitle = document.getElementById('viewTitle');
  const toggleBtn = document.getElementById('toggleViewBtn');
  const submitBtn = document.getElementById('submitBtn');
  const statusBox = document.getElementById('statusBox');
  const cityscape = document.querySelector('.cityscape');
  const motionOverlay = document.getElementById('motionOverlay');
  const qtyEl = document.getElementById('quantity');
  const nameEl = document.getElementById('name');
  const phoneEl = document.getElementById('phone');
  const rateEl = document.getElementById('todayRate');
  const paidEl = document.getElementById('paidAmount');
  const paymentStatusEl = document.getElementById('paymentStatus');
  let isBookingMode = false;

  toggleBtn.addEventListener('click', () => {
    isBookingMode = !isBookingMode;
    viewTitle.textContent = isBookingMode ? "Advance Booking" : "Direct Order";
    toggleBtn.textContent = isBookingMode ? "← Order Mode" : "Booking Mode →";
    directFields.classList.toggle('hide', isBookingMode);
    bookingFields.classList.toggle('hide', !isBookingMode);
    submitBtn.textContent = isBookingMode ? "Confirm Booking" : "Place Order";
    statusBox.className = 'status';
  });

  function restrictToDigits(input) {
    input.addEventListener('keydown', (event) => {
      if (['e', 'E', '+', '-', '.'].includes(event.key)) event.preventDefault();
    });
    input.addEventListener('input', () => {
      input.value = input.value.replace(/\D/g, '');
    });
  }

  [qtyEl, rateEl, paidEl].forEach(restrictToDigits);

  qtyEl.addEventListener('blur', () => {
    const quantity = Number.parseInt(qtyEl.value, 10);
    if (!Number.isFinite(quantity) || quantity < 1) qtyEl.value = '1';
    else if (quantity > MAX_QUANTITY) qtyEl.value = String(MAX_QUANTITY);
  });

  document.getElementById('qtyDown').addEventListener('click', () => {
    const quantity = Number.parseInt(qtyEl.value, 10) || 1;
    qtyEl.value = String(Math.max(1, quantity - 1));
  });
  document.getElementById('qtyUp').addEventListener('click', () => {
    const quantity = Number.parseInt(qtyEl.value, 10) || 1;
    qtyEl.value = String(Math.min(MAX_QUANTITY, quantity + 1));
  });

  function setInvalid(input, message, invalid) {
    input.classList.toggle('invalid', invalid);
    message.classList.toggle('show', invalid);
  }

  function validate() {
    const nameValid = nameEl.value.trim().length >= 2 && nameEl.value.trim().length <= 100;
    const phoneValid = /^9[678]\d{8}$/.test(phoneEl.value.trim());
    const quantity = Number(qtyEl.value);
    const quantityValid = Number.isInteger(quantity) && quantity >= 1 && quantity <= MAX_QUANTITY;
    const rate = Number(rateEl.value);
    const rateValid = Number.isSafeInteger(rate) && rate >= 1 && rate <= MAX_RATE;
    const paid = Number(paidEl.value);
    const total = rate * quantity;
    const paidValid = Number.isSafeInteger(paid) && paid >= 0 && paid <= total;
    const selectedPaymentStatus = paymentStatusEl.value;
    const paymentStatusValid = !isBookingMode ||
      (selectedPaymentStatus === 'Unpaid' && paid === 0) ||
      (selectedPaymentStatus === 'Partial / Paid' && paid > 0 && paid < total) ||
      (selectedPaymentStatus === 'Paid in Advance' && paid === total);

    setInvalid(nameEl, document.getElementById('nameMsg'), !nameValid);
    setInvalid(phoneEl, document.getElementById('phoneMsg'), !phoneValid);
    setInvalid(paidEl, document.getElementById('paymentMsg'), !paidValid || !paymentStatusValid);
    qtyEl.classList.toggle('invalid', !quantityValid);
    rateEl.classList.toggle('invalid', !rateValid);

    return nameValid && phoneValid && quantityValid && rateValid && paidValid && paymentStatusValid;
  }

  function createOrderId(prefix) {
    const randomValues = new Uint32Array(1);
    const random = window.crypto && window.crypto.getRandomValues
      ? (window.crypto.getRandomValues(randomValues), randomValues[0].toString(36))
      : Math.random().toString(36).slice(2, 10);
    return `${prefix}-${Date.now().toString(36).toUpperCase()}-${random.toUpperCase()}`;
  }

  function formatNpr(amount) {
    return `NPR ${amount.toLocaleString('en-NP')}`;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    statusBox.className = 'status';

    if (!validate()) {
      statusBox.textContent = "Please check the highlighted fields and payment amount.";
      statusBox.className = "status error";
      return;
    }

    const quantity = Number(qtyEl.value);
    const todayRate = Number(rateEl.value);
    const paidAmount = Number(paidEl.value);
    const totalAmount = todayRate * quantity;
    const paymentStatus = isBookingMode
      ? paymentStatusEl.value
      : paidAmount === 0 ? "Unpaid" : paidAmount === totalAmount ? "Paid" : "Partial / Paid";
    const payload = {
      orderId: createOrderId(isBookingMode ? 'BKG' : 'ORD'),
      timestamp: new Date().toLocaleString(),
      orderCategory: isBookingMode ? "Advance Booking" : "Direct Order",
      name: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      brand: document.getElementById('brand').value,
      todayRate,
      paidAmount,
      totalAmount,
      balanceAmount: totalAmount - paidAmount,
      quantity,
      type: isBookingMode ? "N/A" : document.getElementById('type').value,
      emptyCylinder: isBookingMode ? document.getElementById('emptyCylinder').value : "N/A",
      paymentStatus
    };

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    cityscape.classList.add('is-delivering');
    startCloudCover();

    try {
      await fetch(GOOGLE_APP_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=UTF-8' },
        body: JSON.stringify(payload)
      });
      statusBox.textContent = "Request sent. This page cannot verify the server accepted it.";
      statusBox.className = "status success";
      showReceipt(payload);
    } catch (error) {
      statusBox.textContent = "Submission could not be confirmed. Check with the shop before retrying.";
      statusBox.className = "status error";
      cityscape.classList.remove('is-delivering');
      clearCloudCover();
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = isBookingMode ? "Confirm Booking" : "Place Order";
    }
  });

  function startCloudCover() {
    motionOverlay.replaceChildren();
    const cloud = document.createElement('span');
    cloud.className = 'cloud-bank';
    motionOverlay.appendChild(cloud);
    requestAnimationFrame(() => cloud.classList.add('is-forming'));
  }

  function clearCloudCover() {
    const cloud = motionOverlay.querySelector('.cloud-bank');
    if (!cloud) return;
    cloud.classList.add('fade-out');
    window.setTimeout(() => {
      if (cloud.classList.contains('fade-out')) cloud.remove();
    }, 900);
  }

  function showReceipt(order) {
    cityscape.classList.remove('is-delivering');
    clearCloudCover();
    document.getElementById('formContainer').classList.add('hide');
    document.getElementById('receipt').classList.remove('hide');

    document.getElementById('rCategoryLabel').textContent = order.orderCategory.toUpperCase() + " REQUEST SENT";
    document.getElementById('rOrderId').textContent = order.orderId;
    document.getElementById('rName').textContent = order.name;
    document.getElementById('rPhone').textContent = order.phone;
    document.getElementById('rBrand').textContent = order.brand;
    document.getElementById('rQty').textContent = String(order.quantity);
    document.getElementById('rRate').textContent = formatNpr(order.todayRate);
    document.getElementById('rTotal').textContent = formatNpr(order.totalAmount);
    document.getElementById('rPaid').textContent = formatNpr(order.paidAmount);
    document.getElementById('rBalance').textContent = formatNpr(order.balanceAmount);

    if (order.orderCategory === "Advance Booking") {
      document.getElementById('rTypeRow').classList.add('hide');
      document.getElementById('rEmptyRow').classList.remove('hide');
      document.getElementById('rPaymentRow').classList.remove('hide');
      document.getElementById('rEmpty').textContent = order.emptyCylinder;
      document.getElementById('rPayment').textContent = order.paymentStatus;
    } else {
      document.getElementById('rTypeRow').classList.remove('hide');
      document.getElementById('rEmptyRow').classList.add('hide');
      document.getElementById('rPaymentRow').classList.add('hide');
      document.getElementById('rType').textContent = order.type;
    }
  }

  document.getElementById('newOrderBtn').addEventListener('click', () => {
    cityscape.classList.remove('is-delivering');
    clearCloudCover();
    form.reset();
    qtyEl.value = '1';
    nameEl.classList.remove('invalid');
    phoneEl.classList.remove('invalid');
    qtyEl.classList.remove('invalid');
    rateEl.classList.remove('invalid');
    paidEl.classList.remove('invalid');
    document.getElementById('nameMsg').classList.remove('show');
    document.getElementById('phoneMsg').classList.remove('show');
    document.getElementById('paymentMsg').classList.remove('show');
    statusBox.className = 'status';
    document.getElementById('receipt').classList.add('hide');
    document.getElementById('formContainer').classList.remove('hide');
  });
})();
