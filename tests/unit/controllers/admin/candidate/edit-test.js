import { module, test } from 'qunit';
import { setupTest } from 'ember-resume/tests/helpers';

module('Unit | Controller | admin/candidate/edit', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:admin/candidate/edit');
    assert.ok(controller);
  });
});
