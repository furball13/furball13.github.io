import { Utils } from '/assets/js/utils.js';
import { Problem } from '/assets/js/problem.js';
import { MixedNumber } from '/assets/js/mixednumber.js';

export class FractionProblem extends Problem {
  constructor(params) {
    super();

    // store parameters
    this.negativesAllowed = params.negativesAllowed;
    this.maxDenominator = parseInt(params.maxDenominatorSlider);
    this.mixedNumbers = params.mixedNumbers;
    this.commonDenominator = params.commonDenominator;
    this.regroupingRequired = params.regroupingRequired;
    this.simplifyAnswer = params.simplifyAnswer;

    // initialize internal values
    this.ops = [];
    this.firstTerm = new MixedNumber();
    this.secondTerm = new MixedNumber();
    this.solution = new MixedNumber();

    // set up requested operations
    if (params.additionCheck) { this.ops.push('+'); }
    if (params.subtractionCheck) { this.ops.push('-'); }
    if (params.multiplicationCheck) { this.ops.push('&times;'); }
    if (params.divisionCheck) { this.ops.push('&divide;'); }
  }
}

FractionProblem.prototype.generate = function() {
  this.opChoice = Math.floor(Math.random() * this.ops.length);
  this.generateFirstTerm();
  this.generateSecondTerm();  // includes calculating answer
  this.buildDisplay();
}

/** Generate a single fraction or mixed number within the parameters */
FractionProblem.prototype.generateFirstTerm = function() {
  let whole = 0, num = 1, denom = 2;

  if (this.mixedNumbers != 'never') {
    do {
      whole = Math.floor(Math.random() * 10);
    } while (this.mixedNumbers == 'always' && whole == 0);
  }

  denom = Math.floor(Math.random() * (this.maxDenominator - 1) + 2);

  this.firstTerm = new MixedNumber(whole, num, denom);
  this.firstTerm.reduce();
}

/** Generate a second fraction within the parameters, that also gives an answer within parameters */
FractionProblem.prototype.generateSecondTerm = function() {
  let whole = 0, num = 1, denom = 2;
  let opChoice = 0;

  if (this.mixedNumbers != 'never') {
    do {
      whole = Math.floor(Math.random() * 10); 
    } while (this.mixedNumbers == 'always' && whole == 0);
  }

  do {
    denom = (this.commonDenominator == 'always') ? this.firstTerm.getDenominator : Math.floor(Math.random * (this.maxDenominator - 1) + 2);
  } while (this.commonDenominator == 'never' && denom == this.firstTerm.getDenominator);

  do {
    opChoice = Math.floor(Math.random() * this.ops.length);

    switch (this.ops[opChoice]) {
      case '+':
	break;
      case '-':
	break;
      case '&times;':
	break;
      case '&divide;':
	break;
      default:
        console.log(`Undefined Operation: ${opChoice}`);
	throw new Error('Please choose a valid operation.');
	break;
    }

  } while ( /* answer is unacceptable? || */ (!this.negativesAllowed && (this.solution.whole < 0 || this.solution.num < 0)));
}

FractionProblem.prototype.buildDisplay = function() {
  let questionParts = [];
  let answerParts = [];

  questionParts.push(
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">',
    '<mrow>',
    '<mn>', this.firstTerm.whole || '', '</mn>',
    '<mfrac>',
    '<mn>', this.firstTerm.num, '</mn>',
    '<mn>', this.firstTerm.denom, '</mn>',
    '</mfrac>',
    '<mo>', this.ops[this.opChoice], '</mo>',
    '<mn>', this.secondTerm.whole || '', '</mn>',
    '<mfrac>',
    '<mn>', this.secondTerm.num, '</mn>',
    '<mn>', this.secondTerm.denom, '</mn>',
    '</mfrac>',
    '</mrow>',
    '</math>',
    );

  answerParts.push(
    '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline">',
    '<mrow>',
  );

  if (this.solution.whole) {
    answerParts.push('<mn>', this.solution.whole, '</mn>');
  }

  if (this.solution.num) {
    answerParts.push(
      '<mfrac>',
      '<mn>', this.solution.num, '</mn>',
      '<mn>', this.solution.denom, '</mn>',
      '</mfrac>',
    );
  }

  answerParts.push(
    '</mrow>',
    '</math>',
  );

  this.question = questionParts.join('');
  this.answer = answerParts.join('');
}

window.addEventListener('load', function() {
  const sliders = ['maxDenominator'];
  try {
    for (let i = 0; i < sliders.length; i++) {
      const sliderElement = document.getElementById(sliders[i] + 'Slider');
      if (sliderElement) {
        sliderElement.addEventListener('input', function() {
	  Utils.updateSliderValue(sliderElement);
	});
      }
    }
  } catch(e) {
    console.log('fractions.js:addEventListener error: ' + e.message);
  }
});
