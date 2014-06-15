var execSync = require("exec-sync");

function fnShowProps(obj, objName){
    var result = "";
    for (var i in obj) // обращение к свойствам объекта по индексу
        result += objName + "." + i + " = " + obj[i] + "\n";
    console.log(result);
}

postData = function () {
  fnShowProps(execSync("scp calc.cxx s0051@umt.imm.uran.ru:~/", true), "scp");
  fnShowProps(execSync("ssh s0051@umt.imm.uran.ru \"source .bash_profile; ./execute.sh\"", true), "bash execute.sh");
  fnShowProps(execSync("scp s0051@umt.imm.uran.ru:~/resultfile.json .", true), "scp");
}

postData();
