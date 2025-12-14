import { module, test } from 'qunit';
import { setupTest } from 'ember-quickstart/tests/helpers';

module('Unit | Route | admin/education/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin/education/new');
    assert.ok(route);
  });
});
