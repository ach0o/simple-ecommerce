/**
 * Initialize database for sample application
 * As a result, there will be
 * - three products
 * - three categories
 */

const { databases } = require('../components');
const { ProductModel } = require('../components/products/model');
const { CategoryModel } = require('../components/categories/model');


const mongo = new databases.MongoDB();
mongo.connect();
mongo.db.dropDatabase();

/**
 * Creating Products
 */
const products = [];
for (let i = 1; i < 4; i += 1) {
  const price = Math.round(Math.random() * 10) * 1000;
  const item = {
    uid: 1000 + i,
    name: `product #${i}`,
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non eleifend nisl, ut fringilla dui.',
    price,
    discountPrice: price - 900,
    optionQty: {
      default: 30,
      small: 20,
      medium: 50,
      large: 30,
    },
    images: [`product${i}.png`],
    tags: ['#hot', `#product${i}`, '#sale'],
    lastWarehoused: new Date(),
  };
  products.push(item);
}

/**
 * Adding categories after product insert
 *
 * category structure:
 * |- Shirts
 * |    |- T-shirts
 * |- Polo-shirts
 */
ProductModel.insertMany(products)
  .then(() => {
    ProductModel.find({}, (err, data) => {
      // Add Categories
      CategoryModel.insertMany([
        {
          name: 'T-shirts',
          isParent: false,
          uri: 'tshirts',
          products: [data[0].id, data[1].id],
        },
        {
          name: 'Polo-shirts',
          uri: 'polo-shirts',
          products: [data[2].id],
        },
      ], (err, cates) => {
        // Add Parent Categories
        if (cates) {
          CategoryModel.create(
            {
              name: 'Shirts',
              uri: 'shirts',
              childCategories: [cates[0].id],
              products: [data[0].id, data[1].id],
            },
          )
            .then(() => {
              mongo.db.close();
              console.log('ok');
            });
        }
      });
    });
  })
  .catch(err => console.log(err.message));
