/**
 * Created by eamonnmaguire on 19/08/2016.
 */

var trends_vis = (function () {


    function calculateWidth(placement_id) {
        return document.getElementById(placement_id).offsetWidth;
    }

    function extendOptions(options, placement) {
        if(!options)
            options = {};

        if (!options.width)
            options.width = calculateWidth(placement.replace('#', ''));

        if (!options.height)
            options.height = 100;

        return options;

    }

    return {
        renderTrendArea: function (placement, data, options) {

            var parseDate = d3.time.format("%Y-%m-%d").parse;

            options = extendOptions(options, placement);

            var x = d3.time.scale()
                .range([0, options.width-10]);

            var y = d3.scale.linear()
                .range([options.height, 0]);

            var area = d3.svg.area()
                .x(function (d) {
                    return x(d.date);
                })
                .y0(options.height)
                .y1(function (d) {
                    return y(d.value);
                });

            var svg = d3.select(placement).append("svg")
                .attr(options)
                .append("g")
                .attr("transform", "translate(5,0)");

            data.forEach(function (d) {
                d.date = parseDate(d.date);
                d.close = +d.value;
            });

            x.domain(d3.extent(data, function (d) {
                return d.date;
            }));

            var min = options.min !== undefined ? options.min : 0;
            var max = options.max ? options.max : d3.max(data, function (d) {
                return d.value;
            });

            y.domain([min, max]);

            svg.append("path")
                .datum(data)
                .attr("class", "trend-area")
                .transition().duration(500)
                .attr("d", area);


        }
    }

})();