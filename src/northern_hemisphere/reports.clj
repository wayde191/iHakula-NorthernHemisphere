(ns northern-hemisphere.reports
  (:require [utils.map :refer [group-and-merge]]
            [northern-hemisphere.common :as common]
            [northern-hemisphere.http :refer :all]
            [clj-time.core :as time]
            [clojure.string :refer [join replace]]))

(defn reports-http
  ([base-request request]
    (http (merge base-request
            {:method :get
             :as :json
             :ignore-not-found? true}
            request)))

  ([base-request path & paths]
    (doall
      (map (partial reports-http base-request) (concat [path] paths)))))

(defn metadata [namespace]
  {:uri (join "/" ["" namespace "metadata.json"])})

(defn monthly-projects [year month]
  {:uri (join "/" ["" "revenue" "forecast" year month "projects.json"])})

(defn monthly-projects-new [year month]
  {:uri (join "/" ["" "revenue" "forecast" year month "projects-structured.json"])})

(defn yearly-projects [year]
  (->> (range 1 13)
    (map #(hash-map :uri (join "/" ["" "revenue" "forecast" year % "projects-structured.json"])))))

(defn monthly-requests [year month]
  {:uri (join "/" ["" "revenue" "forecast" year month "requests.json"])})

(def cash-balance
  {:uri "/cash-balance.json"})

(defn entire-weekly-cash-balance [year]
  {:uri (join "/" ["" year "entire-weekly-cash-balance.json"])})

(def plan
  {:uri "/revenue/revenue-plan.json"})

(def gdf-accepted
  {:uri "/gdf/hierarchy/2015/accepted.json"})

(def gdf-latest
  {:uri "/gdf/hierarchy/2015/latest.json"})

(defn actual-projects [year month]
  {:uri (join "/" ["" year month "actual-revenue.json"])})

(defn actual-revenue-months [months year month]
  (->> (time/date-time (Integer. year) (Integer. month))
    (iterate #(time/minus % (time/months 1)))
    (drop 1)
    (take months)
    (map #((juxt time/year time/month) %))
    (map (partial apply actual-projects))))

(def countries
  {:uri "/offices/countries.json"})

(defn offices [year]
  {:uri (str "/offices/" year "/hierarchy.json")})

(defn migrations [year]
  {:uri (str "/offices/" year "/migrations.json")})

(def unpaid-invoices
  {:uri "/invoices/unpaid.json"})

(defn cp-unpaid-invoices [user]
  {:uri (str "/invoices/" user "/unpaid.json")})

(defn utilisation-plan [year]
  {:uri (str "/utilisation/" year "/plan.json")
   :json-dates [:date]})

(defn weekly-timesheets [year month date]
  (let [week (.getWeekOfWeekyear (time/date-time (Integer. year) (Integer. month) (Integer. date)))]
    {:uri (join "/" ["" "utilisation" year "week" week "timesheets.json"])}))

(defn weekly-missing-timesheets [year month date]
  (let [week (.getWeekOfWeekyear (time/date-time (Integer. year) (Integer. month) (Integer. date)))]
    {:uri (join "/" ["" "utilisation" year "week" week "missing-timesheets.json"])}))

(defn daily-headcount [year month]
  {:uri (join "/" ["" "headcount" year month "daily-headcount.json"])})

(defn build-officewise-url-for-office-type [year month office fileName]
  (join
    "/" ["" "headcount" year month "office" (replace office #" " "+") fileName]))

(defn officewise-daily-headcount [year month officeType office]
  (let [jsonFile (if (= officeType "working-office")
                   "daily-headcount.json"
                   "staffing-office-daily-headcount.json")]
    {:uri (build-officewise-url-for-office-type year month office jsonFile)}))

(defn build-countrywise-url-for-office-type [year month country fileName]
  (join
    "/" ["" "headcount" year month "country" (replace country " " "+" ) fileName]))

(defn countrywise-daily-headcount [year month officeType country]
  (let [jsonFile (if (= officeType "working-office")
                   "daily-headcount.json"
                   "staffing-office-daily-headcount.json")]
    {:uri (build-countrywise-url-for-office-type year month country jsonFile)}))

(defn headcount-events
  ([year month]
    {:uri (join "/" ["" "headcount" year month "headcount-events.json"])})
  ([location-type location year month officeType]
    (let [jsonFile (if (= officeType "working-office")
                     "headcount-events.json"
                     "staffing-office-headcount-events.json")]
      {:uri (join "/" ["" "headcount" year month location-type (replace location " " "+" ) jsonFile])})))

(defn headcount-breakdown [location-type location year month officeType]
  (let [jsonFile (if (= officeType "working-office")
                   "headcount-breakdown.json"
                   "staffing-office-headcount-breakdown.json")]
    {:uri (join "/" ["" "headcount" year month location-type (replace location " " "+" ) jsonFile])}))

(defn headcount-by-grade [year month]
  {:uri (join "/" ["" "headcount" year  month "headcount-by-grade.json"])})

(defn headcount-by-role [year month]
  {:uri (join "/" ["" "headcount" year  month "headcount-by-role.json"])})

(defn monthly-headcount [year month]
  {:uri (join "/" ["" "headcount" year month "monthly-headcount.json"])})

(defn headcount-plan [year]
  {:uri (join "/" ["" "headcount" year "plan.json"])})

(defn monthly-timesheets [year month]
  {:uri (join "/" ["" "utilisation" year month "timesheets.json"])})

(defn monthly-missing-timesheets [year month]
  {:uri (join "/" ["" "utilisation" year month "missing-timesheets.json"])})

(defn weekly-standard-hours [year month date]
  (let [week (.getWeekOfWeekyear (time/date-time (Integer. year) (Integer. month) (Integer. date)))]
    {:uri (join "/" ["" "utilisation" year "week" week "standard-hours.json"])}))

(defn monthly-standard-hours [year month]
  {:uri (join "/" ["" "utilisation" year month "standard-hours.json"])})

(defn monthly-utilisations [year month]
  {:uri (join "/" ["" "utilisation" year month "utilisation.json"])
   :json-dates [:monthend]})

(defn utilisation-by-grade [year month]
  {:uri (join "/" ["" "utilisation" year  month "utilisation-by-grade.json"])})

(defn utilisation-by-role [year month]
  {:uri (join "/" ["" "utilisation" year  month "utilisation-by-role.json"])})

(defn weekly-utilisation [year week]
  {:uri (join "/" ["" "utilisation" year "week" week "utilisation.json"])})

(defn weeks-headcount [year week]
  {:uri (join "/" ["" "headcount" year "week" week "weekly-headcount.json"])})

(defn staffing [user]
  {:uri (str "/staffing/" user ".json")})
