var app, express, fs, log;

fs = require("fs");
express = require("express");
app = express();
app.use(require("body-parser")());
app.use(require("method-override")());
app.use("/", express["static"]("site/"));

log = function(str) {
  console.log("### Service Action ###");
  console.log("Message: " + str);
  return console.log("######################");
}

generateFile = function(data) {
  var code = "\r\n";
  code += "#include <iostream>\r\n";
  code += "#include <fstream>\r\n";
  code += "#include <cmath>\r\n";
  code += "#include <list>\r\n";
  code += "double func(double t, double x) {\r\n";
  code += "  return " + data.func + ";\r\n";
  code += "}\r\n";
  code += "double nu(double t, double x) {\r\n";
  code += "  return " + data.nu + ";\r\n";
  code += "}\r\n";
  code += "double gu(double t, double x) {\r\n";
  code += "  return " + data.gu + ";\r\n";
  code += "}\r\n";
  code += "int main()\r\n";
  code += "{\r\n";
  code += "  double x0 = " + data.x0 + ";\r\n";
  code += "  double xn = " + data.xn + ";\r\n";
  code += "  double t0 = " + data.t0 + ";\r\n";
  code += "  double tn = " + data.tn + ";\r\n";
  code += "  int xcount = " + data.xcount + ";\r\n";
  code += "  int tcount = " + data.tcount + ";\r\n";

  code += "  double xh = std::abs(tn - x0) / xcount;\r\n";
  code += "  double th = std::abs(tn - t0) / tcount;\r\n";

  code += "  std::list<double> ures;\r\n";
  code += "  std::list<double> xres;\r\n";
  code += "  std::list<double> tres;\r\n";

  code += "  for(double x = x0; x <= xn; x += xh){\r\n";
  code += "    for(double t = t0; t <= tn; t += th) {\r\n";
  code += "      ures.push_back(func(x, t));\r\n";
  code += "      xres.push_back(x);\r\n";
  code += "      tres.push_back(t);\r\n";
  code += "    }\r\n";
  code += "  }\r\n";
  code += "  std::ofstream resultFile(\"resultfile.json\");\r\n";
  code += "  resultFile << \"[\" << std::endl;\r\n";
  code += "  std::cout << \"xh = \" << xh << \", th = \" << th << \", uressize = \" << ures.size() << std::endl;\r\n";
  code += "  int count = ures.size();\r\n";
  code += "  for(int i = 0; i < count; i++) {\r\n";
  code += "    resultFile << \"    [\" << tres.back() << \", \" << xres.back() << \", \" << ures.back() << \"],\" << std::endl;\r\n";
  code += "    tres.pop_back();\r\n";
  code += "    xres.pop_back();\r\n";
  code += "    ures.pop_back();\r\n";
  code += "  }\r\n";
  code += "  resultFile << \"]\" << std::endl;\r\n";
  code += "  resultFile.close();\r\n";
  code += "  std::cout << \"EOW\" << std::endl;\r\n";
  code += "  return 0;\r\n";
  code += "}\r\n";
  code += "\r\n";
  fs.writeFileSync("calc.cxx", code);
}

postData = function(formula) {
  var spawn = require("child_process").spawn;

  var scp = spawn("scp", ["calc.cxx", "s0051@umt.imm.uran.ru:~/"]);
  var ssh = spawn("ssh", ["-tt", "s0051@umt.imm.uran.ru"]);

  var commands = {
    prepare: [
      "rm resultfile.json",
      "mpicxx -o calc calc.cxx"
    ],
    execute: [
      "./calc"
    ],
    terminate: [
      "exit",
      "rm calc calc.cxx"
    ]
  };

  ssh.stdout.on('data', function (data) {
    console.log('stdout: ' + data);

    if (("" + data).indexOf("EOW") != -1) {
      spawn("scp", ["s0051@umt.imm.uran.ru:~/resultfile.json", "."]);
    }

    if (("" + data).indexOf("[s0051@umt ~]$") == -1) return;

    if (commands.prepare.length != 0) {
      console.log('===prepare===');
      ssh.stdin.write(commands.prepare.pop() + "\r\n");
      return;
    }
    if (commands.execute.length != 0) {
      console.log('===execute===');
      ssh.stdin.write(commands.execute.pop() + "\r\n");
      return;
    }
    if (commands.terminate.length != 0) {
      console.log('===terminate===');
      ssh.stdin.write(commands.terminate.pop() + "\r\n");
      return;
    }
  });

  ssh.stderr.on('data', function (data) {
    console.log('stderr: ' + data);
  });
}

app.get("/", function(req, res) {
  return fs.readFile("site/index.html", function(err, html) {
    if (err) {
      throw err;
    }
    res.writeHeader(200, {
      "Content-Type": "text/html"
    });
    res.write(html);
    return res.end();
  });
});

app.post("/data", function(req, res) {
  generateFile(req.body);
  postData();
  return res.json({
    status: "ok",
    url: "resultfile.json"
  });
});

app.listen(3000);
