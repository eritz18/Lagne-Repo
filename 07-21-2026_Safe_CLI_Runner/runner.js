// runner.js - fill in the TODOs

class ConfigError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ConfigError';
    }
}

function loadThreshold() {
    // TODO 1: read process.env.MAX_ITEMS
    const maxItems = process.env.MAX_ITEMS;

    // TODO 2: if it's missing, throw a ConfigError
    if (!maxItems) {
        throw new ConfigError("MAX_ITEMS environment variable is missing.");
    }

    // TODO 3: otherwise return it as a Number
    return Number(maxItems);
}

async function run(items) {
    const limit = loadThreshold();

    if (items.length > limit) {
        throw new Error(`Too many items: ${items.length} > ${limit}`);
    }

    return items.map(i => i.toUpperCase());
}

const verbose = process.argv.includes("--verbose");

// TODO 4: wrap run([...]) in try/catch
(async () => {
    try {
        const result = await run(["apple", "banana", "orange"]);
        console.log(result);
    } catch (err) {

        // TODO 5: if verbose, console.log the full error stack; otherwise just err.message
        if (verbose) {
            console.log(err.stack);
        } else {
            console.log(err.message);
        }

        process.exit(1);
    }
})();

// TODO 6: add a top-level process.on('unhandledRejection', ...) as a final safety net
process.on("unhandledRejection", (err) => {
    if (verbose) {
        console.log(err.stack);
    } else {
        console.log(err.message);
    }

    process.exit(1);
});