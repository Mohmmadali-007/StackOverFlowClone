const crypto = require('crypto');
const config = require('config');

const cryptoKey = config.get('CRYPTO_KEY');
const saltLength = config.get('SALT_LENGTH');
const algorithm = 'aes-192-cbc';

const encrypt = (value) => {
  if (value === undefined || value === null) {
    return value;
  }
  const key = crypto.createCipher(algorithm, cryptoKey);
  let hex = key.update(value, 'utf8', 'hex');
  hex += key.final('hex');
  return hex;
};

const encryptValues = (object) => {
  if (!object) {
    return object;
  }
  for (const i of Object.keys(object)) {
    if (object[i] === undefined || object[i] === null) {
      continue;
    }
    if (typeof object[i] === 'boolean' || typeof object[i] === 'number') {
      object[i] = object[i].toString();
    }
    object[i] = exports.encrypt(object[i]);
  }
  return object;
};

const decryptValues = (object) => {
  if (!object) {
    return object;
  }
  for (const i of Object.keys(object)) {
    if (object[i] === undefined || object[i] === null) {
      continue;
    }
    object[i] = exports.decrypt(object[i]);
  }
  return object;
};

const generateHash = (value) => {
  const salt = generateSalt(saltLength);
  const hash = md5(value + salt);
  return salt + hash;
};

const validateHash = (hash, value) => {
  const salt = hash.substr(0, saltLength);
  const validHash = salt + md5(value + salt);
  return hash === validHash;
};

const decrypt = (value) => {
  const key = crypto.createDecipher(algorithm, cryptoKey);
  let pass = key.update(value, 'hex', 'utf8');
  pass += key.final('utf8');
  return pass;
};

const getDecrypted = (value) => {
  return value ? decrypt(value) : null;
};

const generateSalt = (len) => {
  const set = '3hi34tk34nt4nntn43t';
  const setLen = set.length;
  let salt = '';
  for (let index = 0; index < len; index++) {
    const p = Math.floor(Math.random() * setLen);
    salt += set[p];
  }
  return salt;
};

const md5 = (string) => {
  return crypto.createHash('md5').update(string).digest('hex');
};

module.exports = {
  md5,
  generateSalt,
  getDecrypted,
  decrypt,
  encrypt,
  encryptValues,
  decryptValues,
  generateHash,
  validateHash,
};
