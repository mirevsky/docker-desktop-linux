import logging
import webview

from contextlib import redirect_stdout
from io import StringIO
from server import server

logger = logging.getLogger(__name__)


def resize(window):
    window.resize(640, 480)


if __name__ == '__main__':
    stream = StringIO()
    with redirect_stdout(stream):
        window = webview.create_window('Docker Desktop', server, resizable=False)
        webview.start(resize, window, debug=True)
