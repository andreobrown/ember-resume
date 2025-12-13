import Model, { attr, hasMany } from '@ember-data/model';

export default class WorkExperienceModel extends Model {
  @attr('string') company;
  @attr('string') location;

  @hasMany('job-title', { async: false, inverse: 'workExperience' }) jobTitles;
  @hasMany('responsibility', { async: false, inverse: 'workExperience' }) responsibilities;
  @hasMany('achievement', { async: false, inverse: 'workExperience' }) achievements;
}
