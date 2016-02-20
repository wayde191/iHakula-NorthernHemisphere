(ns utils.ring-csv
  (:require [clojure.data.csv :as csv]
            [ring.util.response :refer [content-type]]))

(defn- quote? [x]
  (some #{\, \; \" \return \newline} x))

(defn wrap-csv-response
  [handler & [{:as options}]]
  (fn [request]
    (let [response (handler request)]
      (if (coll? (:body response))
        (-> response
            (content-type "application/csv; charset=utf-8")
            (update-in [:body] #(with-out-str (csv/write-csv *out* %
                                                             :quote? quote?))))
        response))))
