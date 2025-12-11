import Route from '@ember/routing/route';

export default class ScientistsRoute extends Route {
  model() {
    return ["Albert Einstein", "Marie Curie", "Isaac Newton", "Rosalind Franklin"];
  }
}
