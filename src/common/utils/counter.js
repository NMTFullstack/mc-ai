function countTo(element, options) {
    options = options || {};

    const settings = Object.assign(
        {},
        countTo.defaults,
        {
            from: element.dataset.from,
            to: element.dataset.to,
            speed: element.dataset.speed,
            refreshInterval: element.dataset.refreshInterval,
            decimals: element.dataset.decimals,
        },
        options
    );

    // How many times to update the value, and how much to increment the value on each update
    const loops = Math.ceil(settings.speed / settings.refreshInterval);
    const increment = (settings.to - settings.from) / loops;

    // References & variables that will change with each update
    let loopCount = 0;
    let value = settings.from;
    const data = {};

    // If an existing interval can be found, clear it first
    if (data.interval) {
        clearInterval(data.interval);
    }

    data.interval = setInterval(updateTimer, settings.refreshInterval);

    // Initialize the element with the starting value
    render(value);

    // function updateTimer() {
    //     value += increment;
    //     loopCount++;

    //     render(value);

    //     if (typeof settings.onUpdate === "function") {
    //         settings.onUpdate.call(element, value);
    //     }

    //     if (loopCount >= loops) {
    //         // Remove the interval
    //         clearInterval(data.interval);
    //         value = settings.to;

    //         if (typeof settings.onComplete === "function") {
    //             settings.onComplete.call(element, value);
    //         }
    //     }
    // }

    // function render(value) {
    //     const formattedValue = settings.formatter.call(
    //         element,
    //         value,
    //         settings
    //     );
    //     element.innerHTML = formattedValue;
    // }
}

// Default options for countTo
countTo.defaults = {
    from: 0, // The number the element should start at
    to: 0, // The number the element should end at
    speed: 1000, // How long it should take to count between the target numbers
    refreshInterval: 100, // How often the element should be updated
    decimals: 0, // The number of decimal places to show
    formatter: formatter, // Handler for formatting the value before rendering
    onUpdate: null, // Callback method for every time the element is updated
    onComplete: null, // Callback method for when the element finishes updating
};

function formatter(value, settings) {
    console.log(settings);
    console.log(value);
    return value?.toFixed(settings.decimals);
}

// Start all the timers

function count(element) {
    const options = Object.assign({}, element.dataset.countToOptions);
    countTo(element, options);
}

export default count;
