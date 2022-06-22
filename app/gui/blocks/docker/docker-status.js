import {Block} from "../../libraries/blocks.js";
import Control from "../../libraries/controls.js";

export const DockerStatusType = {
    Active : 'active (running)',
    Pending: 'pending',
    Deactivated: 'deactivated'
}

export default class DockerStatus extends Block {
    constructor(id = null, action='index', params={}) {
        super(id, action, params);
        this._tagName = 'span'
        this.Style('float', 'left')
    }

    indexAction(){
        this.renderButtons("Docker", "pending", "pending...")
    }

    activeAction(){
        this.renderButtons("Docker", "active" ,"running")
    }

    deactivatedAction(){
        this.renderButtons("Docker", "deactivated", "not running!")
    }

    renderButtons(app="Docker", status='active', status_label='active') {
        let active = new Control('span');
        active.Attribute('class', status);
        this.Controls.Add(active);

        let label = new Control('span');
        label.Attribute('class', 'label');
        label.innerHTML = app
        this.Controls.Add(label);

        let label_action = new Control('span');
        label_action.Attribute('class', 'label_action');
        label_action.innerHTML = status_label;
        this.Controls.Add(label_action);
    }
}