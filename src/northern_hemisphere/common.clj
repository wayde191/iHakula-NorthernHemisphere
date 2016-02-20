(ns northern-hemisphere.common
  (:require [clj-time.core :as tm]
            [utils.date :as date]))

(defn- fetch-data [data-fn [year month]]
  (try (data-fn year month)
    (catch Exception e
      (println (str "caught exception: " (.getMessage e)))
      {})))

(defn- fetch-data-for [type data-fn [year month]]
  (try (data-fn year month type)
    (catch Exception e
      (println (str "caught exception: " (.getMessage e)))
      {})))

(defn- fetch-data-for-office-type [office-type type data-fn [year month]]
  (try (data-fn year month office-type type)
    (catch Exception e
      (println (str "caught exception: " (.getMessage e)))
      {})))

(defn past-months [year month]
  (->> (tm/local-date year month 1)
    (iterate #(tm/minus % (tm/months 1)))
    (map (partial (juxt tm/year tm/month)))))

(defn fetch-months [months-count monthly-fn params]
  (let [months (take (+ months-count 1) (past-months (Integer. (:year params)) (Integer. (:month params))))]
    (if (:type params)
      (if (:office-type params)
        (doall (take months-count (remove empty? (map #(fetch-data-for-office-type (:office-type params) (:type params) monthly-fn %) months))))
        (doall (take months-count (remove empty? (map #(fetch-data-for (:type params) monthly-fn %) months)))))
      (doall (take months-count (remove empty? (map #(fetch-data monthly-fn %) months)))))))

(defn future-months [year month]
  (->> (tm/local-date year month 1)
    (iterate #(tm/plus % (tm/months 1)))
    (map (partial (juxt tm/year tm/month)))))

(defn fetch-future-months [months-count monthly-fn year month]
  (let [months (take (+ months-count 1) (future-months (Integer. year) (Integer. month)))]
    (flatten (doall (take months-count (remove empty? (map (partial fetch-data monthly-fn) months)))))))

(defn fetch-weeks [weekly-fn weeks year month date]
  (let [end-date (date/weeks (tm/local-date (Integer. year) (Integer. month) (Integer. date)))]

    (->> end-date
      (iterate #(tm/minus % (tm/weeks 1)))
      (take (+ 1 weeks))
      (map #((juxt (partial tm/year) (memfn getWeekOfWeekyear)) %))
      (map (partial apply weekly-fn))
      (remove nil?)
      (take weeks))))

(defn fetch-years [years-count yearly-fn year]
  (let [years [year (- year 1)]]
    (doall (take years-count (remove empty? (map yearly-fn years))))))
