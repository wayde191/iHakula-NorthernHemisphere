(ns northern-hemisphere.api
  (:require [northern-hemisphere.mysql :as mysql]
            [northern-hemisphere.user :as user]
            [northern-hemisphere.datetime :as datetime]
            [northern-hemisphere.user :as user]
            [utils.map :refer [filter-keys flatten-keys]]
            [clj-time.core :refer [year month date-time plus minus months interval within?]]
            [compojure.core :refer [defroutes GET context] :as compojure]
            [compojure.handler :as handler]
            [clojure.data.json :as json]
            [clj-http.client :as client]
            [clj-time.format :as format]
            [clj-time.coerce :refer [to-local-date]]
            [ring.middleware.json :refer [wrap-json-response]]
            [ring.util.response :refer [redirect response]]
            [utils.ring-csv :refer [wrap-csv-response]]
            [clojure.string :refer [capitalize lower-case split]])
  (:import [java.util TimeZone]
           [utils manifest]))

(defn routes [reports-get current-user]
  (cheshire.generate/add-encoder org.joda.time.base.BaseDateTime cheshire.generate/encode-str)

  (letfn [(get-user-info [userId token] "fake")
          ]
    (handler/api
      (compojure/routes
        (wrap-json-response
          (defroutes json-routes
            (GET "/date.json" req (response {:date (datetime/midnight)}))
            (GET "/products.json" req (response (mysql/list-users 'hello')))
            (GET "/:username/:token/user.json" [username token]
              (response (user/login username token)))
            (GET "/:username/:token/isUserLoggedIn.json" [username token]
              (response (user/isUserLoggedIn username token)))
            ))))
    )
  )