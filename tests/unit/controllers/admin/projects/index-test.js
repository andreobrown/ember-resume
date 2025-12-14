import { module, test } from 'qunit';
import { setupTest } from 'ember-resume/tests/helpers';

module('Unit | Controller | admin/projects/index', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:admin/projects/index');
    assert.ok(controller);
  });
});
