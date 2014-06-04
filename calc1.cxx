#include <iostream>
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

	std::list <double> u;
	std::list <double> x;
	std::list <double> t;

	for(double x = x0; x <= xn; x += xh){
		for(double t = t0; t <= tn; t += th) {
			u.push_back(func(x, t));
			x.push_back(x);
			t.push_back(t);
		}
	}

	
	for(int i = 0; i < u.size(); i++) {
		std::cout << "(" << t.pop_back() << ", " << x.pop_back() << ", " << u.pop_back() << ")";
	}
	
	return 0;
}
