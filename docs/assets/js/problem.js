import { Utils } from '/assets/js/utils.js';

/** Problem Class **/
/** generic problem - extend in each problem type */
export class Problem {
  constructor(params) {
    this.params = params;
    this.question = '';
    this.answer = '';
  }

}

/** placeholder function - override in each problem type */
Problem.prototype.generate = function() {
}

Problem.prototype.getQuestion = function() {
  return this.question;
}

Problem.prototype.getAnswer = function() {
  return this.answer;
}

Problem.prototype.toString = function() {
  let response = [];

  response.push(this.question, '=', this.answer);

  return response.join(' ');
}
