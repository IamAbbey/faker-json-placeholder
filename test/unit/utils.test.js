/* eslint-env jest */

const { test, expect, describe } = require('@jest/globals');
const utils = require('../../services/utils.js');
const { exportedForTesting } = require('../../services/utils.js');
const { CustomAPIError } = require('../../errors/custom-error.js');

describe('testing array items to object keys utils', () => {
  test('array supplied should return object with array elements as key', () => {
    expect(utils.arrayToObjectKeys(['a', 'b', 'c'])).toMatchObject(
      {
        a: '', b: '', c: ''
      }
    );
  });

  test('returned object should not match', () => {
    expect(utils.arrayToObjectKeys(['a', 'b'])).not.toMatchObject(
      {
        a: '', b: '', c: ''
      }
    );
  });
});

describe('testing check regex to detect if against pass test of check', () => {
  test('should pass', () => {
    expect(exportedForTesting._checkRegex('_id', 'person_id')).toBe(true);
  });
  test('should not pass', () => {
    expect(exportedForTesting._checkRegex('_id', 'person_name')).not.toBe(true);
  });
});

describe('testing predefined schemas', () => {
  test('should return an object with user schema', () => {
    expect(utils.predefinedSchema('users', 1)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String)
    }));
  });
  test('should return an object with post schema', () => {
    expect(utils.predefinedSchema('posts', 1)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      userId: expect.any(Number),
      title: expect.any(String),
      body: expect.any(String)
    }));
  });
  test('should return an object with todo schema', () => {
    expect(utils.predefinedSchema('todo', 1)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean)
    }));
  });
  test('should return an object with quote schema', () => {
    expect(utils.predefinedSchema('quote', 1)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      body: expect.any(String),
      author: expect.any(String),
      tags: expect.any(Array)
    }));
  });
  test('should return an object with product schema', () => {
    expect(utils.predefinedSchema('product', 1)).toEqual(expect.objectContaining({
      id: expect.any(Number),
      name: expect.any(String),
      description: expect.any(String),
      price: expect.any(String)
    }));
  });
  test('should return an object with unknown schema', () => {
    expect(utils.predefinedSchema('unknown', 1)).toEqual({});
  });
});

describe('testing to camelCase', () => {
  test('should return a camelCase string', () => {
    expect(utils.exportedForTesting._toCamelCase('person_name')).toEqual('personName');
  });
});

describe('testing to object map', () => {
  test('should return an object mapped using the supplied function', () => {
    expect(utils.exportedForTesting._objectMap({ a: 2, b: 4 }, (val, key) => val * 2)).toMatchObject({ a: 4, b: 8 });
  });
});

describe('testing to populate schema using key', () => {
  test('should return an object with populated values', () => {
    expect(utils.populateResponseSchema({ a: '', b: '' }, 1)).toEqual(expect.objectContaining({
      a: expect.any(String),
      b: expect.any(String)
    }));
  });
  test('should return an object with the name__firstName values fetched using faker API', () => {
    expect(utils.populateResponseSchema({ name__firstName: '', b: '' }, 1)).toEqual(expect.objectContaining({
      nameFirstName: expect.any(String),
      b: expect.any(String)
    }));
  });
  test('should return an object with age, name, address email', () => {
    expect(utils.populateResponseSchema({ name: '', age: '', address: '', email: '', id: '' })).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: expect.any(String),
      age: expect.any(Number),
      address: expect.any(Object),
      email: expect.any(String)
    }));
  });
});

describe('testing if faker has the supplied API', () => {
  test('should return function result of API', () => {
    expect(utils.exportedForTesting._checkIfFakerHasAPI('date__recent')).toBeInstanceOf(Date);
  });
  test('should throw an error', () => {
    expect(() => utils.exportedForTesting._checkIfFakerHasAPI('date_recent')).toThrowError(CustomAPIError);
  });
  test('should throw an error', () => {
    expect(() => utils.exportedForTesting._checkIfFakerHasAPI('not__api')).toThrowError(CustomAPIError);
  });
});
