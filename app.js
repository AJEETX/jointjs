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
        // Enable link snapping within 75px lookup radius
        snapLinks: { radius: 50 },
        gridSize: 20,
        drawGrid: true
  });

// Canvas from which you take shapes
var stencilGraph = new joint.dia.Graph,
  stencilPaper = new joint.dia.Paper({
    el: $('#stencil'),
//    height: 60,
    model: stencilGraph,
    interactive: false,
    gridSize: 20,
    drawGrid: true    
  });

  var init = new joint.shapes.devs.Model({
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
                            offset: '0%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'black'
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
                      // stroke:'#000'
                  }
                }
            }
        }
    },
    attrs: {
        '.label': { text: 'Initialize', 'ref-x': .5, 'ref-y': .2,stroke:'#000' },
        rect: {
            stroke: '#ccc',
            fill: {
              type: 'linearGradient',
              stops: [{
                offset: '0%',
                color: 'white'
              }, {
                offset: '50%',
                color: '#d1d1d1'
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

var step = new joint.shapes.devs.Model({
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
                            offset: '0%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'black'
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
                            offset: '0%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'black'
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
          stroke: '#ccc',
          fill: {
            type: 'linearGradient',
            stops: [{
              offset: '0%',
              color: 'white'
            }, {
              offset: '50%',
              color: '#d1d1d1'
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
          text: ' WORKFLOW',
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
                            offset: '0%',
                            color: 'white'
                          }, {
                            offset: '50%',
                            color: 'black'
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
            stroke: '#d1d1d1',
            fill: {
              type: 'linearGradient',
              stops: [{
                offset: '0%',
                color: 'white'
              }, {
                offset: '50%',
                color: '#d1d1d1'
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
      console.log(cellView.model.prop('type'))
  })