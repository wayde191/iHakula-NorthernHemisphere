(ns northern-hemisphere.user
  (:require [northern-hemisphere.http :as http]
            [northern-hemisphere.reports :as reports]
            [clojure.tools.logging :as log]))

(defn login [username token]
  (http/request-post
    (:uri (reports/sso-login))
    (merge
      {:sCode reports/sso-security-code}
      {:ihakulaID username :token token})))

(def counter (atom 1))

(defn infinite-loop [function]
  (function)
  (future (infinite-loop function))
  nil)

(defn forever []
  (infinite-loop
    #(do
       (Thread/sleep (reduce * (list 1000 60 60 24)))
       (log/info (swap! counter inc))))
  )

(defn isUserLoggedIn [username token]
  (doto
    (Thread. forever)
    (.setDaemon true)
    (.start))

  (http/request-post
    (:uri (reports/sso-isUserLoggedin))
    (merge
      {:sCode reports/sso-security-code}
      {:user-id username :token token})))

(defn getContact [user-id]
  (http/request-get
    (:uri (reports/get-user-contact))
    (merge
      {:sCode reports/sso-security-code}
      {:user_id user-id})))