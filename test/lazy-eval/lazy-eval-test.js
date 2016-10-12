var expect = require('chai').expect;
hook = require('hook-std')

describe('lazy-eval', function () {

  var debug;

  describe('enabled', function () {
    before(function () {

      debug = require('../../')();
      debug.save('enabled');
      debug.enable(debug.load())
      debug = debug('enabled');
    })

    it('handles functions', function () {
      unhook = hook.stderr(function (str) {
        expect(str.match(/crap/)).to.be.ok;
        expect(str.match(/enabled/)).to.be.ok;
      });
      debug(function () {return 'crap';});
      unhook();
    });

    it('normal', function () {
      unhook = hook.stderr(function (str) {
        expect(str.match(/crap/)).to.be.ok;
        expect(str.match(/enabled/)).to.be.ok;
      });
      debug('crap');
      unhook();
    });
  });

  describe('disabled', function () {
    before(function () {

      debug = require('../../')();
      debug.save(null);
      debug.enable(debug.load())
      debug = debug('disabled');
    })

    it('handles functions', function () {
      var called = false;

      unhook = hook.stderr(function () {
        called = true;
      });

      debug(function () {
        called = true;
        return 'crap';
      });
      unhook();
      expect(called).to.not.be.ok;
    });

    it('normal', function () {
      var called = false;

      unhook = hook.stderr(function () {
        called = true;
      });

      debug('crap');
      unhook();
      expect(called).to.not.be.ok;
    });
  });

});
