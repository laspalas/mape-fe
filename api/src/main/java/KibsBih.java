import ilog.concert.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Arrays;

import ilog.cplex.*;


public class KibsBih {
    static int I;
    static int n; //broj drzava.
    static double[][] solution;
    static double[][] y_ij;
    static double[] l_m;
    static double[] u_m;
    static double[] interval_limit;
    static List<Map<String, Object>> finalCombResult;
    static Map<String, Double> finalKibsResult;

    public KibsBih(double[][] indicatorPerRegions,
                   double[] lower_limit,
                   double[] upper_limit,
                   double[] interval_values) {
        y_ij = indicatorPerRegions;
        I = y_ij[0].length;
        n = y_ij.length;
        solution = new double[n][I];
        l_m = lower_limit;
        u_m = upper_limit;
        interval_limit = interval_values;

    }

    public List<Map<String, Object>> getFinalCombResult() {

        return finalCombResult;

    }

    public Map<String, Double> getFinalKibsResult() {

        return finalKibsResult;

    }


    public static void combine_3(double[][] input) {


        List<Map<String, Object>> mainResult = new ArrayList<>();

        for (int i1 = 0; i1 < I - 2; i1++) {

            for (int i2 = i1 + 1; i2 < I - 1; i2++) {
                for (int i3 = i2 + 1; i3 < I; i3++) {
                    double CI;
                    Map<String, Object> innerResult = new HashMap<>();
                    innerResult.put("Indicators", i1 + "_" + i2 + "_" + i3);
                    for (int j = 0; j < n; j++) {
                        CI = input[j][i1] + input[j][i2] + input[j][i3];
                        innerResult.put("Region " + j, CI);
                    }
                    mainResult.add(innerResult);
                }
            }
        }
        finalCombResult = mainResult;
    }


    public static void combine_4(double[][] input) {

        List<Map<String, Object>> mainResult = new ArrayList<>();

        for (int i1 = 0; i1 < I - 3; i1++) {
            for (int i2 = i1 + 1; i2 < I - 2; i2++) {
                for (int i3 = i2 + 1; i3 < I - 1; i3++) {
                    for (int i4 = i3 + 1; i4 < I; i4++) {
                        double CI;
                        Map<String, Object> innerResult = new HashMap<>();
                        innerResult.put("Indicators", i1 + "_" + i2 + "_" + i3 + "_" + i4);
                        for (int j = 0; j < n; j++) {
                            CI = input[j][i1] + input[j][i2] + input[j][i3] + input[j][i4];
                            innerResult.put("Region " + j, CI);
                        }
                        mainResult.add(innerResult);
                    }
                }
            }
        }
        finalCombResult = mainResult;
    }

    public static void combine_5(double[][] input) {


        List<Map<String, Object>> mainResult = new ArrayList<>();


        for (int i1 = 0; i1 < I - 4; i1++) {
            for (int i2 = i1 + 1; i2 < I - 3; i2++) {
                for (int i3 = i2 + 1; i3 < I - 2; i3++) {
                    for (int i4 = i3 + 1; i4 < I - 1; i4++) {
                        for (int i5 = i4 + 1; i5 < I; i5++) {
                            double CI;
                            Map<String, Object> innerResult = new HashMap<>();
                            innerResult.put("Indicators", i1 + "_" + i2 + "_" + i3 + "_" + i4 + "_" + i5);
                            for (int j = 0; j < n; j++) {
                                CI = input[j][i1] + input[j][i2] + input[j][i3] + input[j][i4] + input[j][i5];
                                innerResult.put("Region " + j, CI);
                            }
                            mainResult.add(innerResult);
                        }
                    }
                }
            }
        }
        finalCombResult = mainResult;
    }

    static void k_perm(double[][] input, int k) {
        if (k == 3)
            combine_3(input);
        else if (k == 4)
            combine_4(input);
        else if (k == 5)
            combine_5(input);

    }

