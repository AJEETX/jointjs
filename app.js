// Canvas where shapes are dropped
var graph = new joint.dia.Graph,
  paper = new joint.dia.Paper({
    el: $('#paper'),
    model: graph,
            defaultLink: new joint.dia.Link({
            attrs: { '.marker-target': { d: 'M 10 0 L 0 5 L 10 10 z' } }
        }),
        validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
            // Prevent linking from input ports.
            if (magnetS && magnetS.getAttribute('port-group') === 'in') return false;
            // Prevent linking from output ports to input ports within one element.
            if (cellViewS === cellViewT) return false;
            // Prevent linking to input ports.
            return magnetT && magnetT.getAttribute('port-group') === 'in';
        },
        // Enable marking available cells & magnets
        markAvailable: true,
        // Enable link snapping within 50px lookup radius
        snapLinks: { radius: 50 },
        gridSize: 20,
        // drawGrid: true
  });

// Canvas from which you take shapes
var stencilGraph = new joint.dia.Graph,
  stencilPaper = new joint.dia.Paper({
    el: $('#stencil'),
//    height: 60,
    model: stencilGraph,
    interactive: false,
    gridSize: 20,
    // drawGrid: true    
  });

var init = new joint.shapes.devs.Model({
  name:'Initialize',
  position: { x: 20, y: 10 },
  size: { width: 100, height: 50 },
  outPorts: ['out'],
  ports: {
    groups: {
      'out': {
        position: "right",
        portLabelMarkup: '<text fill="white"/>',
        attrs: {
          '.port-body': {
            r: "10",
            fill: {
              type: 'linearGradient',
              stops: [{
                offset: '5%',
                color: 'white'
              }, {
                offset: '50%',
                color: '#3498DB'
              }],
              attrs: {
                x1: '0%',
                y1: '0%',
                x2: '0%',
                y2: '100%'
              }
            },
            stroke:'gray'
          },
          '.port-label': {
            fill: "black",
            stroke:'#000'
          }
        }
      }
    }
  },
  attrs: {
    '.label': { text: 'Initialize', 'ref-x': .5, 'ref-y': .2,stroke:'#000' },
    rect: {
      rx: 5, ry: 5 ,
      stroke: '#ccc',
      fill: {
        type: 'linearGradient',
        stops: [{
          offset: '5%',
          color: 'white'
        }, {
          offset: '50%',
          color: 'gold'
        }],
        attrs: {
          x1: '0%',
          y1: '0%',
          x2: '0%',
          y2: '100%'
        }
      }
    }
  }
});
init.attr({
  image: {
    // pointerdown on the image SVG node will trigger the `element:delete` event
    event: 'element:delete',
    position: { x: 20, y: 10 },
    xlink: 'd:\\a.png',
    width: 50,
    height: 50
  }
})


var step = new joint.shapes.devs.Model({
  name:'workflow step',
  position: { x: 40, y: 90 },
    size: { width: 170, height: 85 },
    inPorts: ['in'],
    outPorts: ['out','error'],
    ports: {
        groups: {
            'in': {
                position: "left",
                attrs: {
                    '.port-body': {
                        r: "10",
                        fill: {
                          type: 'linearGradient',
                          stops: [{
                            offset: '5%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'gold'
                          }],
                          attrs: {
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                          }
                        },
                        magnet: 'passive',
                        stroke:'gray'
                    },
                    '.port-label': {
                    fill: "#000",
                    // stroke:'#ddd'
                  }
                }
            },
            'out': {
                position: "right",
                portLabelMarkup: '<text fill="white"/>',
                attrs: {
                    '.port-body': {
                        r: "10",
                        fill: {
                          type: 'linearGradient',
                          stops: [{
                            offset: '5%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'gold'
                          }],
                          attrs: {
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                          }
                        },
                        stroke:'gray'
                    },
                    '.port-label': {
                        fill: "#000",
                        // stroke:'#000'
                      }
                }
            }
        }
    },
    attrs: {
        rect: {
          rx: 5, ry: 5 ,
          stroke: '#ccc',
          fill: {
            type: 'linearGradient',
            stops: [{
              offset: '5%',
              color: 'white'
            }, {
              offset: '50%',
              color: '#3498DB'
            }],
            attrs: {
              x1: '0%',
              y1: '0%',
              x2: '0%',
              y2: '100%'
            }
          }
        },
        circle: {
          stroke: 'gray'
        },
        '.label': {
          text: ' workflow step',
          'ref-y': 10,
          stroke:'#000'
        },
        image: {
          'xlink:href': 'd:\\a.png',
          width: 30,
          height: 20,
          'ref-x': .1,
          'ref-y': .2,
          ref: 'rect',
          'x-alignment': 'middle',
          'y-alignment': 'middle'
        }
      }
  });

