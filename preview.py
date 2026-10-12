"""Serve the portfolio locally and open it with native ES module support."""

from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
import webbrowser


def main():
    handler = partial(
        SimpleHTTPRequestHandler,
        directory=str(Path(__file__).resolve().parent),
    )
    with ThreadingHTTPServer(("127.0.0.1", 0), handler) as server:
        url = f"http://127.0.0.1:{server.server_port}/index.html#projets"
        print(f"Portfolio: {url}", flush=True)
        print("Keep this window open. Press Ctrl+C to stop the preview.", flush=True)
        webbrowser.open(url)
        try:
            server.serve_forever()
        except KeyboardInterrupt:
            pass


if __name__ == "__main__":
    main()
