import { setupTest } from 'ember-resume/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | achievement', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('achievement', {});
    assert.ok(model, 'model exists');
  });
});
