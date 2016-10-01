(ns northern-hemisphere.wordpress
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]
            [clojure.tools.logging :as log]
            [pl.danieljanus.tagsoup :as html-parser]))

(defn get-post [category filter]
  (http/request-get
    (:uri (reports/get-no1-url))
    (merge
      {:category category
       :filter filter})))