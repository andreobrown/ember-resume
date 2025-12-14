import { module, test } from 'qunit';
import { setupTest } from 'ember-resume/tests/helpers';

module('Unit | Route | admin/candidate/edit', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin/candidate/edit');
    assert.ok(route);
  });
});
