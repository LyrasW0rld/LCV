const testCases = [
  'int x = 1; // note: }',
  'std::string s = "hello } { world";',
  'const char* url = "http://foo.bar"; // comment }',
  "char c = '}';",
  '} else if (x > 50) {',
  '} else {',
  'if (a > b) { return "{brace}"; }',
];

for (const tc of testCases) {
  const sanitized = tc
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/\/\/.*$/, '')
    .replace(/#.*$/, '');
  console.log("ORIG:", tc);
  console.log("SANI:", sanitized);
}
