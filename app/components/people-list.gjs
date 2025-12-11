import { on } from '@ember/modifier';
import { fn } from '@ember/helper';
import { tracked } from '@glimmer/tracking';
import Component from '@glimmer/component';

export default class extends Component {
  @tracked currentPerson;

  showPerson = (person) => {
    this.currentPerson = person;
  };

  isCurrentPerson = (person) => {
    return this.currentPerson === person;
  };

  <template>
    <h2>{{@title}}</h2>

    <ul>
    {{#each @people as |person|}}
        <li>
          <button type="button" {{ on "click" (fn this.showPerson person)}}>{{person}}</button>
          {{#if (this.isCurrentPerson person)}}
            ⬅️
          {{/if}}
          </li>
      {{/each}}
    </ul>
  </template>

}
