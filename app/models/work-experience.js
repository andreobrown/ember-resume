import Model, { attr, hasMany } from '@ember-data/model';

export default class WorkExperienceModel extends Model {
  @attr('string') company;
  @attr('string') location;

  @hasMany('job-title', { async: true, inverse: 'workExperience' }) jobTitles;
  @hasMany('responsibility', { async: true, inverse: 'workExperience' }) responsibilities;
  @hasMany('achievement', { async: true, inverse: 'workExperience' }) achievements;
}