    public static void model1(int j, int[] comb, int duzina) {
        try {

            double[] u_m_comb = new double[duzina];
            double[] l_m_comb = new double[duzina];
            double[] y_ij_comb = new double[duzina];
            I = duzina;
            for (int s = 0; s < duzina; s++) {
                u_m_comb[s] = u_m[comb[s]];
                l_m_comb[s] = l_m[comb[s]];
                y_ij_comb[s] = y_ij[j][comb[s]];
            }


            //sortiranje y[j][i]
            int index = 0;
            int[] permutacija = new int[I];
            for (int k1 = 0; k1 < I; k1++) {
                permutacija[k1] = index;
                index++;
            }

            for (int k1 = 0; k1 < I - 1; k1++)
                for (int k2 = k1 + 1; k2 < I; k2++) {
                    if (y_ij_comb[k1] < y_ij_comb[k2]) {
                        int pm = permutacija[k1];
                        double pom = y_ij_comb[k1];
                        y_ij_comb[k1] = y_ij_comb[k2];
                        permutacija[k1] = permutacija[k2];
                        y_ij_comb[k2] = pom;
                        permutacija[k2] = pm;
                    }
                }


            IloNumVar[] w_ij = new IloNumVar[duzina];

            IloCplex cplex = new IloCplex(); //cplex objekat

            for (int i = 0; i < duzina; i++)
                w_ij[i] = cplex.numVar(0, Double.MAX_VALUE); //w_ij>=0
            //varijabne..
            IloLinearNumExpr funkcija = cplex.linearNumExpr();


            for (int i = 0; i < duzina; i++)
                // for(int p=0;p<n;p++)
                funkcija.addTerm(y_ij_comb[i], w_ij[i]);
            cplex.addMaximize(funkcija);

            //constraints

            IloLinearNumExpr uslov = cplex.linearNumExpr();

            for (int i = 0; i < duzina; i++)
                uslov.addTerm(1, w_ij[i]);
            cplex.addEq(uslov, 1); //drugi uslov...


            IloLinearNumExpr uslov2 = cplex.linearNumExpr();

            //int r=j;

            for (int i = 1; i < I; i++)
                uslov2.addTerm((((I - i) + 0.0) / (I - 1)), w_ij[i - 1]);
            cplex.addGe(uslov2, interval_limit[0]);
            cplex.addLe(uslov2, interval_limit[1]);


            //treci uslov

            IloLinearNumExpr[] uslovi2 = new IloLinearNumExpr[I];
            IloLinearNumExpr[] uslovi3 = new IloLinearNumExpr[I];
            int u = 0;
            for (int m = 0; m < I; m++) {

                if (y_ij_comb[m] > 0) {
                    uslovi2[u] = cplex.linearNumExpr();
                    uslovi3[u] = cplex.linearNumExpr();

                    for (int i = 0; i < I; i++) {

                        uslovi2[u].addTerm(u_m_comb[permutacija[m]] * y_ij_comb[i], (w_ij[i])); // stoji samo m  u 19. instanci...
                        uslovi3[u].addTerm(l_m_comb[permutacija[m]] * y_ij_comb[i], (w_ij[i])); //permutacija[m]
                    }


                    uslovi2[u].addTerm((-1) * y_ij_comb[m], w_ij[m]); //permutacija[m]
                    // System.out.println(permutacija[m]+" "+u_m_comb[permutacija[m]]+" "+"Uslovi: "+y_ij_comb[m]+"*"+"w_ij["+m+"]");
                    uslovi3[u].addTerm((-1) * y_ij_comb[m], w_ij[m]); //[permutacija[m]

                    cplex.addGe(uslovi2[u], 0);
                    cplex.addLe(uslovi3[u], 0);
                    u++;
                }
            }

            if (cplex.solve()) {
                cplex.solve();
                System.out.println("CI index: " + cplex.getObjValue());
                double CI = 0.0;
                for (int i = 0; i < I; i++) {
                    System.out.println("w_ij " + cplex.getValue(w_ij[i]));
                    solution[j][i] = cplex.getValue(w_ij[i]) * y_ij_comb[i];
                    CI += cplex.getValue(w_ij[i]) * y_ij_comb[i];
                }
                finalKibsResult.put("Region " + j, CI);

            }

        } catch (IloException e) {
            e.printStackTrace();
        }
    }


