#include <iostream>
#include <fstream>
#include <cmath>
#include <list>

double func(double t, double x) {
	return 2*t + x + cos(t);
}
double nu(double t, double x) {
	return 0;
}
double gu(double t, double x) {
	return 0;
}

int main()
{
	double x0 = -1;
	double xn = 1;
	double t0 = -1;
	double tn = 1;
	int xcount = 10;
	int tcount = 10;

	double xh = std::abs(tn - x0) / xcount;
	double th = std::abs(tn - t0) / tcount;

	std::list<double> ures;
	std::list<double> xres;
	std::list<double> tres;

	for(double x = x0; x <= xn; x += xh){
		for(double t = t0; t <= tn; t += th) {
			ures.push_back(func(x, t));
			xres.push_back(x);
			tres.push_back(t);
		}
	}

	std::ofstream resultFile("resultfile.json");
	resultFile << "[" << std::endl;
	std::cout << "xh = " << xh << ", th = " << th << ", uressize = " << ures.size() << std::endl;
	int count = ures.size();
	for(int i = 0; i < count; i++) {
		resultFile << "    [" << tres.back() << ", " << xres.back() << ", " << ures.back() << "]," << std::endl;
		tres.pop_back();
		xres.pop_back();
		ures.pop_back();
	}
	resultFile << "]" << std::endl;
	resultFile.close();
	std::cout << "EOW" << std::endl;
	
	return 0;
}
