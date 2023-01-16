//Check for wholesale customer logged in
const customerWSChecker = () => { 
    return $('html').hasClass('wholesale-customer')
}

//Product page check wholesale product
const productWSChecker = () => { 
    return $('.product-main-content').hasClass('wholesale-product')
}