import { module, test } from 'qunit';
import { setupTest } from 'ember-resume/tests/helpers';

module('Unit | Route | admin/education/index', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin/education/index');
    assert.ok(route);
  });
});
