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
};

generateFile = function(data) {
  var code = "";
  code += "#include <iostream>";
  code += "#include <fstream>";
  code += "#include <cmath>";
  code += "#include <list>";

  code += "double func(double t, double x) {";
  code += "  return 2*t + x + cos(t);";
  code += "}";
  code += "double nu(double t, double x) {";
  code += "  return 0;";
  code += "}";
  code += "double gu(double t, double x) {";
  code += "  return 0;";
  code += "}";

  code += "int main()";
  code += "{";
  code += "  double x0 = -1;";
  code += "  double xn = 1;";
  code += "  double t0 = -1;";
  code += "  double tn = 1;";
  code += "  int xcount = 10;";
  code += "  int tcount = 10;";

  code += "  double xh = std::abs(tn - x0) / xcount;";
  code += "  double th = std::abs(tn - t0) / tcount;";

  code += "  std::list<double> ures;";
  code += "  std::list<double> xres;";
  code += "  std::list<double> tres;";

  code += "  for(double x = x0; x <= xn; x += xh){";
  code += "    for(double t = t0; t <= tn; t += th) {";
  code += "      ures.push_back(func(x, t));";
  code += "      xres.push_back(x);";
  code += "      tres.push_back(t);";
  code += "    }";
  code += "  }";

  code += "  std::ofstream resultFile(\"resultfile.json\");";
  code += "  resultFile << \"[\" << std::endl;";
  code += "  std::cout << \"xh = \" << xh << \", th = \" << th << \", uressize = \" << ures.size() << std::endl;";
  code += "  int count = ures.size();";
  code += "  for(int i = 0; i < count; i++) {";
  code += "    resultFile << \"    [\" << tres.back() << \", \" << xres.back() << \", \" << ures.back() << \"],\" << std::endl;";
  code += "    tres.pop_back();";
  code += "    xres.pop_back();";
  code += "    ures.pop_back();";
  code += "  }";
  code += "  resultFile << \"]\" << std::endl;";
  code += "  resultFile.close();";
  code += "  std::cout << \"EOW\" << std::endl;";
  
  code += "  return 0;";
  code += "}";
  code += "\r\n";
  fs.writeFile("calc.cxx", code);
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
  // for (var i in req.connection) // обращение к свойствам объекта по индексу
  //       console.log("req.connection." + i + " = " + req.connection[i]);
  console.log(req.connection.remoteAddress)
  return res.json({
    status: "ok"
  });
  // generateFile(req.body);
  // postData();
  // return res.json(getData());
});

app.listen(3000);
