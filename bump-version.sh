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
    if out != s:
        open(f, "w").write(out)
        print("  stamped", f)
print("  %d script tags now at version %s" % (n, ver))
PY
