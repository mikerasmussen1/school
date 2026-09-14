/* Stamp every curriculum <script> with a token derived from file CONTENT.
 *
 * Hand-typed ?v= tokens went stale repeatedly: registry.js was edited without
 * a bump, so browsers kept a cached copy whose ALL_LESSONS predated the change
 * and every fix looked like it had done nothing. A content hash cannot drift —
 * change any curriculum file and the token changes with it.
 *
 * Run: node scripts/stamp-version.js   (after changing anything in curriculum/)
 */
const fs=require("fs"), path=require("path"), crypto=require("crypto");
const ROOT=path.join(__dirname,".."), IDX=ROOT+"/index.html";
let page=fs.readFileSync(IDX,"utf8");
const files=[...new Set([...page.matchAll(/curriculum\/([^"?]+\.js)/g)].map(m=>m[1]))].sort();
const h=crypto.createHash("sha1");
files.forEach(f=>{ try{ h.update(f); h.update(fs.readFileSync(ROOT+"/curriculum/"+f)); }catch(e){} });
const token=h.digest("hex").slice(0,12);
const before=[...new Set([...page.matchAll(/curriculum\/[^"?]+\.js\?v=([^"]+)/g)].map(m=>m[1]))];
page=page.replace(/(curriculum\/[^"?]+\.js)\?v=[^"]+/g,(m,p1)=>p1+"?v="+token);
fs.writeFileSync(IDX,page);
console.log("  curriculum files hashed : "+files.length);
console.log("  token before            : "+before.join(", "));
console.log("  token now               : "+token);
