var mediator = ((function() {

	var events = [];

	var subscribe = function(event, method) {

		if (!events[event]) {

			events[event] = [];

		}

		events[event].push({ context: this, callback: method });

		return this;
	};

	var publish = function(event) {	
        var response;

        if (!events[event]) {

            return false;

        }

        // Get Published Arguments
        args = Array.prototype.slice.call(arguments, 1);
        var length = events[event].length;

        for (var i = 0; i < length; i++) {

            var subscription = events[event][i];
            var context = subscription.context;
            var callback = subscription.callback;
            var fn = (typeof callback == "string" || (typeof callback == "object" && callback.constructor === String)) 
            	? context[callback] : callback;

            response = fn.apply(context, args);

        }

        return response || this;
	};

	var eventExist = function(event) {

		return events[event] ? true : false;

	};

	var removeEvent = function(event) {

		if (!eventExist(event)){

			return false;

		}

		delete events[event];
		return true;
	};

	var appendTo = function (obj) {
        obj.subscribe = subscribe;
        obj.publish = publish;
        obj.removeEvent = removeEvent;

        return obj;
    };

	return {
		subscribe: subscribe,
		publish: publish,
		removeEvent: removeEvent,
		appendTo: appendTo
	};

})());