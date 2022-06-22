import Control from "../libraries/controls.js";
import HeaderLabel from "../components/header-label.js";
import Request, {RequestType} from "../libraries/request.js";

export default class Header extends Control
{
    constructor() {
        super("header");
    }

    Render(){
        let dockerDetails = new Control("div");
        dockerDetails.Attribute('class', 'docker_details');
        this.Controls.Add(dockerDetails)
        new Request(RequestType.GET, "/distro/", (data) => {
            const r = data.replace(/"/g,"").split("\n")
            const dockerDetails = Control.getByClassName('docker_details')[0]
            dockerDetails.append(new HeaderLabel("OS", r[0]).Render());
            dockerDetails.append(new HeaderLabel("Version", r[1]).Render());
        })

        return super.Render()
    }
}