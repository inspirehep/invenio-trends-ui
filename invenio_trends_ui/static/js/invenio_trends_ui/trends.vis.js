/**
 * Created by eamonnmaguire on 19/08/2016.
 */

var trends_vis = (function () {

    var visPlacement, legendPlacement;

    var calculateWidth = function (placement_id) {
        return document.getElementById(placement_id).offsetWidth;
    };

    var extendOptions = function (options, placement) {
        if (!options)
            options = {};

        if (!options.width)
            options.width = calculateWidth(placement.replace('#', ''));

        if (!options.height)
            options.height = 100;

        return options;

    };

    var mouseOver = function (d) {

        console.log(d);
        d3.select(visPlacement + ' svg').selectAll('.trend-line').transition().style('opacity', function (item) {
            return (item.name !== d) ? 0.1 : 1;
        });

        d3.select(visPlacement + ' svg').selectAll('.trend-marker').transition().style('opacity', function (item) {
            return (item.name !== d) ? 0.0 : 1;
        });
    };

    var renderLegend = function (data, colors) {
        var div = d3.select(legendPlacement).append('div').attr('class', 'container-fluid');

        var group = div.selectAll('.legend-group').data(Object.keys(data))
            .enter().append('div').attr('class', 'row legend-group');


        var group_item = group.append('div').attr('class', 'col-md-10');

        group_item.html(function (d) {
            return d;
        }).style('color', function (d) {
            return colors(d)
        });

        group.append('div').attr('class', 'col-md-2').attr('id', function (d) {
            return d.replace(' ', '');
        });

        var sub_group = group.selectAll('.sub-group').data(function (d) {
            return data[d];
        }).enter().append('div').attr('class', 'row-fluid legend-subgroup');

        sub_group.append('div').attr('class', 'col-md-10').html(function (d) {
            return d;
        }).style('color', function (d) {
            return colors(d)
        });

        sub_group.append('div').attr('class', 'col-md-2').attr('id', function (d) {
            return d.replace(' ', '');
        });


        sub_group.on('mouseover', mouseOver);
        group_item.on('mouseover', mouseOver);

        group.on('mouseout', function (d) {
            d3.select(visPlacement + ' svg').selectAll('.trend-line').transition().style('opacity', 1);
            d3.select(visPlacement + ' svg').selectAll('.trend-marker').transition().style('opacity', 1);
        });
    };

    return {
        renderTrendArea: function (placement, data, options) {

            var parseDate = d3.time.format('%Y-%m-%d').parse;

            options = extendOptions(options, placement);

            var x = d3.time.scale().range([0, options.width - 10]);
            var y = d3.scale.linear().range([options.height, 0]);

            var area = d3.svg.area()
                .x(function (d) {
                    return x(d.date);
                })
                .y0(options.height)
                .y1(function (d) {
                    return y(d.value);
                });

            var svg = d3.select(placement).append('svg')
                .attr(options)
                .append('g')
                .attr('transform', 'translate(5,0)');

            data.forEach(function (d) {
                d.date = parseDate(d.date);
            });

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            var min = options.minValue !== undefined ? options.minValue : 0;
            var max = options.maxValue ? options.maxValue : d3.max(data, function (d) {
                return d.value;
            });

            y.domain([min, max]);

            svg.append('path')
                .datum(data)
                .attr('class', 'trend-area')
                .transition().duration(500)
                .attr('d', area);
        },

        renderCompositeTrends: function (vis_placement, legend_placement, data, legend_groups, options) {

            visPlacement = vis_placement;
            legendPlacement = legend_placement;
            var parseDate = d3.time.format('%Y-%m-%d').parse;
            var color = d3.scale.ordinal().range(['#34495e', '#2980b9',
                '#f39c12', '#d35400', '#e74c3c', '#95a5a6']);
            var margin = 25;

            options = extendOptions(options, vis_placement);

            d3.select(vis_placement).html('');
            d3.select(legend_placement).html('');

            var svg = d3.select(vis_placement).append('svg')
                .attr(options)
                .append('g');


            var x = d3.time.scale().range([margin, options.width - margin]);
            var y = d3.scale.linear().range([options.height - margin, margin]);

            data.forEach(function (composite_item) {
                composite_item.series.forEach(function (series_item) {
                    series_item.date = parseDate(series_item.date);
                    series_item.value = +series_item.value;
                    series_item.name = composite_item.name;
                })
            });

            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom');

            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left');

            var line = d3.svg.line()
                .interpolate('linear')
                .x(function (d) {
                    return x(d.date);
                })
                .y(function (d) {
                    return y(d.value);
                });

            var min = options.minValue !== undefined ? options.minValue : 0;
            var max = options.maxValue ? options.maxValue : d3.max(data, function (d) {
                return d.value;
            });

            x.domain([parseDate(options.minDate), parseDate(options.maxDate)]);
            y.domain([min, max]);

            svg.append('g')
                .attr('class', 'x axis')
                .attr('transform', 'translate(' + margin + ', ' + (options.height - margin) + ')')
                .call(xAxis);

            svg.append('g')
                .attr('class', 'y axis')
                .attr('transform', 'translate(' + margin + ',' + (y.range()[1] - margin) + ')')
                .call(yAxis)
                .append('text')
                .attr('transform', 'rotate(-90)')
                .attr('y', 10)
                .attr('x', -72)
                .attr('dy', '0em')
                .style('text-anchor', 'start')
                .text('Occurrences');

            var plot = svg.selectAll('g.composite-item')
                .data(data).enter().append('g');

            plot.append('path')
                .datum(function (d) {
                    return {'name': d.name, 'series': d.series};
                })
                .attr('id', function (d) {
                    return d.name.replace(' ', '');
                })
                .attr('class', function (d) {
                    return 'trend-line tr-' + d.name.replace(' ', '');
                })
                .attr('d', function (d) {
                    return line(d.series)
                })
                .style('stroke', function (d) {
                    return color(d.name)
                });

            plot.selectAll('circle')
                .data(function (d) {
                    return d.series;
                }).enter().append('circle')
                .attr('class', function (d) {
                    return 'trend-marker tr-' + d.name.replace(' ', '');
                })
                .attr('cx', function (d) {
                    return x(d.date)
                })

                .attr('cy', function (d) {
                    return y(d.value)
                })
                .attr('r', 3)
                .style('stroke', function (d) {
                    return color(d.name)
                })
                .style('fill', function (d) {
                    return color(d.name)
                });


            renderLegend(legend_groups, color);


        }
    }

})();