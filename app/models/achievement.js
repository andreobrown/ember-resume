import Model, { attr, belongsTo } from '@ember-data/model';

export default class AchievementModel extends Model {
  @attr('string') content;
  @attr('number') sortOrder;

  @belongsTo('work-experience', { async: false, inverse: 'achievements' }) workExperience;
}
