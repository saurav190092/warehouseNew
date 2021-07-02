/**
 * Include your custom JavaScript here.
 *
 * We also offer some hooks so you can plug your own logic. For instance, if you want to be notified when the variant
 * changes on product page, you can attach a listener to the document:
 *
 * document.addEventListener('variant:changed', function(event) {
 *   var variant = event.detail.variant; // Gives you access to the whole variant details
 * });
 *
 * You can also add a listener whenever a product is added to the cart:
 *
 * document.addEventListener('product:added', function(event) {
 *   var variant = event.detail.variant; // Get the variant that was added
 *   var quantity = event.detail.quantity; // Get the quantity that was added
 * });
 *
 * If you are an app developer and requires the theme to re-render the mini-cart, you can trigger your own event. If
 * you are adding a product, you need to trigger the "product:added" event, and make sure that you pass the quantity
 * that was added so the theme can properly update the quantity:
 *
 * document.documentElement.dispatchEvent(new CustomEvent('product:added', {
 *   bubbles: true,
 *   detail: {
 *     quantity: 1
 *   }
 * }));
 *
 * If you just want to force refresh the mini-cart without adding a specific product, you can trigger the event
 * "cart:refresh" in a similar way (in that case, passing the quantity is not necessary):
 *
 * document.documentElement.dispatchEvent(new CustomEvent('cart:refresh', {
 *   bubbles: true
 * }));
 */

        let nutrionalResponseData;

		/************Set Drawer gtm value *************/
        $(".product-form__add-button.button.button--primary").click(function(e){
            setTimeout(function(){
                const cookieValue = document.cookie
                .split('; ')
                .find(row => row.startsWith('gtm='))
                .split('=')[1];
                console.log(cookieValue , 'cookieValue')
                if (cookieValue) {
                  let drawerValue = $('#noteDrawerInformation').val();
                  if (drawerValue) {
                     $('#noteDrawerInformation').val(drawerValue +"|"+ `gtm:${cookieValue}`)
                  }

                }
            },
            2000);
        });


       $('#bestValues best-value').remove();
       $('#bestValues .value_best').remove();
       $('#bestValuesResponsive best-value').remove();
       $('.value_best').remove();
       
      	let nutrionalRating = null;
        var  productId = $('#productId').val();
		if (productId) {
  		console.log(productId , 'productId')
         var xhttp = new XMLHttpRequest();
           xhttp.onreadystatechange = function() {
             if (this.readyState == 4 && this.status == 200) {
                $('#deliveryNutrionalId').css("display", "block");
               if (this.responseText) {
                 nutrionalResponseData = this.responseText;
                 	let valuePercentile = (JSON.parse(this.responseText).value_percentile)*100;
                 	let percentageBestValue = (valuePercentile).toFixed(0);
                      $('#bestValues').append(`<best-value 
					  val=${percentageBestValue}
                      width ="46px"
                      height="46px"
                      text_value=""
                      text_x=15
                      text_y=15
                      val_x=0
                      val_y=29
                      center_x = 23
                      center_y = 23
                      radius_x = 21
                      radius_y = 21
                      start_angle=270
                      line_color="#066fec"
                      default_color="#E9E9E9"></best-value>`);
                     $('#bestValues').append(`<p class="value_best">
                      Value
                    </p>`)
                     $('#bestValuesResponsive').append(`<best-value 
					  val=${percentageBestValue}
                      width ="46px"
                      height="46px"
                      text_value=""
                      text_x=15
                      text_y=15
                      val_x=0
                      val_y=29
                      center_x = 23
                      center_y = 23
                      radius_x = 21
                      radius_y = 21
                      start_angle=270
                      line_color="#066fec"
                      default_color="#E9E9E9"></best-value>`);
                     $('#bestValuesResponsive').append(`<p class="value_best">
                      Value
                    </p>`)
					
                   nutrionalRating = parseInt((JSON.parse(this.responseText).nutrition_rating_percentile).toFixed(0));
                 
                 if (nutrionalRating > 100) {
                      nutrionalRating = 100;
                 }
                 $('.foodItemNutrition').html(`${parseInt(nutrionalRating)}%`);
                 $('#nutrionalProgressBar').attr('aria-valuenow', parseInt(nutrionalRating)).css('width', nutrionalRating.toFixed(0)+'%');
                 $('#nutrionalProgressBar').css('background-size' , `calc(100% * 100/${parseInt(nutrionalRating)})`)
               }

             } else {
               $('#deliveryNutrionalId').css("display", "none");
             }
           };
          xhttp.open("GET", `https://development-dot-petfoodcompare.wl.r.appspot.com/v1/pet/shopify/products/${productId}/value`, true);
          xhttp.send();
       	}



	onclickNutrion = function(email=null) {
	  let response = JSON.parse(nutrionalResponseData);
      if (email === null) {
        window.open(`https://food.petassistant.com/foodReview/${response.product_id}`, '_blank');
      } else {
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
              let ssoResponse= JSON.parse(this.responseText);
               if (ssoResponse.sso) {
               	 window.open(`https://food.petassistant.com/foodReview/${response.product_id}?sso=${ssoResponse.sso}`, '_blank');
                } 
             }
            };
        
        xhttp.open("GET", `https://development-dot-petfoodcompare.wl.r.appspot.com/v1/pet/sso/get?email=${email}`, true);
        xhttp.send();
      }

    }
    
    
    
    /************Set Food Will Last***********/
     $('#foodWillLastContent').css("display", "none");
	   $('#delivery_frequency').css("display", "none");
      console.log(customer_email , 'customer_email')
      if (customer_email != undefined && customer_email != null && customer_email) {
        $('#foodWillLastHidden').remove();
        // console.log(variant.id,productData,id, customer_email)
        var xhttp = new XMLHttpRequest();
          xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
               if (this.responseText) {
                $('#foodWillLastContent').css("display", "block");
               }
              console.log(this.responseText,  'response')
              $('#quantity-qb').val();
              let foodWillLast = Math.floor(1089 /1000*this.responseText);
          	  let findClass = $('.quantityChecking').find('.quantity-selector__value');
              let quantity = findClass.val();
              console.log(quantity , 'quantity')
              let foodWithQuantity = findClass.val()
              $('#foodWillLastContent').append(`<h2 id="foodWillLastHidden">${(foodWillLast).toFixed(0)}</h2>`);
              $('#foodWillLastHidden').css("display", "none")
              $('#foodWillLast').html(`${(quantity*foodWillLast ).toFixed(0)} <span class="daystext">days</span>`);
              let foodLast = (quantity*foodWillLast ).toFixed(0);
              if (quantity && foodWillLast) {
              	calculateDeliveryFrequency(foodLast)
              }
            }
          };
        xhttp.open("GET", `https://development-dot-petfoodcompare.wl.r.appspot.com/v1/pet/variants/days-per-kg?email=${customer_email}&shopify_id=${productId}`, true);
        xhttp.send();
      } else {
        $('#foodWillLastContent').css("display", "none");
        $('#delivery_frequency').css("display", "none");
      }



	/************Calculate Delivery Frequency***********/
	calculateDeliveryFrequency = function(foodWilllastWithQuantity) {
     		if (foodWilllastWithQuantity<19) {
                $('#delivery_frequency').css("display", "none");
              } else {
                $('#delivery_frequency').css("display", "block");
              }
              
              if (foodWilllastWithQuantity>=19 && foodWilllastWithQuantity<=25) {
                 $('#recomended_delivery_freq').html('Every 3 weeks')
              } else if (foodWilllastWithQuantity>=26 && foodWilllastWithQuantity<=32) {
                 $('#recomended_delivery_freq').html('Every 4 weeks')
              } else if (foodWilllastWithQuantity>=33 && foodWilllastWithQuantity<=39) {
                 $('#recomended_delivery_freq').html('Every 5 weeks')
              } else if (foodWilllastWithQuantity>=40 && foodWilllastWithQuantity<=46) {
                 $('#recomended_delivery_freq').html('Every 6 weeks')
              } else if (foodWilllastWithQuantity>=47 && foodWilllastWithQuantity<=53) {
                 $('#recomended_delivery_freq').html('Every 7 weeks')
              } else if (foodWilllastWithQuantity>=54 && foodWilllastWithQuantity<=60) {
                 $('#recomended_delivery_freq').html('Every 8 weeks')
              } else if (foodWilllastWithQuantity>=61 && foodWilllastWithQuantity<=67) {
                 $('#recomended_delivery_freq').html('Every 9 weeks')
              }
    }
    
    
    $('#main').find('.quantity-selector').on('click', '[data-action="decrease-picker-quantity"], [data-action="increase-picker-quantity"]', function (e) {
    	let foodWillLastOld = $('#foodWillLastHidden').html();
      	  var $adjusterContainer = $(this).closest('.quantity-selector'),
          $valueInput = $adjusterContainer.find('.quantity-selector__value'),
          newValue = parseInt($valueInput.val());
      console.log(newValue ,'ddfsf')
      	 if (newValue) {
            	console.log(foodWillLastOld , 'foodWillLastOld')
            if (foodWillLastOld !== '' && foodWillLastOld !== undefined ) {
              let foodWilllastWithQuantity = parseInt(foodWillLastOld)*parseInt(newValue)
              $('#foodWillLast').html(`${(foodWilllastWithQuantity)} <span class="daystext">days</span>`);
              calculateDeliveryFrequency(foodWilllastWithQuantity);
              
            }
          }
    
    });