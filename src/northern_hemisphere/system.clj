(ns northern-hemisphere.system
  (:require [environ.core  :refer [env]]
            [northern-hemisphere.reports :as reports]))

(defn config [system]
  (merge {:config {:reports-api (env :reports-api)}}
    system))

(defn auth [system]
  (merge
    system
    {:current-user (fn [req]
                     {:firstname (get-in req [:headers "auth-first-name"] "Nobody")
                      :email (get-in req [:headers "auth-email"] "nobody@tw.net")
                      :user-id (get-in req [:headers "auth-user-id"] "nobody@tw.net") })}))

(def system
  (->
    {:forecast-shrinkage-percentage 5}
    config
    auth))
