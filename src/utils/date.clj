(ns utils.date
  (:require [clj-time.core :as time]
            [clj-time.periodic :as tp]
            [clj-time.format :as f]
            [clj-time.predicates :as predicates]))

(defn day-of-week [date day]
  (.withDayOfWeek date day))

(defn sunday [date] (day-of-week date 7))

(defn last-sunday [date]
  (if (predicates/sunday? date)
    (time/minus date (time/days 7))
    (time/minus (sunday date) (time/days 7))))

(defn weeks [end-date]
  (let [last-end-date (if (predicates/sunday? end-date)
                        end-date
                        (last-sunday end-date))]
    last-end-date))
