<script>
  // ===== Paystack Payment Function =====
  function payWithPaystack() {
    const amountField = document.getElementById('donation-amount');
    const emailField = document.getElementById('donor-email');

    // Clean amount (remove commas) and validate
    const amount = amountField.value.replace(/,/g, '');
    if (!amount || amount <= 0) {
      alert("Please enter a valid donation amount");
      return;
    }

    // Use email field or fallback
    const email = emailField?.value || 'oyebamijiadeiyanu@gmail.com';

    const handler = PaystackPop.setup({
      key: 'pk_test_438df37c1726d35987d94ab4255561db69a07c51', // TEST public key
      email: email,
      amount: amount * 100, // Convert Naira to kobo
      currency: 'NGN',
      ref: 'JMLI_' + Math.floor((Math.random() * 1000000000) + 1),
      metadata: {
        custom_fields: [
          {
            display_name: "Supporter Name",
            variable_name: "supporter_name",
            value: ""
          }
        ]
      },
      callback: function(response){
        alert('Thank you for your donation! Reference: ' + response.reference);
        // Clear fields after successful payment
        amountField.value = '';
        if(emailField) emailField.value = '';
      },
      onClose: function(){
        alert('Transaction was not completed, window closed.');
      }
    });

    handler.openIframe();
  }

  // ===== Amount Input Formatting with Commas =====
  const amountInput = document.querySelector('#donation-amount');

  amountInput.addEventListener('input', () => {
    let cursorPosition = amountInput.selectionStart;
    let value = amountInput.value.replace(/,/g, ''); // Remove existing commas

    if (value) {
      // Split integer and decimal parts
      let parts = value.split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ','); // Add commas to integer part
      value = parts.join('.');
    }

    // Adjust cursor position to account for commas
    let beforeCommas = (amountInput.value.slice(0, cursorPosition).match(/,/g) || []).length;
    let afterCommas = (value.slice(0, cursorPosition).match(/,/g) || []).length;
    cursorPosition += (afterCommas - beforeCommas);

    amountInput.value = value;
    amountInput.setSelectionRange(cursorPosition, cursorPosition);
  });
</script>
