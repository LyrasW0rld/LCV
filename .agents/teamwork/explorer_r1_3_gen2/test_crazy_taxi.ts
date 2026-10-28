const fnRegex =
  /^\s*(?:(?:export\s+)?(?:public|private|protected|internal|pub(?:\([^)]+\))?|static|virtual|inline|async|unsafe|extern|final)\s+)*(?:(?:def|fn|function)\s+|(?:\b(?:void|int|float|double|bool|boolean|string|char|auto|size_t|uint\d+_t|int\d+_t|[A-Z][a-zA-Z0-9_<>:*&]*)\b(?:\s*\*|\s*&)?\s+))([a-zA-Z_][a-zA-Z0-9_]*)\s*\(([^)]*)\)|^\s*(?:const|let|var)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(?:async\s*)?\([^)]*\)\s*=>/;

const files = [
  `void InitializeFrameworkMod(int versionFlags) {
       HookCrazyDriftPhysics(60.0f);
   }
   void HookCrazyDriftPhysics(float tickRate) {
   }`,
  `public class VehiclePhysicsController : MonoBehaviour {
       public void ApplyCrazyDashImpulse(float thrust, float deltaTick) {
       }
       public void StabilizeChassisSuspension() {
       }
   }`
];

files.forEach((f, idx) => {
  console.log(`\nTest file ${idx}:`);
  f.split('\n').forEach(l => {
    const t = l.trim();
    if (!t) return;
    const m = t.match(fnRegex);
    if (m) console.log(`  Matched: ${m[1] || m[2]} in: ${t}`);
  });
});
