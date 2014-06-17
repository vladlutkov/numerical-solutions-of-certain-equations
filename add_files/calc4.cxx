#include <iostream>
#include <fstream>
#include <cmath>
#include <list>
#include <cstring>
#include "mpi.h"

double exact(double x, double t){
	return cos(x)*sin(t);
}

double func(double x, double t, double Utx) {
	return cos(t + x) + Utx - cos(x) * sin(t);
}
double nu(double x) {
	return 0;
}
double gu(double t) {
	return sin(t);
}
double derivativeFromGu(double t) {
	return cos(t);
}

int main(int argc, char **argv)
{
	int rank, size, type = 99;
	MPI_Status status;
	MPI_Init(&argc, &argv);
	MPI_Comm_size(MPI_COMM_WORLD, &size);
	MPI_Comm_rank(MPI_COMM_WORLD, &rank);
	std::cout << "init " << size << " " << rank << std::endl;

	double inf = 1.7e308;

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
	for(int i = 0; i < N; i++) {
		for(int j = 0; j < M; j++) {
			U[j][i] = inf;
		}
	}

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

	for(int j = rank; j < M - 1; j++) {
		if(U[1][j + 1] != inf) {
			std::cout << "process " << rank << " has continued main" << std::endl;
			continue;
		}
		while(U[1][j] == inf){
			std::cout << "process " << rank << " waiting to receive in main" << std::endl;
			MPI_Recv(&U, M*N, MPI_DOUBLE, MPI_ANY_SOURCE, type, MPI_COMM_WORLD, &status);
		}
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
			if(U[i][j + 1] != inf) {
				std::cout << "process " << rank << " has breaked sub" << std::endl;
				break;
			}
			while(U[i][j] == inf){
				std::cout << "process " << rank << " waiting to receive in sub" << std::endl;
				MPI_Recv(&U, M*N, MPI_DOUBLE, MPI_ANY_SOURCE, type, MPI_COMM_WORLD, &status);	
			}
			U[i][j+1] = 2*d*h/(2*h+3*a*s*d) *
			(U[i][j]/d - 
				a*s/ (2*h)*(U[i-2][j+1] - 4*U[i-1][j+1]) -
				a*(1-s)/(2*h)*(U[i-2][j] - 4*U[i-1][j] + 3*U[i][j]) + Fij);
			if(i%50 == 0) {
				for (int k = 0; k < size; k++) {
					if(k != rank) {
						std::cout << "process " << rank << " send array to " << K << std::endl;
						MPI_Send(&U, M*N, MPI_DOUBLE, k, type, MPI_COMM_WORLD);
					}
				}
			}
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
	std::cout << "final " << size << " " << rank << std::endl;
	MPI_Finalize();
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

// int main(int argc, char **argv){
// 	std::cout << "Hello" << std::endl;
// 	char message[20];
// 	int i, rank, size, type = 99;
// 	MPI_Status status;
// 	MPI_Init(&argc, &argv);
// 	MPI_Comm_size(MPI_COMM_WORLD, &size);
// 	MPI_Comm_rank(MPI_COMM_WORLD, &rank);
// 	if (rank == 0) {
// 		strcpy(message, "Hello, world!");
// 		for (i = 1; i < size; i++) {
// 			MPI_Send(message, 14, MPI_CHAR, i, type, MPI_COMM_WORLD);
// 		}
// 	}
// 	else {
// 		MPI_Recv(message, 20, MPI_CHAR, 0, type, MPI_COMM_WORLD, &status);
// 	}
// 	printf("Message from process = %d : %.14s\n", rank, message);
// 	MPI_Finalize();
// 	return 0;
// }
	// int M = 101;
	// int N = 101;
	// double U[M][N];
	// if(rank == 0){
	// 	for(int i = 0; i < N; i++) {
	// 		for(int j = 0; j < M; j++) {
	// 			U[j][i] = 0;
	// 		}
	// 	}
	// 	for (int k = 1; k < size; k++) {
	// 		MPI_Send(&U, M*N, MPI_DOUBLE, k, type, MPI_COMM_WORLD);
	// 	}

	// } else {
	// 	std::cout << "before: " << std::endl;
	// 	for(int i = 0; i < N; i++) {
	// 		for(int j = 0; j < M; j++) {
	// 			std::cout << U[j][i] << " ";
	// 		}
	// 		std::cout << std::endl;
	// 	}
	// 	MPI_Recv(&U, M*N, MPI_DOUBLE, MPI_ANY_SOURCE, type, MPI_COMM_WORLD, &status);
	// 	std::cout << "after: " << std::endl;
	// 	for(int i = 0; i < N; i++) {
	// 		for(int j = 0; j < M; j++) {
	// 			std::cout << U[j][i] << " ";
	// 		}
	// 		std::cout << std::endl;
	// 	}
	// }