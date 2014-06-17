fs = require("fs");
generateFile = function(data) {
  var code = "\r\n";
  code += "#include <iostream>\r\n";
  code += "#include <fstream>\r\n";
  code += "#include <cmath>\r\n";
  code += "double func(double x, double t, double Utx) {\r\n";
  code += "  return " + data.func + ";\r\n";
  code += "}\r\n";
  code += "double nu(double x) {\r\n";
  code += "  return " + data.nu + ";\r\n";
  code += "}\r\n";
  code += "double gu(double t) {\r\n";
  code += "  return " + data.gu + ";\r\n";
  code += "}\r\n";
  code += "double derivativeFromGu(double t) {\r\n";
  code += "  return " + data.dgu + ";\r\n";
  code += "}\r\n";
  code += "int main()\r\n";
  code += "{\r\n";
  code += "  int M = " + data.tcount + ";\r\n";
  code += "  int N = " + data.xcount + ";\r\n";
  code += "  double a = 1;\r\n";
  code += "  double x0 = " + data.x0 + ";\r\n";
  code += "  double xn = " + data.xn + ";\r\n";
  code += "  double h = std::abs(xn - x0) / (N-1);\r\n";
  code += "  double t0 = " + data.t0 + ";\r\n";
  code += "  double tn = " + data.tn + ";\r\n";
  code += "  double d = std::abs(tn - t0) / (M-1);\r\n";
  code += "  double s = 0.8;\r\n";
  code += "  double U[M][N];\r\n";
  code += "  double X[N];\r\n";
  code += "  for(int i = 0; i < N; i++) {\r\n";
  code += "    X[i] = x0 + i * h;\r\n";
  code += "  }\r\n";
  code += "  double T[M];\r\n";
  code += "  for(int j = 0; j < M; j++) {\r\n";
  code += "    T[j] = t0 + j * d;\r\n";
  code += "  }\r\n";
  code += "  for(int i = 0; i < N; i++) {\r\n";
  code += "    U[0][i] = nu(X[i]);\r\n";
  code += "  }\r\n";
  code += "  for(int j = 0; j < M; j++) {\r\n";
  code += "    U[j][0] = gu(T[j]);\r\n";
  code += "  }\r\n";
  code += "  double Fij;\r\n";
  code += "  double F0j;\r\n";
  code += "  double F0j1;\r\n";
  code += "  double Gj;\r\n";
  code += "  double Gj1;\r\n";
  code += "  for(int j = 0; j < M - 1; j++) {\r\n";
  code += "    Fij = func(X[1], T[j], U[j][1]);\r\n";
  code += "    F0j = func(X[0], T[j], U[j][0]);\r\n";
  code += "    F0j1 = func(X[0], T[j + 1], U[j+1][0]);\r\n";
  code += "    Gj = derivativeFromGu(T[j]);\r\n";
  code += "    Gj1 = derivativeFromGu(T[j + 1]);\r\n";
  code += "    U[j + 1][1] = d*h/(h + 2*a*s*d) *\r\n";
  code += "    ( U[j][1]/d - a*s /(2*h)*(-4*U[j+1][0] -\r\n";
  code += "    2*h/a*(F0j1 - Gj1)) -\r\n";
  code += "    a*(1-s)/(2*h) * (-4*U[j][0] - 2*h/a*(F0j  - Gj) + 4*U[j][1]) + Fij);\r\n";
  code += "    for(int i = 2; i < N; i++)  {\r\n";
  code += "      Fij = func(X[i], T[j], U[j][i]);\r\n";
  code += "      U[j+1][i] = 2*d*h/(2*h+3*a*s*d) *\r\n";
  code += "      (U[j][i]/d - \r\n";
  code += "      a*s/ (2*h)*(U[j+1][i-2] - 4*U[j+1][i-1]) -\r\n";
  code += "      a*(1-s)/(2*h)*(U[j][i-2] - 4*U[j][i-1] + 3*U[j][i]) + Fij);\r\n";
  code += "    }\r\n";
  code += "  }\r\n";
  code += "  return 0;\r\n";
  code += "}\r\n";
  code += "\r\n";
  fs.writeFile("calc.cxx", code);
}
generateFile({
  func: "cos(t) + sin(t) + 2*x",
  nu: "0",
  gu: "sin(t)",
  dgu: "cos(t)",
  x0: "0",
  xn: "3.14159",
  t0: "0",
  tn: "3.14159/2",
  xcount: "101",
  tcount: "101"
})