import { Utils } from '/assets/js/utils.js';
import { Problem } from '/assets/js/problem.js';

export class ArithmeticProblem extends Problem {
  constructor(params) {
    super();
    this.negativesAllowed = params.negativesAllowed;
    this.oneMagnitude = parseInt(params.oneMagnitude);
    this.twoMagnitude = parseInt(params.twoMagnitude);
    this.ops = [];
    this.questionParts = [];

    if (params.additionCheck) { this.ops.push('+'); }
    if (params.subtractionCheck) { this.ops.push('-'); }
    if (params.multiplicationCheck) { this.ops.push('&times;'); }
    if (params.divisionCheck) { this.ops.push('&divide;'); }
  }
}

ArithmeticProblem.prototype.generate = function() {
  let a = 0, b = 0, opChoice = 0, ans = 0;
  const oneMin = this.negativesAllowed ? 0 - this.oneMagnitude : 0;
  const oneMax = this.oneMagnitude;
  const twoMin = this.negativesAllowed ? 0 - this.twoMagnitude : 0;
  const twoMax = this.twoMagnitude;

  do {
    a = Utils.randomIntegerInRange(oneMin, oneMax);
    b = Utils.randomIntegerInRange(twoMin, twoMax);

    opChoice = Math.floor(Math.random() * this.ops.length);

    switch (this.ops[opChoice]) {
      case '+': ans = (a + b); break;
      case '-': ans = (a - b); break;
      case '&times;': ans = (a * b); break;
      case '&divide;': ans = (a / b); break;
      default:
        console.log(`Undefined Operation: ${opChoice}`);
	throw new Error('Please choose a valid operation.');
    }
  } while ( !Number.isInteger(ans) || (!this.negativesAllowed && ans < 0) );

  this.questionParts.push(
    ((a < 0) ? '(' : ''), a, ((a < 0) ? ')' : ''),
    this.ops[opChoice],
    ((b < 0) ? '(' : ''), b, ((b < 0) ? ')' : ''),
    );
  this.question = this.questionParts.join(' ');
  this.answer = ans;
}
