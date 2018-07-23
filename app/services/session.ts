import Service from '@ember/service';

export default class Session extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  isAuthenticated = false;
  // normal class body definition here
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'session': Session;
  }
}
