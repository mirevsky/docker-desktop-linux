import json
import os
import webview
from flask import Flask, render_template, jsonify, request
import xml.etree.ElementTree as ET

gui_dir = os.path.join(os.path.dirname(__file__), '../..', 'gui')  # development path

if not os.path.exists(gui_dir):
    gui_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'gui')

server = Flask(__name__, static_folder=gui_dir, template_folder=gui_dir, static_url_path="")
server.config['SEND_FILE_MAX_AGE_DEFAULT'] = 1


def etree_to_dict(t):
    d = {t.tag: map(etree_to_dict, t.iterchildren())}
    d.update(('@' + k, v) for k, v in t.attrib.iteritems())
    d['text'] = t.text
    return d


@server.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store'
    return response


@server.route('/')
def landing():
    """
    Render index.html. Initialization is performed asynchronously in initialize() function
    """
    return render_template('index.html', token=webview.token)

@server.route('/inner/')
def inner():
    """
    Render index.html. Initialization is performed asynchronously in initialize() function
    """
    return render_template('templates/inner.html', token=webview.token)


def exec(cmd=''):
    return os.popen(cmd.rstrip()).read()

@server.route('/docker/login', methods=['POST'])
def docker_login():
    username = request.form['username']
    password = request.form['password']
    exec('./authomathon.sh docker login %s %s'.format(username, password))
    return ''

@server.route('/docker/', methods=['POST'])
def docker():
    action = request.form['cmd']
    exec('./authomathon.sh sudo systemctl %s docker'.format(action))
    return action


@server.route('/docker/status', methods=['GET'])
def docker_status():
    cmd_request = exec('systemctl status docker')
    cmd_lines = cmd_request.splitlines()
    for idx, line in enumerate(cmd_lines):
        if "Active:" in line.strip():
            tmp = line.strip().split(":")
            return tmp[1].strip()[0: tmp[1].strip().find(")") + 1]

    return ''

@server.route('/docker/images/list', methods=['GET'])
def docker_images_list():
    cmd_request = exec('docker ps -a')
    result = {
        "columns": [],
        "rows": []
    }
    cmd_lines = cmd_request.splitlines()
    for idx, line in enumerate(cmd_lines):
        tmp = line.split("  ")
        new_tmp = []
        for ydx, tmp_line in enumerate(tmp):
            if tmp_line.strip() != '':
                new_tmp.append(tmp_line.strip())

        result["columns"] = new_tmp if idx == 0 else result["rows"].append(new_tmp)

    return result


@server.route('/docker/volume/list', methods=['GET'])
def docker_volumes_list():
    cmd_request = exec('docker volume ls')
    result = {
        "columns": [],
        "rows": []
    }
    cmd_lines = cmd_request.splitlines()
    for idx, line in enumerate(cmd_lines):
        tmp = line.split("  ")
        new_tmp = []
        for ydx, tmp_line in enumerate(tmp):
            if tmp_line.strip() != '':
                new_tmp.append(tmp_line.strip())

        result["columns"] = new_tmp if idx == 0 else result["rows"].append(new_tmp)

    return result


@server.route('/cmd/', methods=['POST'])
def cmd():
    cmd_request = request.form['cmd'].split()
    cmd = ''
    for arg_index in range(0, len(cmd_request)):
        cmd += cmd_request[arg_index] + " "
    return exec(cmd)


@server.route('/cmd/prune', methods=['POST'])
def prune():
    cmd_request = request.form['cmd'].split("&&")
    cmd = ''
    for arg_index in range(0, len(cmd_request)):
        cmd += exec(cmd_request[arg_index]) + "\n"
    return cmd