    public void generisi_kombinaciju(int k) {


        int[] niz = new int[I];
        Arrays.setAll(niz, i -> i);

        System.out.println("PPPPPPP" + Arrays.toString(niz) + "PPPPP" + I);

        finalKibsResult = new HashMap<>();

        for (int i = 0; i < n; i++)
            model1(i, niz, I);

        k_perm(solution, k);


    }


    public static void main(String[] ar) {
        double[][] indicatorPerRegions = {
                {
                        0.6901408450704225,
                        0.3266932270916334,
                        1.0,
                        1.0,
                        0.9865642994241846,
                        0.4556451612903225,
                        0.04132231404958677,
                        0.0
                },
                {
                        1.0,
                        0.3585657370517928,
                        0.6923076923076923,
                        0.6923076923076923,
                        0.0,
                        0.8924731182795699,
                        0.4008264462809917,
                        0.9718309859154926
                },
                {
                        0.7089201877934271,
                        0.3266932270916334,
                        0.15384615384615385,
                        0.15384615384615385,
                        0.22456813819577737,
                        0.42741935483870963,
                        0.03099173553719008,
                        0.619718309859155
                },
                {
                        0.5375586854460094,
                        0.10358565737051798,
                        0.23076923076923075,
                        0.23076923076923075,
                        0.4529750479846449,
                        1.0,
                        1.0,
                        0.7042253521126752
                },
                {
                        0.8826291079812206,
                        0.697211155378486,
                        0.0,
                        0.0,
                        1.0,
                        0.020161290322580645,
                        0.3533057851239669,
                        0.7746478873239427
                },
                {
                        0.4460093896713614,
                        0.0,
                        0.1923076923076923,
                        0.1923076923076923,
                        0.22072936660268724,
                        0.6491935483870968,
                        0.18181818181818182,
                        0.5774647887323949
                },
                {
                        0.8826291079812206,
                        0.15537848605577684,
                        0.07692307692307693,
                        0.07692307692307693,
                        0.31669865642994255,
                        0.6155913978494623,
                        0.1074380165289256,
                        1.0
                },
                {
                        0.0,
                        0.1792828685258964,
                        0.1346153846153846,
                        0.1346153846153846,
                        0.8790786948176585,
                        0.0,
                        0.4793388429752065,
                        0.9295774647887325
                },
                {
                        0.7253521126760564,
                        1.0,
                        0.0,
                        0.0,
                        0.5143953934740884,
                        0.2970430107526882,
                        0.0,
                        0.5915492957746475
                },
                {
                        0.0352112676056338,
                        0.147410358565737,
                        0.1923076923076923,
                        0.1923076923076923,
                        0.9692898272552782,
                        0.725806451612903,
                        0.4504132231404958,
                        0.8309859154929575
                }
        };
        double[] lower_m = new double[]{
                0.020,
                0.028,
                0.068,
                0.048,
                0.035,
                0.065,
                0.040,
                0.050
        };
        double[] upper_m = new double[]{
                0.296,
                0.228,
                0.325,
                0.306,
                0.326,
                0.346,
                0.226,
                0.188
        };
        double[] interval_values = new double[]{
                0.223,
                0.313
        };

        KibsBih myObj1 = new KibsBih(indicatorPerRegions, lower_m, upper_m, interval_values);

        // getFinalKibsResult ce biti isti nevezano za broj kombinacija

        myObj1.generisi_kombinaciju(3);
        System.out.println("xxxxxxxxxx" + myObj1.getFinalCombResult());
        System.out.println("XXXXXXXX" + myObj1.getFinalKibsResult());

        myObj1.generisi_kombinaciju(4);
        System.out.println("yyyyyyyyy" + myObj1.getFinalCombResult());
        System.out.println("YYYYYYYYY" + myObj1.getFinalKibsResult());

        myObj1.generisi_kombinaciju(5);
        System.out.println("zzzzzzzzzzzz" + myObj1.getFinalCombResult());
        System.out.println("ZZZZZZZZZZZ" + myObj1.getFinalKibsResult());


    }


}



