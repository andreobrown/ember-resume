import { setupTest } from 'ember-resume/tests/helpers';
import { module, test } from 'qunit';

module('Unit | Model | candidate', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    const store = this.owner.lookup('service:store');
    const model = store.createRecord('candidate', {});
    assert.ok(model, 'model exists');
  });
});
