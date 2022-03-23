import DockerStatus, {DockerStatusType} from "../blocks/docker/docker-status.js";
import Request, {RequestType} from "../libraries/request.js";
import Header from "../header/header.js";
import Footer from "../footer/footer.js";
import Control from "../libraries/controls.js";
import Section from "../section/section.js";



class DockerDesktop {
    static HealthCheck = () => {
        let response = new Request(RequestType.GET, "/docker/status", (data) => {
            const dockerStatus = new DockerStatus('docker-status', (data === DockerStatusType.Active) ? 'active' : 'deactivated' )
            Control.getById('docker-status').innerHTML = dockerStatus.Render().outerHTML
        });
        setTimeout(DockerDesktop.HealthCheck, 3000);
    }

    static Render = () => {

        const style = new Control("style");
        style.id = "emerald"
        document.head.appendChild(style.Render());

        const messageBox = new Control('div')
        messageBox.Attribute('class', "MessageBox")
        messageBox.Style('display','none')
        document.body.appendChild(messageBox.Render());

        const alertBox = new Control('div')
        alertBox.Attribute('class', "AlertBox")
        alertBox.Style('display','none')
        document.body.appendChild(alertBox.Render());

        const header = new Header()
        document.body.appendChild(header.Render());

        const section = new Section()
        document.body.appendChild(section.Render());

        const footer = new Footer()
        document.body.appendChild(footer.Render());
    }
}

export default DockerDesktop