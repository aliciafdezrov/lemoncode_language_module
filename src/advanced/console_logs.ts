console.group("ADVANCED 4. TRAZAS POR CONSOLA");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const showMessage = async ([time, message]) => {
    await delay(time);
    console.log(message);
};
const triggers = [
    async () => await showMessage([200, "third"]),
    async () => await showMessage([100, "second"])
];
const run = triggers => {
    triggers.forEach(async (t, i) => {
        if (i === triggers.length - 1) {
            await delay(100);
            triggers[i]();
            await showMessage([100, "first"]);
        } else triggers[i]();
    });
};
run(triggers);

console.groupEnd();