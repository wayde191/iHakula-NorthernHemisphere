(ns northern-hemisphere.fakes-handler
  (:use compojure.core)
  (:require [compojure.handler :as handler]
            [compojure.route :as route]))

(defroutes reports-routes
  (GET "/forecast" [] "{\"Australia\":{\"2011\":{\"6\":{\"atl\":{\"usd\":3655447.1135423617},\"btl\":{\"usd\":0.0}},\"7\":{\"atl\":{\"usd\":3013930.2602211307},\"btl\":{\"usd\":0.0}},\"4\":{\"atl\":{\"usd\":2813563.021061044},\"btl\":{\"usd\":0.0}},\"5\":{\"atl\":{\"usd\":3433871.851513718},\"btl\":{\"usd\":0.0}},\"1\":{\"atl\":{\"usd\":2726133.860655441},\"btl\":{\"usd\":0.0}},\"3\":{\"atl\":{\"usd\":3974869.5901637143},\"btl\":{\"usd\":0.0}},\"2\":{\"atl\":{\"usd\":3333296.6967210434},\"btl\":{\"usd\":0.0}},\"9\":{\"atl\":{\"usd\":4141839.5642199856},\"btl\":{\"usd\":0.0}},\"8\":{\"atl\":{\"usd\":3913524.939679008},\"btl\":{\"usd\":0.0}},\"10\":{\"atl\":{\"usd\":3726799.257430769},\"btl\":{\"usd\":0.0}},\"12\":{\"atl\":{\"usd\":3121335.640847627},\"btl\":{\"usd\":0.0}},\"11\":{\"atl\":{\"usd\":3830550.8751825294},\"btl\":{\"usd\":0.0}}},\"2012\":{\"6\":{\"atl\":{\"usd\":2964540.9999999246},\"btl\":{\"usd\":0.0}},\"7\":{\"atl\":{\"usd\":3040445.0},\"btl\":{\"usd\":0.0}},\"4\":{\"atl\":{\"usd\":2725606.372765369},\"btl\":{\"usd\":0.0}},\"5\":{\"atl\":{\"usd\":3219141.4448503056},\"btl\":{\"usd\":0.0}},\"1\":{\"atl\":{\"usd\":2806836.929913164},\"btl\":{\"usd\":0.0}},\"3\":{\"atl\":{\"usd\":3475539.1190208225},\"btl\":{\"usd\":0.0}},\"2\":{\"atl\":{\"usd\":3136787.6799131646},\"btl\":{\"usd\":0.0}},\"9\":{\"atl\":{\"usd\":3191495.487363374},\"btl\":{\"usd\":0.0}},\"8\":{\"atl\":{\"usd\":3552992.27362062},\"btl\":{\"usd\":0.0}},\"10\":{\"atl\":{\"usd\":3544671.704040026},\"btl\":{\"usd\":0.0}},\"12\":{\"atl\":{\"usd\":1951285.0939594447},\"btl\":{\"usd\":0.0}},\"11\":{\"atl\":{\"usd\":3190871.2472502054},\"btl\":{\"usd\":0.0}}},\"2013\":{\"6\":{\"atl\":{\"usd\":3366020.007470731},\"btl\":{\"usd\":0.0}},\"7\":{\"atl\":{\"usd\":3709008.626489393},\"btl\":{\"usd\":0.0}},\"4\":{\"atl\":{\"usd\":3277287.5148485773},\"btl\":{\"usd\":0.0}},\"5\":{\"atl\":{\"usd\":3989596.1360748704},\"btl\":{\"usd\":0.0}},\"1\":{\"atl\":{\"usd\":2955515.5506998},\"btl\":{\"usd\":0.0}},\"3\":{\"atl\":{\"usd\":3441351.124900269},\"btl\":{\"usd\":0.0}},\"2\":{\"atl\":{\"usd\":3268740.085182574},\"btl\":{\"usd\":0.0}},\"9\":{\"atl\":{\"usd\":3290527.2342841406},\"btl\":{\"usd\":0.0}},\"8\":{\"atl\":{\"usd\":3414017.6251803697},\"btl\":{\"usd\":0.0}},\"10\":{\"atl\":{\"usd\":3431214.5160798375},\"btl\":{\"usd\":260466.00000000003}},\"12\":{\"atl\":{\"usd\":2486793.874852033},\"btl\":{\"usd\":486857.2000086406}},\"11\":{\"atl\":{\"usd\":2812849.778653822},\"btl\":{\"usd\":563310.6800082086}}},\"2014\":{\"6\":{\"atl\":{\"usd\":439660.0},\"btl\":{\"usd\":550119.9999999998}},\"7\":{\"atl\":{\"usd\":249918.0},\"btl\":{\"usd\":218730.0}},\"4\":{\"atl\":{\"usd\":417677.0},\"btl\":{\"usd\":570410.3999999997}},\"5\":{\"atl\":{\"usd\":483626.0},\"btl\":{\"usd\":660475.1999999996}},\"1\":{\"atl\":{\"usd\":1410601.0},\"btl\":{\"usd\":864039.3200090725}},\"3\":{\"atl\":{\"usd\":1058609.0},\"btl\":{\"usd\":720229.5999999997}},\"2\":{\"atl\":{\"usd\":1249355.0},\"btl\":{\"usd\":870075.80000648}},\"9\":{\"atl\":{\"usd\":219797.99999999997},\"btl\":{\"usd\":209219.99999999997}},\"8\":{\"atl\":{\"usd\":228186.0},\"btl\":{\"usd\":190200.0}},\"10\":{\"atl\":{\"usd\":56994.0},\"btl\":{\"usd\":209220.0}},\"12\":{\"atl\":{\"usd\":52038.0},\"btl\":{\"usd\":142650.0}},\"11\":{\"atl\":{\"usd\":49560.0},\"btl\":{\"usd\":190200.0}}}}}")

  (GET "/plan" [] "{\"Australia\":{\"2012\":{\"6\":{\"plan\":{\"usd\":0.0}},\"7\":{\"plan\":{\"usd\":0.0}},\"4\":{\"plan\":{\"usd\":0.0}},\"5\":{\"plan\":{\"usd\":0.0}},\"1\":{\"plan\":{\"usd\":0.0}},\"3\":{\"plan\":{\"usd\":0.0}},\"2\":{\"plan\":{\"usd\":0.0}},\"9\":{\"plan\":{\"usd\":0.0}},\"8\":{\"plan\":{\"usd\":0.0}},\"10\":{\"plan\":{\"usd\":0.0}},\"12\":{\"plan\":{\"usd\":0.0}},\"11\":{\"plan\":{\"usd\":0.0}}},\"2013\":{\"6\":{\"plan\":{\"usd\":3111040.3292003283}},\"7\":{\"plan\":{\"usd\":3308963.9046096685}},\"4\":{\"plan\":{\"usd\":3602864.4964790256}},\"5\":{\"plan\":{\"usd\":4074946.2457337882}},\"1\":{\"plan\":{\"usd\":3159258.6944312435}},\"3\":{\"plan\":{\"usd\":3493960.3944355636}},\"2\":{\"plan\":{\"usd\":3549046.8311228235}},\"9\":{\"plan\":{\"usd\":3377014.4727178467}},\"8\":{\"plan\":{\"usd\":3259617.8770467015}},\"10\":{\"plan\":{\"usd\":3898722.0806151982}},\"12\":{\"plan\":{\"usd\":2564564.9112195964}},\"11\":{\"plan\":{\"usd\":3651267.3780619516}}}}}")

  (GET "/gdf" [] "{\"Australia\":{\"2013\":{\"6\":{\"2013-07-01T00:00:00.000Z\":{\"gdf\":{\"usd\":3116358.54690751}},\"2013-06-24T00:00:00.000Z\":{\"gdf\":{\"usd\":3147130.2837079004}},\"2013-06-17T00:00:00.000Z\":{\"gdf\":{\"usd\":3193529.2637079004}},\"2013-06-10T00:00:00.000Z\":{\"gdf\":{\"usd\":3302000.1591813597}},\"2013-06-03T00:00:00.000Z\":{\"gdf\":{\"usd\":3271907.5124157043}}},\"7\":{\"2013-07-29T00:00:00.000Z\":{\"gdf\":{\"usd\":3535062.831901803}},\"2013-07-22T00:00:00.000Z\":{\"gdf\":{\"usd\":3467641.966885387}},\"2013-07-15T00:00:00.000Z\":{\"gdf\":{\"usd\":3485797.5484047257}},\"2013-07-08T00:00:00.000Z\":{\"gdf\":{\"usd\":3615264.8064047256}}},\"4\":{\"2013-04-22T00:00:00.000Z\":{\"gdf\":{\"usd\":3237129.59}},\"2013-04-15T00:00:00.000Z\":{\"gdf\":{\"usd\":3312666.4}},\"2013-04-29T00:00:00.000Z\":{\"gdf\":{\"usd\":3261428.1288}},\"2013-04-08T00:00:00.000Z\":{\"gdf\":{\"usd\":3359864.66}}},\"5\":{\"2013-05-28T00:00:00.000Z\":{\"gdf\":{\"usd\":3877859.9084085957}},\"2013-05-20T00:00:00.000Z\":{\"gdf\":{\"usd\":3908470.1984085958}},\"2013-05-13T00:00:00.000Z\":{\"gdf\":{\"usd\":3873798.270991746}},\"2013-05-06T00:00:00.000Z\":{\"gdf\":{\"usd\":3779349.6184085957}}},\"3\":{\"2013-04-01T00:00:00.000Z\":{\"gdf\":{\"usd\":3338682.2013792177}},\"2013-03-18T00:00:00.000Z\":{\"gdf\":{\"usd\":3375802.1613792176}},\"2013-03-11T00:00:00.000Z\":{\"gdf\":{\"usd\":3652359.6373792174}}},\"2\":{\"2013-03-04T00:00:00.000Z\":{\"gdf\":{\"usd\":3308407.949482607}},\"2013-02-25T00:00:00.000Z\":{\"gdf\":{\"usd\":3355245.369482607}},\"2013-02-18T00:00:00.000Z\":{\"gdf\":{\"usd\":3377926.3653703034}},\"2013-02-11T00:00:00.000Z\":{\"gdf\":{\"usd\":3313714.8873703037}},\"2013-02-04T00:00:00.000Z\":{\"gdf\":{\"usd\":3474324.6743703275}}},\"9\":{\"2013-09-23T00:00:00.000Z\":{\"gdf\":{\"usd\":3165313.729274567}},\"2013-09-16T00:00:00.000Z\":{\"gdf\":{\"usd\":3229658.2642414253}},\"2013-09-09T00:00:00.000Z\":{\"gdf\":{\"usd\":3213230.2075961097}},\"2013-09-30T00:00:00.000Z\":{\"gdf\":{\"usd\":3188345.8942745673}}},\"10\":{\"2013-10-14T00:00:00.000Z\":{\"gdf\":{\"usd\":3496832.0705974423}},\"2013-10-07T00:00:00.000Z\":{\"gdf\":{\"usd\":3400200.301992623}}},\"8\":{\"2013-08-26T00:00:00.000Z\":{\"gdf\":{\"usd\":3204157.32244234}},\"2013-08-19T00:00:00.000Z\":{\"gdf\":{\"usd\":3227940.1704423404}},\"2013-08-12T00:00:00.000Z\":{\"gdf\":{\"usd\":3318974.4376414935}},\"2013-08-05T00:00:00.000Z\":{\"gdf\":{\"usd\":3346589.167885387}},\"2013-09-03T00:00:00.000Z\":{\"gdf\":{\"usd\":3203556.1164423395}}}}}}"))

(defroutes fake-routes
  (context "/reports" [] reports-routes))