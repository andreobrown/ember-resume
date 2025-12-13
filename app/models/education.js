import Model, { attr } from '@ember-data/model';

export default class EducationModel extends Model {
  @attr('string') degree;
  @attr('string') fieldOfStudy;
  @attr('string') institution;
  @attr('number') graduationYear;
}
