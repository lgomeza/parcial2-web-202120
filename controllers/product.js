const data = require('../assets/data');

function getProducts(query) {
  if(query.q != null){
    const productName = query.q.toLowerCase();
    const newData = data.filter((product)=>product.name.toLowerCase().includes(productName));
    return newData;
  }
  return data;
}

module.exports = { getProducts };
