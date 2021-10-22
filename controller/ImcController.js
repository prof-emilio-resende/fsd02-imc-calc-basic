class ImcController {
    constructor() {
        this.imcDriver = new ImcDriver();
    }

    async calculate(person) {
        return await this.imcDriver.calculate(person);
    }
}