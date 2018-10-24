(function ($) {

    "use strict";

    var buttons_move = function() {
        return this.init.apply(this, arguments);
    };

    $.extend(buttons_move, {
        options: {
            buttonSelector: '[data-button]',
            direction: 'forward' //or back
        },

        $element: undefined,

        $buttons: undefined,

        positions: [],

        count: 0,

        init: function (element, options) {
            if (element === undefined) return;

            var me = this;

            me.$element = $(element);
            me.options = $.extend(me.options, options);
            me.$buttons = me.$element.find(this.options.buttonSelector);

            if (me.$buttons.length < 2) return;

            me.count = me.$buttons.length - 1;

            me.prepare();

            me.bind();
        },

        prepare: function () {
            var me = this;

            me.$buttons.each(function (i) {
                var $this = $(this);
                var left = $this.offset().left;
                var top = $this.offset().top;

                $this.css({
                    'top' : top,
                    'left' : left
                });

                $this.data('state', i);

                me.positions.push(top);
            });

            me.$element.css('position', 'relative');
            me.$buttons.css('position', 'absolute');
        },

        bind: function () {
            var me = this;

            $(document).on('click', this.options.buttonSelector, function () {

                me.$buttons.each(function () {
                    var $this = $(this);
                    var state = $this.data('state');
                    var nextState = me.getNextState(state);

                    $this.data('state', nextState);

                    $this.css('top', me.positions[nextState]);
                });

                return false;
            });
        },

        getNextState: function (state) {
            if (this.options.direction === 'back') {
                var nextState = state - 1;

                if (nextState < 0) {
                    nextState = this.count;
                }

                return nextState;
            }

            if (this.options.direction === 'forward') {
                var nextState = state + 1;

                if (nextState > this.count) {
                    nextState = 0;
                }

                return nextState;
            }

            return state;
        }
    });

    return $.fn.buttons_move = function (options) {
        return buttons_move.init(this, options);
    };
})(jQuery);