import {Block} from "../../libraries/blocks.js";

export default class DockerCommands extends Block {
    indexAction(){

    }

    start_containerAction(){
        console.log("start_containerAction");
    }

    restart_containerAction(){
        console.log("restart_containerAction");
    }

    stop_containerAction(){
        console.log("stop_containerAction");
    }

    ssh_containerAction(){
        //docker exec -it $2 /bin/bash
    }

    start_dockerAction(){
        console.log("startAction");
    }

    restart_dockerAction(){
        console.log("restartAction");
    }

    stop_dockerAction(){
        console.log("stopAction");
    }
}