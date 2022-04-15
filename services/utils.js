const { faker } = require('@faker-js/faker');
const { CustomAPIError } = require('../errors/custom-error.js');

const arrayToObjectKeys = (arr) => {
  return arr.reduce((acc, curr) => {
    return (acc[curr] = ''), acc; // eslint-disable-line
  }, {});
};

const _checkRegex = (check, against) => {
  return new RegExp(`(w*[_]*${check}).*$`, 'i').test(against);
};

const predefinedSchema = (schema, id) => {
  switch (schema) {
    case 'user':
    case 'users':
    case 'person':
      return {
        id: id ?? faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipcode: faker.address.zipCode(),
          geo: {
            lat: faker.address.latitude(),
            lng: faker.address.longitude()
          }
        },
        phone: faker.phone.phoneNumber(),
        website: faker.internet.domainName(),
        company: {
          name: faker.company.companyName(),
          bs: faker.company.bs()
        }
      };
    case 'post':
    case 'posts':
      return {
        id: id ?? faker.datatype.uuid(),
        title: faker.lorem.sentence(),
        body: faker.lorem.lines(10),
        userId: 1,
        createdBy: faker.name.findName(),
        createdDate: faker.date.soon()
      };
    case 'todo':
    case 'todos':
      const completed = faker.datatype.boolean(); // eslint-disable-line
      return {
        id: id ?? faker.datatype.uuid(),
        title: faker.lorem.sentence(),
        completed: completed,
        userId: 1,
        completedDate: completed ? faker.date.recent() : undefined
      };
    case 'quote':
    case 'quotes':
      return {
        id: id ?? faker.datatype.uuid(),
        body: faker.lorem.sentence(),
        author: faker.name.findName(),
        tags: [...Array(faker.datatype.number({ min: 1, max: 5 }))].map(x => faker.lorem.word())
      };
    case 'ecommerce':
    case 'products':
    case 'product':
      return {
        id: id ?? faker.datatype.uuid(),
        name: faker.commerce.product(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ symbol: '$' }),
        color: faker.commerce.color(),
        imageURL: faker.image.abstract()
      };
    default:
      return {};
  }
};

const _toCamelCase = (str) => {
  return str.replace(/[^a-zA-Z0-9 ]+(.)/g, (m, chr) => chr.toUpperCase());
};

const _objectMap = (object, mapFn) => {
  return Object.keys(object).reduce(function (result, key) {
    result[_toCamelCase(key)] = mapFn(object[key], key);
    return result;
  }, {});
};

const populateResponseSchema = (schema, id) => {
  const temp = _objectMap(schema, function (val, key) {
    if (key.includes('__')) {
      return _checkIfFakerHasAPI(key);
    }
    if (_checkRegex('id', key)) {
      return id ?? faker.datatype.uuid();
    } else if (_checkRegex('age', key)) {
      return faker.datatype.number({ min: 1, max: 200 });
    } else if (_checkRegex('name', key)) {
      return faker.name.firstName();
    } else if (_checkRegex('address', key)) {
      return {
        address: {
          street: faker.address.streetAddress(),
          city: faker.address.city(),
          zipCode: faker.address.zipCode(),
          geo: {
            lat: faker.address.latitude(),
            lng: faker.address.longitude()
          }
        }
      };
    } else if (_checkRegex('email', key)) {
      return faker.internet.email();
    }

    return faker.lorem.sentence();
  });
  return temp;
};

const _checkIfFakerHasAPI = (key) => {
  try {
    const splitKey = key.split('__');
    return faker[splitKey[0]][_toCamelCase(splitKey[1])]();
  } catch (err) {
    throw new CustomAPIError(
      `invalid faker API format  - ${key}. Expected format API__module e.g music__genre`,
      400
    );
  }
};

module.exports = {
  arrayToObjectKeys,
  populateResponseSchema,
  predefinedSchema
};

module.exports.exportedForTesting = {
  _checkRegex,
  _toCamelCase,
  _objectMap,
  _checkIfFakerHasAPI
};
