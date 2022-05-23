public class Fibonacci {
    public int fibon(int n){
        int res[]={0,1};
        if(n<2){
            return res[n];
        }
        int first = 0;
        int second = 1;
        int fibn = 0;
        for(int i = 2; i <= n; i++){
            fibn = first + second;
            first = second;
            second = fibn;
        }
        return fibn;
    }
}
