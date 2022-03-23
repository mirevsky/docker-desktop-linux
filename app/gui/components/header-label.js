import Control from "../libraries/controls.js";

export default class HeaderLabel extends Control
{
    constructor(label,version) {
        super("div");
        this.label = label;
        this.version = version;
    }

    Render(){
        let label = new Control("span");
        label.Attribute('class', 'label')
        label.innerHTML = this.label;
        this.Controls.Add(label);

        let version = new Control("span");
        version.Attribute('class', 'version')
        version.innerHTML = this.version;
        this.Controls.Add(version);

        return super.Render()
    }
}