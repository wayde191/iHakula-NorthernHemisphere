(ns northern-hemisphere.datetime
  (:require [clj-time.core :refer [date-time now year month months
                                   minus plus today-at-midnight]]))

(defn current [] (now))
(defn next-month [date] (plus date (months 1)))
(def midnight today-at-midnight)

(defn same-month-of-year? [x y]
  (and (= (year x) (year y))
    (= (month x) (month y))))

(defn ^org.joda.time.DateTime string-date-time [year month]
  (date-time (read-string (name year)) (read-string (name month))))
