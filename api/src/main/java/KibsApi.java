import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import io.javalin.Javalin;
import org.json.JSONException;
import org.json.JSONObject;


import java.util.*;


public class KibsApi {

    public static Map<String, Object> getResults(double[][] indicatorPerRegions,
                                                 double[] lower_limit,
                                                 double[] upper_limit,
                                                 double[] interval_limit) {


        List<Map<String, Object>> Comb3, Comb4, Comb5;
        Map<String, Double> kibsResult;
        Map<String, Object> finalResult = new HashMap<>();

        KibsBih myObj1 = new KibsBih(indicatorPerRegions,
                lower_limit,
                upper_limit,
                interval_limit);

        myObj1.generisi_kombinaciju(3);
        Comb3 = myObj1.getFinalCombResult();
        myObj1.generisi_kombinaciju(4);
        Comb4 = myObj1.getFinalCombResult();
        myObj1.generisi_kombinaciju(5);
        Comb5 = myObj1.getFinalCombResult();
        kibsResult = myObj1.getFinalKibsResult();

        finalResult.put("Comb3", Comb3);
        finalResult.put("Comb4", Comb4);
        finalResult.put("Comb5", Comb5);
        finalResult.put("kibs", kibsResult);

        return finalResult;
    }

    public static void main(String[] args) {

        Javalin app = Javalin.create(config -> {config.enableCorsForAllOrigins();}).start(7000);
        app.post("/calculate", ctx -> {
                    try {
                        JSONObject jsonResult = new JSONObject(ctx.body());
                        double[] lower_limit = new Gson().fromJson(jsonResult.get("lower_limit").toString(), double[].class);
                        double[] upper_limit = new Gson().fromJson(jsonResult.get("upper_limit").toString(), double[].class);
                        double[] interval_limit = new Gson().fromJson(jsonResult.get("interval_limit").toString(), double[].class);
                        double[][] indicatorPerRegions = new Gson().fromJson(jsonResult.get("data").toString(), double[][].class);
                        Map<String, Object> result = KibsApi.getResults(indicatorPerRegions,
                                lower_limit,
                                upper_limit,
                                interval_limit);
                        ctx.status(200);
                        ctx.json(result);
                    } catch (JSONException | JsonSyntaxException e) {
                        ctx.status(400);
                        ctx.result("400 Bad Request");
                    }

                }
        ); //

    }
}



