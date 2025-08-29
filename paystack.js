function payWithPaystack() {
  // Get and clean the amount (remove commas)
  var amountField = document.getElementById('donation-amount');
  var amount = amountField.value.replace(/,/g, '');

  if (!amount || amount <= 0) {
    alert("Please enter a valid donation amount");
    return;
  }

  // Get the email value
  var email = document.getElementById('donor-email')?.value || 'oyebamijiadeiyanu@gmail.com'; // fallback email

  var handler = PaystackPop.setup({
    key: 'pk_test_438df37c1726d35987d94ab4255561db69a07c51', // Your TEST public key
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

      // Clear input fields after successful payment
      document.getElementById('donor-email').value = '';
      document.getElementById('donation-amount').value = '';
    },
    onClose: function(){
      alert('Transaction was not completed, window closed.');
    }
  });

  handler.openIframe();
}
