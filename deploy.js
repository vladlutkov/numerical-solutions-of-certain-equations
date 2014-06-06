filename = "calc1";

log = function(str) {
  console.log("### Service Action ###");
  console.log("Message: " + str);
  return console.log("######################");
};

var spawn = require("child_process").spawn;

var scp = spawn("scp", [filename + ".cxx", "s0051@umt.imm.uran.ru:~/"]);
var ssh = spawn("ssh", ["-tt", "s0051@umt.imm.uran.ru"]);

var commands = {
  prepare: [
    "mpicxx -o " + filename + " " + filename + ".cxx"
  ],
  execute: [
    "./" + filename
  ],
  terminate: [
    "exit",
    "rm " + filename + " " + filename + ".cxx"
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
