/**
 * The Element unit events related methods test-case
 *
 * Copyright (C) 2008-2009 Nikolay V. Nemshilov aka St. <nemshilov#gma-il>
 */
var ElementEventsTest = TestCase.create({
  name: 'ElementEventsTest',
  
  setUp: function() {
    this.el = new Element('div');
    document.body.appendChild(this.el);
  },
  
  tearDown: function() {
    this.el.remove();
  },
  
  testObserve: function() {
    var wired = false;
    this.assertSame(this.el, this.el.observe('click', function() { wired = true; }));
    this.fireClick(this.el);
    this.assert(wired);
  },
  
  testObserve_nameVariations: function() {
    var clicked = false;
    var hovered = false;
    this.el.observe('onclick', function() { clicked = true; });
    this.el.observe('onMouseOver', function() { hovered = true; });
    
    this.fireClick(this.el);
    this.fireMouseOver(this.el);
    
    this.assert(clicked);
    this.assert(hovered);
  },
  
  testObserve_aHash: function() {
    var clicked = false;
    var hovered = false;
    
    this.assertSame(this.el, this.el.observe({
      click:     function() {clicked = true},
      mouseover: function() {hovered = true}
    }));
    
    this.fireClick(this.el);
    this.fireMouseOver(this.el);
    
    this.assert(clicked);
    this.assert(hovered);
  },
  
  testObserves: function() {
    var func = function() {};
    this.el.observe('click', func);
    
    this.assert(this.el.observes('click'));
    this.assert(this.el.observes('click', func));
    
    this.assertFalse(this.el.observes('mouseover'));
    this.assertFalse(this.el.observes('click', function() {}));
    
    this.el.observe('mouseover', function() {});
    
    this.assert(this.el.observes({
      click: func
    }));
    
    this.assert(this.el.observes({
      click: func,
      mouseover: null
    }));
    
    this.assertFalse(this.el.observes({
      click: func,
      mousedown: null
    }));
  },
  
  testStopObserving: function() {
    var clicked1 = false;
    var clicked2 = false;
    
    var func1 = function() {clicked1 = true;};
    var func2 = function() {clicked2 = true;};
    
    this.el.observe('click', func1);
    this.el.observe('click', func2);
    
    this.assertSame(this.el, this.el.stopObserving('click', func1));
    
    this.fireClick(this.el);
    
    this.assertFalse(clicked1);
    this.assert(clicked2);
    
    this.assertFalse(this.el.observes('click', func1));
    this.assert(this.el.observes('click'));
    
    var clicked1 = false;
    var clicked2 = false;
    
    this.assertSame(this.el, this.el.stopObserving('click'));
    
    this.fireClick(this.el);
    
    this.assertFalse(clicked1);
    this.assertFalse(clicked2);
    
    this.assertFalse(this.el.observes('click'));
  }
});