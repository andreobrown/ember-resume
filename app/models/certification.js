import Model, { attr } from '@ember-data/model';

export default class CertificationModel extends Model {
  @attr('string') name;
  @attr('string') issuer;
  @attr('date') dateEarned;
}
