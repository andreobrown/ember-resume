import { setupTest } from 'ember-quickstart/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | responsibility', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('responsibility', {});
    assert.ok(model, 'model exists');
  });
});
