import {Block} from "../../libraries/blocks.js";
import {Table, THead, TBody, TableRow, TableCell, Hyperlink} from "../../libraries/ui.js";
import Request, {RequestType} from "../../libraries/request.js";
import Control from "../../libraries/controls.js";
import DockerAction from "./docker-action.js";

export default class DockerImages extends Block {
    indexAction(){
        const columns = ["CONTAINER ID", "IMAGE", "COMMAND", "CREATED", "STATUS", "PORTS", "NAME"]

        let table = new Table();
        let thead = new THead();
        let tr = new TableRow();
        for(let key in columns){
            let cell = new TableCell();
            let label = new Control('div');
            label.Attribute('class','label');
            label.innerHTML = columns[key];
            cell.Controls.Add(label);
            tr.Controls.Add(cell);
        }
        thead.Controls.Add(tr);
        table.Controls.Add(thead);
        let tbody = new TBody();
        tbody.id = "tbody-docker-images"
        table.Controls.Add(tbody);
        this.Controls.Add(table);

        this.getDockerImages()
        setInterval(this.getDockerImages, 30000)
    }

    getDockerImages = () => {
        const key_index = 0
        new Request(RequestType.GET, "/docker/images/list", (data) => {
            data = JSON.parse(data)
            let tbody = new TBody();
            tbody.id = "tbody-docker-images"
            for(let item in data.rows){
                let tr = new TableRow();
                for(let record in data.rows[item]){
                    let cell = new TableCell()
                    let label = new Control('div');
                    label.Attribute('class','label');
                    if (parseInt(record) === key_index) {
                        let link = new Hyperlink(data.rows[item][record], "#"+data.rows[item][record])
                        link.onclick = () => {
                            const docker_action_menu = link.innerRef.parent.parent.firstChild
                            docker_action_menu.style.display = (docker_action_menu.style.display === 'none') ? 'block' : 'none'
                        }
                        label.Controls.Add(link)
                        cell.Controls.Add(new DockerAction('docker-action','index', { "is_container": true, "id": data.rows[item][record] }))
                    } else {
                        label.innerHTML = data.rows[item][record];
                    }
                    cell.Controls.Add(label);
                    tr.Controls.Add(cell)
                }
                tbody.Controls.Add(tr)
            }
            Control.getById("tbody-docker-images").replaceWith(tbody.Render())
        });
    }
}