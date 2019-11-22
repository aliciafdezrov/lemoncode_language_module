console.group("5. SLOT MACHINE");

class SlothMachine {
    private coinsCount: number;

    constructor() {
        this.coinsCount = 0;
    }

    private getRandomBoolean(): boolean {
        return Math.random() >= 0.5;
    }

    private setCoinsCount(newCount: number): void {
        this.coinsCount = newCount;
    }

    play(): void {
        if (this.getRandomBoolean() === this.getRandomBoolean() === this.getRandomBoolean() === true) {
           console.log(`Congratulations!!!. You won ${this.coinsCount} coins!!`);
           this.setCoinsCount(0);

        } else {
            console.log("Good luck next time!!");
            this.setCoinsCount(this.coinsCount+1);
        }
    }
}
const machine1 = new SlothMachine();
machine1.play();
machine1.play();
machine1.play();
machine1.play();
machine1.play();

console.groupEnd();