var complete = new joint.shapes.devs.Model({
  name:'complete',
    position: { x: 30, y: 350 },
    size: { width: 100, height: 50 },
    inPorts: ['in'],
    ports: {
        groups: {
            'in': {
                position: "left",
                attrs: {
                    '.port-body': {
                        r: "10",
                        fill: {
                          type: 'linearGradient',
                          stops: [{
                            offset: '5%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: '#3498DB'
                          }],
                          attrs: {
                            x1: '0%',
                            y1: '0%',
                            x2: '0%',
                            y2: '100%'
                          }
                        },
                        magnet: 'passive',
                        stroke:'gray'
                    },
                  '.port-label': {
                    fill: "#000",
                    // stroke:'#000'
                  }
                }
            }
        }
    },
    attrs: {
        '.label': { text: 'complete', 'ref-x': .5, 'ref-y': .2,stroke:'#000' },
        rect: {
          rx: 5, ry: 5 ,
            stroke: '#d1d1d1',
            fill: {
              type: 'linearGradient',
              stops: [{
                offset: '5%',
                color: 'white'
              }, {
                offset: '50%',
                color: 'gold'
              }],
              attrs: {
                x1: '0%',
                y1: '0%',
                x2: '0%',
                y2: '100%'
              }
            }
          }
    }
  });
stencilGraph.addCells([init,step,complete])

stencilPaper.on('cell:pointerdown', function(cellView, e, x, y) {
    $('body').append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;"></div>');
    var flyGraph = new joint.dia.Graph,
      flyPaper = new joint.dia.Paper({
        el: $('#flyPaper'),
        model: flyGraph,
        height: 30,
        width: 100,
        interactive: false
      }),
      flyShape = cellView.model.clone(),
      pos = cellView.model.position(),
      offset = {
        x: x - pos.x,
        y: y - pos.y
      };
  
    flyShape.position(0, 0);
    flyGraph.addCell(flyShape);
    $("#flyPaper").offset({
      left: e.pageX - offset.x,
      top: e.pageY - offset.y
    });
    $('body').on('mousemove.fly', function(e) {
      $("#flyPaper").offset({
        left: e.pageX - offset.x,
        top: e.pageY - offset.y
      });
    });
    $('body').on('mouseup.fly', function(e) {
      var x = e.pageX,
        y = e.pageY,
        target = paper.$el.offset();
      
      // Dropped over paper ?
      if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
        var s = flyShape.clone();
        s.position(x - target.left - offset.x, y - target.top - offset.y);
        graph.addCell(s);
      }
      $('body').off('mousemove.fly').off('mouseup.fly');
      flyShape.remove();
      $('#flyPaper').remove();
    });
  });
  
paper.on('cell:pointerclick', function(cellView, evt, x, y) { 
    console.log('pointerclick ' + cellView.model.prop('type'))
    $('#blockname').val( cellView.model.attributes.name)
  });
paper.on('cell:pointerup', function(cellView, e, x, y) {
      
  $('#blockname').val(cellView.model.attributes.name + ' pointerup '+ cellView.model.prop('type') )
  });

paper.on('cell:pointerdown', function(cellView, e, x, y) {
      
  $('#blockname').val(cellView.model.attributes.name +' pointerdown '+ cellView.model.prop('type'))
  });
  graph.on('change:position', function(element, position) {
    $('#blockname').val('Element ' + element.id + ' moved to ' + position.x + ',' + position.y);
  });
  // Binding handler to the event
paper.on('element:delete', function(elementView, evt) {
  // Stop any further actions with the element view e.g. dragging
  evt.stopPropagation();
  if (confirm('Are you sure you want to delete this element?')) {
      elementView.model.remove();
  }
});

paper.on('element:mouseenter',function(elementView){

  $('#blockname').val(elementView.model.attributes.name);
})

paper.on('link:mouseenter', function(linkView) {
  $('#blockname').val(linkView.showTools());
});

paper.on('link:mouseleave', function(linkView) {
  $('#blockname').val(linkView.hideTools());
});


paper.on('blank:pointerdblclick', function() {
  resetAll(this);

  // init.attr('body/visibility', 'hidden');
  // init.attr('label/visibility', 'hidden');

  this.drawBackground({
      color: 'orange'
  })
});
paper.on('element:pointerdblclick', function(elementView) {
  resetAll(this);

  var currentElement = elementView.model;
  currentElement.attr('body/stroke', 'orange')
});

paper.on('link:pointerdblclick', function(linkView) {
  resetAll(this);

  var currentLink = linkView.model;
  currentLink.attr('line/stroke', 'orange')
  currentLink.label(0, {
      attrs: {
          body: {
              stroke: 'orange'
          }
      }
  })
});

paper.on('cell:pointerdblclick', function(cellView) {
  var isElement = cellView.model.isElement();
  var message = (isElement ? 'Element' : 'Link') + ' clicked';
  // init.attr('label/text', message);

  // init.attr('body/visibility', 'visible');
  // init.attr('label/visibility', 'visible');
});

function resetAll(paper) {
  paper.drawBackground({
      color: 'white'
  })

  var elements = paper.model.getElements();
  for (var i = 0, ii = elements.length; i < ii; i++) {
      var currentElement = elements[i];
      currentElement.attr('body/stroke', 'black');
  }

  var links = paper.model.getLinks();
  for (var j = 0, jj = links.length; j < jj; j++) {
      var currentLink = links[j];
      currentLink.attr('line/stroke', 'black');
      currentLink.label(0, {
          attrs: {
              body: {
                  stroke: 'black'
              }
          }
      })
  }
}
graph.on('change:position', function(cell) {
  var center = cell.getBBox().center();
  var label = center.toString();
  cell.attr('label/text', label);
});

graph.on('change:target', function(cell) {
  var target = new g.Point(cell.target());
  var label = target.toString();
  cell.label(0, {
      attrs: {
          label: {
              text: label
          }
      }
  });
});