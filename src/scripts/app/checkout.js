(() => {
  "use strict";

  window.addEventListener("load", () => {
    setTimeout(() => {
      stripe = Stripe('pk_test_QNhqGRgedUlFdZuPIbgqwyfd');
      var elements = stripe.elements();

      var card = elements.create('card');
      card.mount('#card-element');

      var promise = stripe.createToken(card);
      promise.then(function(result) {
        // result.token is the card token.
      });
    }, 3000);
  });
})();
