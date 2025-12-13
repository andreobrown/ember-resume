import Model, { attr } from '@ember-data/model';

export default class CandidateModel extends Model {
  @attr('string') name;
  @attr('string') tagline;
  @attr('string') email;
  @attr('string') phone;
  @attr('string') location;
  @attr('string') website;
  @attr('string') linkedin;
  @attr('string') profile;
  @attr() skills;
}

