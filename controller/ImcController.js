import ImcDriver from "../drivers/ImcDriver.js";
export default class ImcController {
    constructor() {
        this.imcDriver = new ImcDriver();
    }

    async calculate(person) {
        return await this.imcDriver.calculate(person);
    }
}