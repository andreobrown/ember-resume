import Route from '@ember/routing/route';

export default class ProgrammersRoute extends Route {
  model() {
    return ["Ada Lovelace", "David Heinemeier Hansson", "Grace Hopper", "Linus Torvalds"];
  }
}
