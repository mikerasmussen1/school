#!/usr/bin/env bash
# ============================================================================
# CACHE BUSTING — run this before you push, or the boys get stale JavaScript.
# ----------------------------------------------------------------------------
# GitHub Pages serves curriculum/*.js with no cache headers we control, so a
# browser that already has curriculum/science.js will happily keep using its
# old copy after a deploy. That is not theoretical: it is exactly what hid the
# new level tabs on Word Voyagers and Field Notes while maths — whose chips
# came from a file the browser happened to refetch — showed them correctly.
#
# The fix is a version string on every local script tag. Change the version,
# the URL changes, the browser has no choice but to fetch it again.
#
#   ./bump-version.sh            stamp every page with the current commit
#   ./bump-version.sh 2026-09-03 stamp with something of your own
#
# Safe to run repeatedly; it replaces any existing ?v= rather than stacking.
# ============================================================================
set -euo pipefail
cd "$(dirname "$0")"
VER="${1:-$(git rev-parse --short HEAD)}"

python3 - "$VER" <<'PY'
import re, sys, glob, os
ver = sys.argv[1]
n = 0
for f in ["index.html"] + sorted(glob.glob("*.dc.html")):
    if not os.path.exists(f): continue
    s = open(f).read()
    def bust(m):
        global n
        path = m.group(2).split("?")[0]
        if path.startswith("http"): return m.group(0)
        n += 1
        return m.group(1) + path + "?v=" + ver + m.group(3)
    out = re.sub(r'(<script src=")([^"]+\.js(?:\?v=[^"]*)?)(")', bust, s)

    # A build stamp the page can display. index.html holds the whole app, so a
    # cached copy of it serves old logic however well the scripts are
    # versioned — and there is then no way to tell by looking. Printing the
    # build in the header makes "is this the new version?" answerable in a
    # second instead of a debugging session.
    # Marker must be distinct from the app's own reference to window.__BUILD__,
    # or this "already stamped?" check matches the reader and never writes.
    stamp = '<script data-build>window.__BUILD__="%s";</script>' % ver
    if '<script data-build>' in out:
        out = re.sub(r'<script data-build>.*?</script>', stamp, out, flags=re.S)
    else:
        out = out.replace('</head>', '  ' + stamp + '\n</head>', 1)

    if out != s:
        open(f, "w").write(out)
        print("  stamped", f)
print("  %d script tags now at version %s" % (n, ver))
PY
