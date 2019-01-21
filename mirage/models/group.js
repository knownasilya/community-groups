import { Model, hasMany, belongsTo } from 'ember-cli-mirage';

export default Model.extend({
  members: hasMany('user'),
  leader: belongsTo('user')
});
