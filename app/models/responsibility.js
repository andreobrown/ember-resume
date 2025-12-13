import Model, { attr, belongsTo } from '@ember-data/model';

export default class ResponsibilityModel extends Model {
  @attr('string') content;
  @attr('number') sortOrder;

  @belongsTo('work-experience', { async: false, inverse: 'responsibilities' }) workExperience;
}
