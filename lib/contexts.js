export const LoginRequestContext = {
  muAccount: 'http://mu.semte.ch/vocabularies/account/',
  pav: 'http://purl.org/pav/',
  organization: {
    '@id': 'pav:createdBy',
    '@type': '@id',
  },
  key: 'muAccount:key',
  publisher: 'pav:providedBy',
  uri: {
    '@type': '@id',
    '@id': '@id',
  },
};

export const LoginResponseContext = {
  muAccount: 'http://mu.semte.ch/vocabularies/account/',
  mu: 'http://mu.semte.ch/vocabularies/core/',
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  session: 'http://mu.semte.ch/vocabularies/session/',
  dct: 'http://purl.org/dc/terms/',
  uuid: {
    '@id': 'mu:uuid',
  },
  account: {
    '@id': 'muAccount:account',
    '@type': '@id',
  },
  created: {
    '@id': 'dct:created',
  },
};

export const LoginResponseFrame = {
  '@context': LoginResponseContext,
  //'@type': 'session:Session',
  uuid: {
    '@embed': '@always',
  },
  account: {
    '@embed': '@always',
  },
  created: {
    '@embed': '@always',
  },
};

export const ErrorResponseContext = {
  xsd: 'http://www.w3.org/2001/XMLSchema#',
  oslc: 'http://open-services.net/ns/core#',
  mu: 'http://mu.semte.ch/vocabularies/core/',
  uuid: {
    '@id': 'mu:uuid',
  },
  errorMessage: {
    '@id': 'oslc:message',
  },
};

export const ErrorResponseFrame = {
  '@context': ErrorResponseContext,
  //'@type': 'oslc:Error',
  uuid: {
    '@embed': '@always',
  },
  errorMessage: {
    '@embed': '@always',
  },
};
