(ns northern-hemisphere.cron
  (:require [clojure.tools.logging :as log]))

(def counter (atom 1))

(defn infinite-loop [function]
  (function)
  (future (infinite-loop function))
  nil)

(defn analyse-joke []
  (infinite-loop
    #(do
       (Thread/sleep (reduce * (list 1000 24 60 60)))
       (log/info (swap! counter inc)))))

(defn run-cron-task []
  (doto
    (Thread. analyse-joke)
    (.setDaemon true)
    (.start)))