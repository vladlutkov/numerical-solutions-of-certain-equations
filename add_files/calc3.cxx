#include <iostream>
#include <fstream>
#include <cmath>
#include <list>

double func(double x, double t, double Utx) {
	return 2 * t + 4 * x;
}
double nu(double x) {
	return x * x + 4;
}
double gu(double t) {
	return 1 + t * t;
}
double derivativeFromGu(double t) {
	return 2 * t;
}

int main()
{
	int M = 101;
	int N = 101;

	double a = 1;

	double x0 = 0;
	double xn = 3.14159;
	double h = std::abs(xn - x0) / (N-1);

	double t0 = 0;
	double tn = 3.14159 / 2;
	double d = std::abs(tn - t0) / (M-1);

	double s = 0.8;

	double U[M][N];

	double X[N];
	for(int i = 0; i < N; i++) {
		X[i] = x0 + i * h;
	}

	double T[M];
	for(int j = 0; j < M; j++) {
		T[j] = t0 + j * d;
	}

	for(int i = 0; i < N; i++) {
		U[0][i] = nu(X[i]);
	}

	for(int j = 0; j < M; j++) {
		U[j][0] = gu(T[j]);
	}


	double Fij;
	double F0j;
	double F0j1;
	double Gj;
	double Gj1;
	for(int j = 0; j < M - 1; j++) {
		Fij = func(X[1], T[j], U[j][1]);
		F0j = func(X[0], T[j], U[j][0]);
		F0j1 = func(X[0], T[j + 1], U[j+1][0]);
		Gj = derivativeFromGu(T[j]);
		Gj1 = derivativeFromGu(T[j + 1]);
		U[j + 1][1] = d*h/(h + 2*a*s*d) *
		( U[j][1]/d - a*s /(2*h)*(-4*U[j+1][0] -
		2*h/a*(F0j1 - Gj1)) -
		a*(1-s)/(2*h) * (-4*U[j][0] - 2*h/a*(F0j  - Gj) + 4*U[j][1]) + Fij);
		
		for(int i = 2; i < N; i++)  {
			Fij = func(X[i], T[j], U[j][i]);
			U[j+1][i] = 2*d*h/(2*h+3*a*s*d) *
			(U[j][i]/d - 
			a*s/ (2*h)*(U[j+1][i-2] - 4*U[j+1][i-1]) -
			a*(1-s)/(2*h)*(U[j][i-2] - 4*U[j][i-1] + 3*U[j][i]) + Fij);
		}
	}

	
	std::ofstream resultFile("resultfile.json");
	resultFile << "{" << std::endl;
	resultFile << "  x: [" << std::endl;
	for(int i = 0; i < N-1; i++) {
		resultFile << "    " << X[i] << ","<< std::endl;
	}
	resultFile << "    " << X[N] << "],"<< std::endl;

	resultFile << "  t: [" << std::endl;
	for(int j = 0; j < M-1; j++) {
		resultFile << "    " << T[j] << ","<< std::endl;
	}
	resultFile << "    " << T[M] << "],"<< std::endl;

	resultFile << "  u: [" << std::endl;
	for(int j = 0; j < M-1; j++){
		resultFile << "    [";
		for(int i = 0; i < N-1; i++) {
			resultFile << U[j][i] << ", ";
		}
		resultFile << U[j][N] << "]," << std::endl;
	}
	resultFile << "    [";
	for(int i = 0; i < N-1; i++) {
		resultFile << U[M][i] << ", ";
	}
	resultFile << U[M][N] << "]" << std::endl;

	resultFile << "}" << std::endl;
	resultFile.close();
	std::cout << "EOW" << std::endl;

	return 0;
}
