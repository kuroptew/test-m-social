function phoneMask(value) {
  if(value){
    let matrix = "+_ (___)-___-__-__",
      i = 0,
      def = matrix.replace(/\D/g, ""),
      val = value.replace(/\D/g, "");
    if (def.length >= val.length) val = def;
    value = matrix.replace(/./g, function(a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? "" : a
    })
  return value
  } else {
    return ""
  }
};


export default phoneMask;
