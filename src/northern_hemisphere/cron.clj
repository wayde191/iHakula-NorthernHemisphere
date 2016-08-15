(ns northern-hemisphere.cron
  (:require [northern-hemisphere.joke :as joke]
            [clojure.tools.logging :as log]))

(defn infinite-loop [function]
  (function)
  (future (infinite-loop function))
  nil)

(defn analyse-joke []
  (infinite-loop
    #(do
       (Thread/sleep (reduce * (list 1000 5)))
       (joke/refresh-joke))))

(defn run-cron-task []
  (log/info "Running cron tasks...")
  (doto
    (Thread. analyse-joke)
    (.setDaemon true)
    (.start)))