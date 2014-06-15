#include <iostream>
#include <fstream>
#include <cmath>
#include <list>

double exact(double x, double t){
	return x * x + t * t;
}

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

	double a = 2;

	double x0 = 1;
	double xn = 3;
	double h = std::abs(xn - x0) / (N-1);

	double t0 = 2;
	double tn = 5;
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
	    U[i][0] = nu(X[i]);
	}

	for(int j = 0; j < M; j++) {
		U[0][j] = gu(T[j]);
	}


	double Fij;
	double F0j;
	double F0j1;
	double Gj;
	double Gj1;
	for(int j = 0; j < M - 1; j++) {
		Fij = func(X[1], T[j], U[1][j]);
		F0j = func(X[0], T[j], U[0][j]);
		F0j1 = func(X[0], T[j + 1], U[0][j + 1]);
		Gj = derivativeFromGu(T[j]);
		Gj1 = derivativeFromGu(T[j + 1]);
		U[1][j + 1] = d*h/(h + 2*a*s*d) *
		( U[1][j]/d - a*s /(2*h)*(-4*U[0][j+1] -
		2*h/a*(F0j1 - Gj1)) -
		a*(1-s)/(2*h) * (-4*U[0][j] - 2*h/a*(F0j  - Gj) + 4*U[1][j]) + Fij);
		
		for(int i = 2; i < N; i++)  {
			Fij = func(X[i], T[j], U[i][j]);
			U[i][j+1] = 2*d*h/(2*h+3*a*s*d) * 
			(U[i][j]/d - 
			a*s/ (2*h)*(U[i-2][j+1] - 4*U[i-1][j+1]) -
			a*(1-s)/(2*h)*(U[i-2][j] - 4*U[i-1][j] + 3*U[i][j]) + Fij);
		}
	}

	double diff_norm = 0;
	int Imax = 0;
	int Jmax = 0;
	for(int j = 0; j < M; j++){
		for(int i = 0; i < N; i++) {
			double ex = exact(X[i], T[j]);
			double absolute = std::abs(ex - U[i][j]);
			if(absolute > diff_norm) {
				diff_norm = absolute;
				Imax = i;
				Jmax = j; 
			}
		}
	}

	std::cout << "diff_norm " << diff_norm << std::endl;
	std::cout << "i " << Imax << std::endl;
	std::cout << "j " << Jmax << std::endl;
	// std::ofstream resultFile("resultfile.json");
	// resultFile << "[" << std::endl;
	// std::cout << "xh = " << xh << ", th = " << th << ", uressize = " << ures.size() << std::endl;
	// int count = ures.size();
	// for(int i = 0; i < count-1; i++) {
	// 	resultFile << "    [" << tres.back() << ", " << xres.back() << ", " << ures.back() << "]," << std::endl;
	// 	tres.pop_back();
	// 	xres.pop_back();
	// 	ures.pop_back();
	// }
	// if(count > 0) {
	// 	resultFile << "    [" << tres.back() << ", " << xres.back() << ", " << ures.back() << "]" << std::endl;
	// 	tres.pop_back();
	// 	xres.pop_back();
	// 	ures.pop_back();
	// }
	// resultFile << "]" << std::endl;
	// resultFile.close();
	// std::cout << "EOW" << std::endl;

	return 0;
}
