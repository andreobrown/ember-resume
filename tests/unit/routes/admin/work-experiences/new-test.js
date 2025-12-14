import { module, test } from 'qunit';
import { setupTest } from 'ember-resume/tests/helpers';

module('Unit | Route | admin/work-experiences/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:admin/work-experiences/new');
    assert.ok(route);
  });
});
