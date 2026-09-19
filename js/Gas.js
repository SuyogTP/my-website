(function () {
  const GOOGLE_APP_URL = "https://script.google.com/macros/s/AKfycbyjrOY1p0uZEql6iZpH3uefdt-Ye1J9s9NFrdjK3TN6hG3afQeC0pBmYOSCBBzaHita/exec";

  const form = document.getElementById('gasForm');
  const directFields = document.getElementById('directOrderFields');
  const bookingFields = document.getElementById('bookingFields');
  const viewTitle = document.getElementById('viewTitle');
  const toggleBtn = document.getElementById('toggleViewBtn');
  const submitBtn = document.getElementById('submitBtn');
  const statusBox = document.getElementById('statusBox');
  const cityscape = document.querySelector('.cityscape');
  const motionOverlay = document.getElementById('motionOverlay');

  let isBookingMode = false;

  toggleBtn.addEventListener('click', () => {
    isBookingMode = !isBookingMode;
    if (isBookingMode) {
      viewTitle.textContent = "Advance Booking";
      toggleBtn.innerHTML = "← Order Mode";
      directFields.classList.add('hide');
      bookingFields.classList.remove('hide');
      submitBtn.textContent = "Confirm Booking";
    } else {
      viewTitle.textContent = "Direct Order";
      toggleBtn.innerHTML = "Booking Mode →";
      directFields.classList.remove('hide');
      bookingFields.classList.add('hide');
      submitBtn.textContent = "Place Order";
    }
  });

  const qtyEl = document.getElementById('quantity');
  qtyEl.addEventListener('keydown', (e) => {
    if (['e', 'E', '+', '-', '.'].includes(e.key)) e.preventDefault();
  });
  qtyEl.addEventListener('input', () => {
    qtyEl.value = qtyEl.value.replace(/[^0-9]/g, '');
  });
  qtyEl.addEventListener('blur', () => {
    if (!qtyEl.value || parseInt(qtyEl.value, 10) < 1) qtyEl.value = 1;
  });

  document.getElementById('qtyDown').onclick = () => {
    qtyEl.value = Math.max(1, (parseInt(qtyEl.value, 10) || 1) - 1);
  };
  document.getElementById('qtyUp').onclick = () => {
    qtyEl.value = (parseInt(qtyEl.value, 10) || 0) + 1;
  };

  const nameEl = document.getElementById('name');
  const phoneEl = document.getElementById('phone');

  function validate() {
    const nValid = nameEl.value.trim().length >= 2;
    const pValid = /^9[678]\d{8}$/.test(phoneEl.value.trim());
    nameEl.classList.toggle('invalid', !nValid);
    document.getElementById('nameMsg').classList.toggle('show', !nValid);
    phoneEl.classList.toggle('invalid', !pValid);
    document.getElementById('phoneMsg').classList.toggle('show', !pValid);
    return nValid && pValid;
  }

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

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    statusBox.style.display = 'none';
    statusBox.className = 'status';

    if (!validate()) {
      statusBox.textContent = "Please fix the highlighted fields.";
      statusBox.className = "status error";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Processing...";
    cityscape.classList.add('is-delivering');
    startCloudCover();

    const payload = {
      orderId: (isBookingMode ? 'BKG-' : 'ORD-') + Math.floor(1000 + Math.random() * 9000),
      timestamp: new Date().toLocaleString(),
      orderCategory: isBookingMode ? "Advance Booking" : "Direct Order",
      name: nameEl.value.trim(),
      phone: phoneEl.value.trim(),
      brand: document.getElementById('brand').value,
      quantity: qtyEl.value || "1",
      type: isBookingMode ? "N/A" : document.getElementById('type').value,
      emptyCylinder: isBookingMode ? document.getElementById('emptyCylinder').value : "N/A",
      paymentStatus: isBookingMode ? document.getElementById('paymentStatus').value : "N/A"
    };

    try {
      if (GOOGLE_APP_URL) {
        await fetch(GOOGLE_APP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }
      showReceipt(payload);
    } catch (err) {
      statusBox.textContent = "Failed to submit. Please try again.";
      statusBox.className = "status error";
      cityscape.classList.remove('is-delivering');
      clearCloudCover();
    }

    submitBtn.disabled = false;
    submitBtn.textContent = isBookingMode ? "Confirm Booking" : "Place Order";
  });

  function showReceipt(o) {
    cityscape.classList.remove('is-delivering');
    clearCloudCover();
    document.getElementById('formContainer').classList.add('hide');
    document.getElementById('receipt').classList.remove('hide');

    document.getElementById('rCategoryLabel').textContent = o.orderCategory.toUpperCase() + " CONFIRMED";
    document.getElementById('rOrderId').textContent = o.orderId;
    document.getElementById('rName').textContent = o.name;
    document.getElementById('rPhone').textContent = o.phone;
    document.getElementById('rBrand').textContent = o.brand;
    document.getElementById('rQty').textContent = o.quantity;

    if (isBookingMode) {
      document.getElementById('rTypeRow').classList.add('hide');
      document.getElementById('rEmptyRow').classList.remove('hide');
      document.getElementById('rPaymentRow').classList.remove('hide');
      document.getElementById('rEmpty').textContent = o.emptyCylinder;
      document.getElementById('rPayment').textContent = o.paymentStatus;
    } else {
      document.getElementById('rTypeRow').classList.remove('hide');
      document.getElementById('rEmptyRow').classList.add('hide');
      document.getElementById('rPaymentRow').classList.add('hide');
      document.getElementById('rType').textContent = o.type;
    }
  }

  document.getElementById('newOrderBtn').onclick = () => {
    cityscape.classList.remove('is-delivering');
    clearCloudCover();
    form.reset();
    qtyEl.value = 1;
    nameEl.classList.remove('invalid');
    phoneEl.classList.remove('invalid');
    document.getElementById('nameMsg').classList.remove('show');
    document.getElementById('phoneMsg').classList.remove('show');
    statusBox.className = 'status';
    document.getElementById('receipt').classList.add('hide');
    document.getElementById('formContainer').classList.remove('hide');
  };
})();
