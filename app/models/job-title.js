import Model, { attr, belongsTo } from '@ember-data/model';

export default class JobTitleModel extends Model {
  @attr('string') title;
  @attr('date') startDate;
  @attr('date') endDate;
  @attr('boolean', { defaultValue: false }) isLeadership;

  @belongsTo('work-experience', { async: false, inverse: 'jobTitles' }) workExperience;
}
