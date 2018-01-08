/**
 * angular smooth-scroll
 * 
 * @author atomita
 * @license MIT
 * @version 0.0.3
*/

var SmoothScroll,
  __slice = [].slice;

SmoothScroll = (function() {

  SmoothScroll.name = 'SmoothScroll';

  SmoothScroll.$inject = [];

  function SmoothScroll() {
    this.duration = "normal";
    this.easing = "swing";
  }

  SmoothScroll.prototype.normal = function(target, easing, complete, step) {
    this.to(target, "normal", easing, complete, step);
  };

  SmoothScroll.prototype.slow = function(target, easing, complete, step) {
    this.to(target, "slow", easing, complete, step);
  };

  SmoothScroll.prototype.fast = function(target, easing, complete, step) {
    this.to(target, "fast", easing, complete, step);
  };

  SmoothScroll.prototype.to = function(target, duration, easing, complete, step) {
    var is_comepleted, opt, position;
    position = angular.element(target).offset().top;
    opt = {
      "duration": duration || this.duration,
      "easing": easing || this.easing
    };
    is_comepleted = false;
    if (angular.isFunction(complete)) {
      opt.complete = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (!is_comepleted) complete.apply(null, args);
        return is_comepleted = true;
      };
    }
    if (angular.isFunction(step)) {
      opt.step = (function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        if (!is_comepleted) return step.apply(null, args);
      });
    }
    angular.element("html, body").animate({
      "scrollTop": position
    }, opt);
  };

  return SmoothScroll;

})();

angular.module("flashcoin", []).service("$smoothScroll", SmoothScroll);
