const formatCurrency = (amount) => {
  let work = amount.split("");
  let arrays = [],
    final = [];
  for (let i = 0; i < amount.length; i++) {
    if (work.length > 3) {
      arrays.unshift(work.slice(work.length - 3, work.length));
      work.splice(work.length - 3, 3).join("");
    } else {
      arrays.unshift(work);
      final.push(arrays.map((arr) => arr.join("")));
      return final[0].join(".");
    }
  }
};
export default formatCurrency;
