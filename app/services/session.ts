import Service from '@ember/service';
import { inject as service } from '@ember-decorators/service';
import DS from 'ember-data';
import User from 'cg/models/user';

export default class Session extends Service.extend({
  // anything which *must* be merged to prototype here
}) {
  @service('store')
  storeService!: DS.Store;

  user?: User;
  isAuthenticated = false;

  async signin(email: string) {
    let store = this.storeService;
    let user = await store.queryRecord('user', { email });

    window.localStorage.setItem('userId', user.id);
    
    this.setProperties({
      user,
      isAuthenticated: true
    });
  }

  async signup(email: string) {
    let store = this.storeService;

    await store.createRecord('user', { email });
  }

  async signout() {
    window.localStorage.removeItem('userId');

    this.setProperties({
      user: undefined,
      isAuthenticated: false
    });
  }

  async restoreSession() {
    let store = this.storeService;
    let userId = window.localStorage.getItem('userId');

    if (userId) {
      let user = await store.findRecord('user', String(userId));

      this.setProperties({
        user,
        isAuthenticated: true
      });
    }
  }
}

// DO NOT DELETE: this is how TypeScript knows how to look up your services.
declare module '@ember/service' {
  interface Registry {
    'session': Session;
  }
}
