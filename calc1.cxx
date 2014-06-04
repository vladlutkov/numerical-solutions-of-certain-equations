#include <stdio.h>
#include <math.h>
#include <list.h>


int main()
{
	double x0 = -1;
	double xn = 1;
	double t0 = -1;
	double tn = 1;
	int xcount = 10;
	int tcount = 10;

	double xh = abs(tn - x0) / xcount;
	double th = abs(tn - t0) / tcount;

	list <double[3]> result;
	for(double x = x0; x <= xn; x += xh){
		for(double t = t0; t <= tn; t += th) {
			double[3] res = {x, t, func(x, t)};
			list.push_back(res);
			printf("(%f, %f, %f)\n", res[0], res[1], res[2]);
		}
	}
	
	return 0;
}
double func(t, x) {
	return 2*t + x + cos(t);
}
double nu(t, x) {
	return 0;	
}
double gu(t, x) {
	return 0;	
}