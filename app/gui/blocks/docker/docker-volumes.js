import {Block} from "../../libraries/blocks.js";
import {Table, THead, TBody, TableRow, TableCell, Hyperlink} from "../../libraries/ui.js";
import Control from "../../libraries/controls.js";
import Request, {RequestType} from "../../libraries/request.js";
import DockerAction from "./docker-action.js";

export default class DockerVolumes extends Block {
    indexAction() {
        const columns = ["DRIVER", "VOLUME NAME"]

        let table = new Table();
        let thead = new THead();
        let tr = new TableRow();
        for (let key in columns) {
            let cell = new TableCell();
            let label = new Control('div');
            label.Attribute('class', 'label');
            label.innerHTML = columns[key];
            cell.Controls.Add(label);
            tr.Controls.Add(cell);
        }
        thead.Controls.Add(tr);
        table.Controls.Add(thead);
        let tbody = new TBody();
        tbody.id = "tbody-docker-volumes"
        table.Controls.Add(tbody);
        this.Controls.Add(table);

        this.getDockerVolumes()
        setInterval(this.getDockerVolumes, 30000)
    }

    getDockerVolumes = () => {
        const key_index = 1
        new Request(RequestType.GET, "/docker/volume/list", (data) => {
            data = JSON.parse(data)
            let tbody = new TBody();
            tbody.id = "tbody-docker-volumes"
            for (let item in data.rows) {
                let tr = new TableRow();
                for (let record in data.rows[item]) {
                    let cell = new TableCell()
                    let label = new Control('div');
                    label.Attribute('class', 'label');
                    if (parseInt(record) === key_index) {
                        let link = new Hyperlink(data.rows[item][record], "#" + data.rows[item][record])
                        link.onclick = () => {
                            const docker_action_menu = link.innerRef.parent.parent.firstChild
                            docker_action_menu.style.display = (docker_action_menu.style.display === 'none') ? 'block' : 'none'
                        }
                        label.Controls.Add(link)
                        cell.Controls.Add(new DockerAction('docker-action', 'index', {"is_container": false, "id": data.rows[item][record]}))
                    } else {
                        label.innerHTML = data.rows[item][record];
                    }
                    cell.Controls.Add(label);
                    tr.Controls.Add(cell)
                }
                tbody.Controls.Add(tr)
            }
            Control.getById("tbody-docker-volumes").replaceWith(tbody.Render())
        });
    }
}