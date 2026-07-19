const fs = require('fs');
let c = fs.readFileSync('src/utils/testWrapperGenerator.ts','utf8');
c = c.replace(/            result_raw = func\(\*inputs\)\r?\n        } catch \(e\) {/, "            result_raw = func(*inputs)\n###SPLIT###\n        } catch (e) {");
fs.writeFileSync('src/utils/testWrapperGenerator.ts',c);
